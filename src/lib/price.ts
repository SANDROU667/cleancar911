const rubles = (value: string) => `${Number(value).toLocaleString('ru-RU')} ₽`

export function formatPrice(value: string | null | undefined) {
  if (value == null || value.trim() === '') return { text: 'Уточнить стоимость', note: '' }
  const normalized = value.trim().replace(/^от\s+/i, '').replace(/\s+/g, ' ')
  const perItem = normalized.match(/^(\d+)\s+за\s*шт\s*\/\s*4\s*шт\s*(\d+)$/i)
  if (perItem) return { text: `от ${rubles(perItem[1])}`, note: `за шт. / 4 шт. от ${rubles(perItem[2])}` }
  const price = normalized.match(/^(\d+)(.*)$/)
  if (!price) return { text: value, note: '' }
  return { text: `от ${rubles(price[1])}`, note: price[2].trim() }
}
