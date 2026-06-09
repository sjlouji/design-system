/**
 * Reads conventional commits since the last git tag and bumps the version in
 * package.json accordingly:
 *   BREAKING CHANGE / <type>!:  → major
 *   feat:                        → minor
 *   everything else              → patch
 *
 * Prints the new version to stdout (used by the release workflow).
 */

import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const [major, minor, patch] = pkg.version.replace(/-.*$/, '').split('.').map(Number)

let lastTag = ''
try {
  lastTag = execSync('git describe --tags --abbrev=0 2>/dev/null').toString().trim()
} catch {
  // no tags yet — analyse all commits
}

const log = execSync(
  lastTag ? `git log ${lastTag}..HEAD --format="%s"` : 'git log --format="%s"'
).toString()

let bump = 'patch'
if (/^.+!:/m.test(log) || /BREAKING CHANGE/i.test(log)) {
  bump = 'major'
} else if (/^feat(\(.+\))?:/m.test(log)) {
  bump = 'minor'
}

const newVersion =
  bump === 'major' ? `${major + 1}.0.0`
  : bump === 'minor' ? `${major}.${minor + 1}.0`
  : `${major}.${minor}.${patch + 1}`

pkg.version = newVersion
writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n')
process.stdout.write(newVersion)
