#!/usr/bin/env node
/**
 * Generates llms.txt — a compact component catalog for LLM system prompts.
 * Run: npm run generate:llm-context
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const COMPONENTS_DIR = path.join(ROOT, 'src/components')
const OUTPUT = path.join(ROOT, 'llms.txt')
const PKG_NAME = '@sjlouji/design-system'

// ── Block extraction helpers ───────────────────────────────────────────────────

function extractBlock(src, startIdx, open, close) {
  let i = startIdx
  while (i < src.length && src[i] !== open) i++
  if (i >= src.length) return null
  let depth = 0
  const from = i
  while (i < src.length) {
    if (src[i] === open) depth++
    else if (src[i] === close) {
      depth--
      if (depth === 0) return { from, to: i, text: src.slice(from, i + 1) }
    }
    i++
  }
  return null
}

const extractBraces = (src, idx) => extractBlock(src, idx, '{', '}')
const extractParens = (src, idx) => extractBlock(src, idx, '(', ')')

function stripStrings(src) {
  return src
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/`(?:[^`\\]|\\.)*`/g, '``')
}

// ── Props extraction ───────────────────────────────────────────────────────────

function getInterfaces(src) {
  const out = []
  const re = /export\s+interface\s+(\w+)/g
  let m
  while ((m = re.exec(src)) !== null) {
    const block = extractBraces(src, m.index + m[0].length)
    if (block) out.push(`interface ${m[1]} ${block.text}`)
  }
  return out
}

function parseVariants(variantsBlockText) {
  const src = stripStrings(variantsBlockText)
  const groups = {}
  let depth = 0
  let currentGroup = null
  let i = 0

  while (i < src.length) {
    const ch = src[i]
    if (ch === '{') {
      depth++
      i++
    } else if (ch === '}') {
      depth--
      if (depth === 1) currentGroup = null
      i++
    } else if (depth === 1) {
      const m = src.slice(i).match(/^(\w+)\s*:\s*\{/)
      if (m) {
        currentGroup = m[1]
        groups[currentGroup] = []
        i += m[0].length - 1 // stop at '{'
      } else {
        i++
      }
    } else if (depth === 2 && currentGroup) {
      const m = src.slice(i).match(/^(["']?)([\w-]+)\1\s*:/)
      if (m) {
        groups[currentGroup].push(m[2])
        i += m[0].length
      } else {
        i++
      }
    } else {
      i++
    }
  }

  return groups
}

function getCvaInterface(src, componentName) {
  const cvaIdx = src.indexOf('cva(')
  if (cvaIdx === -1) return null

  // Skip past the base class string to the config object
  let i = cvaIdx + 4
  while (i < src.length && !['"', "'", '`', '{'].includes(src[i])) i++
  if (i >= src.length) return null

  if (src[i] !== '{') {
    const q = src[i]
    i++
    while (i < src.length && src[i] !== q) {
      if (src[i] === '\\') i++
      i++
    }
    i++
  }

  const cfg = extractBraces(src, i)
  if (!cfg) return null

  // Default variant values
  const defaults = {}
  const dfIdx = cfg.text.indexOf('defaultVariants:')
  if (dfIdx !== -1) {
    const dfBlock = extractBraces(cfg.text, dfIdx + 'defaultVariants:'.length)
    if (dfBlock) {
      const re = /(\w+)\s*:\s*["']([^"']+)["']/g
      let m
      while ((m = re.exec(dfBlock.text)) !== null) defaults[m[1]] = m[2]
    }
  }

  // Variant groups
  const varIdx = cfg.text.indexOf('variants:')
  if (varIdx === -1) return null
  const varBlock = extractBraces(cfg.text, varIdx + 'variants:'.length)
  if (!varBlock) return null

  const groups = parseVariants(varBlock.text)
  if (!Object.keys(groups).length) return null

  // Extra boolean props from function signature
  const fnRe = new RegExp(`function ${componentName}\\s*\\(\\s*\\{([^}]+)\\}`)
  const fnM = fnRe.exec(src)
  const extraProps = []
  if (fnM) {
    const boolRe = /(\w+)\s*=\s*(true|false)/g
    let m
    while ((m = boolRe.exec(fnM[1])) !== null) {
      if (m[1] !== 'className' && !Object.keys(groups).includes(m[1])) {
        extraProps.push(`  ${m[1]}?: boolean`)
      }
    }
  }

  const lines = [`interface ${componentName}Props {`]
  for (const [name, opts] of Object.entries(groups)) {
    const def = defaults[name] ? ` // default: '${defaults[name]}'` : ''
    lines.push(`  ${name}?: ${opts.map(o => `'${o}'`).join(' | ')}${def}`)
  }
  lines.push(...extraProps)
  lines.push(`  // ...extends React.HTMLAttributes<HTMLElement>`)
  lines.push('}')
  return lines.join('\n')
}

// ── Story extraction ───────────────────────────────────────────────────────────

function getMetaTitle(src) {
  const m = src.match(/title:\s*['"]([^'"]+)['"]/)
  return m ? m[1] : null
}

function getStoryNames(src) {
  const names = []
  const re = /export const (\w+):\s*Story/g
  let m
  while ((m = re.exec(src)) !== null) names.push(m[1])
  return names
}

function getDefaultStory(src, componentName) {
  const storyNames = getStoryNames(src)
  if (!storyNames.length) return null
  const target = storyNames.includes('Default') ? 'Default' : storyNames[0]

  const marker = `export const ${target}:`
  const startIdx = src.indexOf(marker)
  if (startIdx === -1) return null

  const block = extractBraces(src, startIdx + marker.length)
  if (!block) return null
  const content = block.text

  // render: () => (...) pattern
  const renderIdx = content.indexOf('render:')
  if (renderIdx !== -1) {
    const arrowIdx = content.indexOf('=>', renderIdx)
    if (arrowIdx !== -1) {
      let j = arrowIdx + 2
      while (j < content.length && /\s/.test(content[j])) j++
      if (content[j] === '(') {
        const paren = extractParens(content, j)
        if (paren) return paren.text.slice(1, -1).trim()
      }
    }
    return null
  }

  // args: { ... } pattern — reconstruct JSX
  const argsIdx = content.indexOf('args:')
  if (argsIdx !== -1) {
    const argsBlock = extractBraces(content, argsIdx + 'args:'.length)
    if (!argsBlock) return `<${componentName} />`

    const inner = argsBlock.text.slice(1, -1).trim()
    const childM = inner.match(/children\s*:\s*['"]([^'"]+)['"]/)
    const childText = childM ? childM[1] : null

    const props = []
    const propRe = /(\w+)\s*:\s*(?:'([^']*)'|"([^"]*)"|(\d+\.?\d*)|(\btrue\b|\bfalse\b))/g
    let pm
    while ((pm = propRe.exec(inner)) !== null) {
      const key = pm[1]
      if (key === 'children') continue
      if (pm[2] !== undefined) props.push(`${key}="${pm[2]}"`)
      else if (pm[3] !== undefined) props.push(`${key}="${pm[3]}"`)
      else if (pm[4] !== undefined) props.push(`${key}={${pm[4]}}`)
      else if (pm[5] === 'true') props.push(key)
      else props.push(`${key}={false}`)
    }

    const propsStr = props.length ? ' ' + props.join(' ') : ''
    return childText
      ? `<${componentName}${propsStr}>${childText}</${componentName}>`
      : `<${componentName}${propsStr} />`
  }

  return `<${componentName} />`
}

// ── Main ──────────────────────────────────────────────────────────────────────

const componentDirs = fs.readdirSync(COMPONENTS_DIR)
  .filter(d => fs.statSync(path.join(COMPONENTS_DIR, d)).isDirectory())
  .sort()

const sections = []

for (const dir of componentDirs) {
  const tsxPath = path.join(COMPONENTS_DIR, dir, `${dir}.tsx`)
  const storiesPath = path.join(COMPONENTS_DIR, dir, `${dir}.stories.tsx`)

  if (!fs.existsSync(tsxPath)) continue

  const src = fs.readFileSync(tsxPath, 'utf8')
  const storiesSrc = fs.existsSync(storiesPath) ? fs.readFileSync(storiesPath, 'utf8') : ''

  const interfaces = getInterfaces(src)
  const propsBlock = interfaces.length
    ? interfaces.join('\n\n')
    : getCvaInterface(src, dir)

  const title = storiesSrc ? getMetaTitle(storiesSrc) : null
  const storyNames = storiesSrc ? getStoryNames(storiesSrc) : []
  const defaultStory = storiesSrc ? getDefaultStory(storiesSrc, dir) : null

  const lines = [`## ${dir}`]
  if (title) lines.push(`**Category:** ${title}`)

  if (propsBlock) {
    lines.push('')
    lines.push('```ts')
    lines.push(propsBlock)
    lines.push('```')
  }

  if (defaultStory) {
    lines.push('')
    lines.push('```tsx')
    lines.push(defaultStory.trim())
    lines.push('```')
  }

  if (storyNames.length > 1) {
    lines.push('')
    lines.push(`**Variants/Stories:** ${storyNames.join(', ')}`)
  }

  sections.push(lines.join('\n'))
}

const date = new Date().toISOString().slice(0, 10)
const output = [
  `# ${PKG_NAME} — Component Catalog`,
  `> Auto-generated ${date}. Refresh with \`npm run generate:llm-context\`.`,
  '',
  '## Import',
  '```ts',
  `import { Button, Field, Input, ... } from '${PKG_NAME}'`,
  '```',
  '',
  '## Stack',
  '- React 19 + TypeScript + Tailwind CSS v4',
  '- Radix UI primitives, class-variance-authority (CVA) for variants',
  '- `cn()` = clsx + tailwind-merge for className merging',
  '',
  '## Design Tokens',
  'CSS custom properties available globally:',
  '```',
  '--background  --foreground',
  '--primary     --primary-foreground',
  '--secondary   --secondary-foreground',
  '--muted       --muted-foreground',
  '--accent      --accent-foreground',
  '--destructive',
  '--border  --input  --ring  --radius',
  '```',
  '',
  '## Rules',
  `- Always import from \`${PKG_NAME}\` — never reimplement components`,
  '- Wrap every form input with `Field` (handles label, error, helperText, aria)',
  '- Use `variant` / `size` props for styling, not raw className overrides',
  '- Use `cn()` when composing classNames',
  '',
  '---',
  '',
  sections.join('\n\n---\n\n'),
].join('\n')

fs.writeFileSync(OUTPUT, output, 'utf8')
const kb = Math.round(fs.statSync(OUTPUT).size / 1024)
console.log(`✓ llms.txt — ${sections.length} components, ${kb} KB → ${OUTPUT}`)
