import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import XLSX from 'xlsx'

const directory = process.env.PRICE_SOURCE_DIR || path.resolve('..')
const sourceFiles = ['Прайс шинка.xlsx', 'Прайс мойка.xlsx', 'Полировка.xlsx', 'Химчистка салона.xlsx']
const clean = (value) => value == null ? null : String(value).trim().replace(/\s+/g, ' ')
const sources = sourceFiles.map((name) => {
  const filename = fs.readdirSync(directory).find((file) => file.normalize('NFC') === name)
  assert.ok(filename, `Missing source: ${name}`)
  const workbook = XLSX.readFile(path.join(directory, filename))
  return { filename, sheet: workbook.Sheets[workbook.SheetNames[0]] }
})
const used = sources.map(() => new Set())
function cell(index, row, column) {
  const source = sources[index]
  const merge = source.sheet['!merges']?.find(({ s, e }) => row - 1 >= s.r && row - 1 <= e.r && column >= s.c && column <= e.c)
  const address = XLSX.utils.encode_cell(merge?.s || { r: row - 1, c: column })
  const value = clean(source.sheet[address]?.v)
  if (column > 0 && value !== null) used[index].add(address)
  return value
}
function item(index, row, classes, options = {}) {
  return {
    id: `${index}-${row}`,
    name: options.name || cell(index, row, 0),
    prices: Object.fromEntries(classes.map((name, i) => [name, cell(index, row, i + 1)])),
    ...(options.includes ? { includes: options.includes } : {}),
    source: { file: sources[index].filename, row },
  }
}
function classCatalog(index, groups) {
  const classes = [1, 2, 3, 4, 5].map((column) => cell(index, 3, column))
  return { classes, sections: groups.map(([title, rows]) => ({ title, services: rows.map((row) => item(index, row, classes)) })) }
}
const tireGroups = [[3, 4, 5, 13], [16, 17, 18, 26]].map(([titleRow, headerRow, start, end]) => {
  const radii = Array.from({ length: end - start + 1 }, (_, i) => cell(0, start + i, 1))
  return {
    name: cell(0, titleRow, 1), radii,
    services: Array.from({ length: 9 }, (_, i) => ({
      id: `tire-${headerRow}-${i}`, name: cell(0, headerRow, i + 2),
      prices: Object.fromEntries(radii.map((radius, r) => [radius, cell(0, start + r, i + 2)])),
    })),
  }
})
const washClasses = [1, 2, 3, 4, 5].map((column) => cell(1, 2, column))
const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i)
function washSection(titleRow, rows) {
  return { title: cell(1, titleRow, 0), services: rows.map((row) => item(1, row, washClasses)) }
}
function bundle(titleRow, priceRow, first, last) {
  const title = cell(1, titleRow, 0)
  return { title, services: [item(1, priceRow, washClasses, { name: title, includes: range(first, last).map((row) => cell(1, row, 0)) })] }
}
const wash = {
  classes: washClasses,
  sections: [
    washSection(3, [4]), washSection(5, [6]), bundle(7, 10, 8, 13), bundle(14, 16, 15, 18),
    washSection(19, range(20, 24)), bundle(25, 27, 26, 29), washSection(30, range(31, 34)),
    bundle(35, 38, 36, 41), bundle(42, 45, 43, 47), bundle(48, 54, 49, 60),
    washSection(61, range(62, 67)), washSection(68, [69, 70]),
    ...[72, 75, 78, 81].map((row) => washSection(row, [row + 1, row + 2])),
    washSection(84, range(85, 94)),
  ],
}
const polish = classCatalog(2, [[cell(2, 2, 0), [4, 5]], [cell(2, 6, 0), range(7, 13)], [cell(2, 14, 0), [15]]])
const interior = classCatalog(3, [[cell(3, 2, 0), [4, 5]], [cell(3, 6, 0), range(7, 16)]])
// Column L has numbers but no service heading in the supplied tire workbook.
// Preserve it for the owner without inventing a public service name.
const unlabeledTireColumn = [...range(5, 13), ...range(18, 26)].map((row) => ({ row, radius: cell(0, row, 1), value: cell(0, row, 11) }))
for (const [index, source] of sources.entries()) {
  for (const [address, entry] of Object.entries(source.sheet)) {
    if (address.startsWith('!')) continue
    if (typeof entry.v === 'number' || /^от \d|^\d+ (за|весь)/i.test(String(entry.v))) {
      assert.ok(used[index].has(address), `Unmapped price ${source.filename}:${address}`)
    }
  }
}
const catalog = { tireGroups, wash, polish, interior, unlabeledTireColumn }
const output = path.resolve('src/data/catalog.json')
const serialized = JSON.stringify(catalog, null, 2) + '\n'
if (process.argv.includes('--check')) {
  assert.equal(fs.readFileSync(output, 'utf8'), serialized, 'Catalog differs from source workbooks')
  console.log('PASS: every source price mapped; catalog matches all four workbooks, including merged prices and package contents.')
} else {
  fs.writeFileSync(output, serialized)
  console.log(`Imported all four price lists into ${output}`)
}
