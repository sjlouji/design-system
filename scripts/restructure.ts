/**
 * Restructures shadcn/ui components from flat src/components/ui/
 * into self-contained src/components/{PascalName}/ directories.
 *
 * Run: npx tsx scripts/restructure.ts
 */
import { readdirSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const UI_DIR = path.join(ROOT, 'src/components/ui')
const COMP_DIR = path.join(ROOT, 'src/components')

// kebab-case → PascalCase mapping
const nameMap: Record<string, string> = {
  'accordion': 'Accordion',
  'alert': 'Alert',
  'alert-dialog': 'AlertDialog',
  'aspect-ratio': 'AspectRatio',
  'avatar': 'Avatar',
  'badge': 'Badge',
  'breadcrumb': 'Breadcrumb',
  'button': 'Button',
  'calendar': 'Calendar',
  'card': 'Card',
  'carousel': 'Carousel',
  'chart': 'Chart',
  'checkbox': 'Checkbox',
  'collapsible': 'Collapsible',
  'command': 'Command',
  'context-menu': 'ContextMenu',
  'dialog': 'Dialog',
  'drawer': 'Drawer',
  'dropdown-menu': 'DropdownMenu',
  'hover-card': 'HoverCard',
  'input': 'Input',
  'input-otp': 'InputOTP',
  'label': 'Label',
  'menubar': 'Menubar',
  'navigation-menu': 'NavigationMenu',
  'pagination': 'Pagination',
  'popover': 'Popover',
  'progress': 'Progress',
  'radio-group': 'RadioGroup',
  'resizable': 'Resizable',
  'scroll-area': 'ScrollArea',
  'select': 'Select',
  'separator': 'Separator',
  'sheet': 'Sheet',
  'sidebar': 'Sidebar',
  'skeleton': 'Skeleton',
  'slider': 'Slider',
  'sonner': 'Sonner',
  'switch': 'Switch',
  'table': 'Table',
  'tabs': 'Tabs',
  'textarea': 'Textarea',
  'toggle': 'Toggle',
  'toggle-group': 'ToggleGroup',
  'tooltip': 'Tooltip',
}

if (!existsSync(UI_DIR)) {
  console.error('src/components/ui/ not found — nothing to restructure.')
  process.exit(1)
}

const files = readdirSync(UI_DIR).filter(f => f.endsWith('.tsx'))

for (const file of files) {
  const kebab = file.replace('.tsx', '')
  const pascal = nameMap[kebab]
  if (!pascal) {
    console.warn(`No name mapping for: ${file} — skipped`)
    continue
  }

  const targetDir = path.join(COMP_DIR, pascal)
  mkdirSync(targetDir, { recursive: true })

  // Move component file
  const src = path.join(UI_DIR, file)
  const dest = path.join(targetDir, `${pascal}.tsx`)
  let content = readFileSync(src, 'utf8')

  // Update internal cross-imports: @/components/ui/X → @/components/PascalX
  content = content.replace(/@\/components\/ui\/([\w-]+)/g, (_match, name: string) => {
    const mapped = nameMap[name]
    return mapped ? `@/components/${mapped}` : `@/components/ui/${name}`
  })

  writeFileSync(dest, content)

  // Create index.ts barrel
  writeFileSync(
    path.join(targetDir, 'index.ts'),
    `export * from './${pascal}'\n`,
  )

  console.log(`✔ ${file} → ${pascal}/${pascal}.tsx`)
}

// Remove the now-empty ui/ dir
try {
  rmSync(UI_DIR, { recursive: true, force: true })
  console.log('\n✔ Removed src/components/ui/')
} catch {
  console.warn('Could not remove src/components/ui/ — remove manually')
}

console.log('\nDone. Update components.json aliases if adding more shadcn components.')
