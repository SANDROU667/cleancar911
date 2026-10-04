import test from 'node:test'
import assert from 'node:assert/strict'
import { formatPrice } from '../src/lib/price.ts'

test('preserves distinct workbook amounts and adds exactly one from prefix', () => {
  for (const [raw, expected] of [['250', 250], ['15000', 15000], ['от 18000', 18000], ['550', 550]]) {
    assert.equal(formatPrice(raw).text, `от ${expected.toLocaleString('ru-RU')} ₽`)
  }
})
test('retains per-item, four-item and whole-floor meaning', () => {
  assert.deepEqual(formatPrice('250 за шт / 4 шт 1000'), { text: 'от 250 ₽', note: `за шт. / 4 шт. от ${(1000).toLocaleString('ru-RU')} ₽` })
  assert.equal(formatPrice('10000 весь пол').note, 'весь пол')
  assert.equal(formatPrice('от 300 (взависимости от загрязнения)').note, '(взависимости от загрязнения)')
})
test('does not invent a price for an empty source cell', () => {
  assert.equal(formatPrice(null).text, 'Уточнить стоимость')
  assert.equal(formatPrice('').text, 'Уточнить стоимость')
})
