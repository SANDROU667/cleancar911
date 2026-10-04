import fs from 'node:fs/promises'

const assets = [
  ['hero.webp', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85&fm=webp'],
  ['hero-mobile.webp', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85&fm=webp'],
  ['wash.webp', 'https://images.pexels.com/photos/6873081/pexels-photo-6873081.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp'],
  ['polish.webp', 'https://images.pexels.com/photos/11139244/pexels-photo-11139244.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp'],
  ['detail.webp', 'https://images.pexels.com/photos/5693659/pexels-photo-5693659.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp'],
  ['interior.webp', 'https://images.pexels.com/photos/6873103/pexels-photo-6873103.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp'],
  ['tires.webp', 'https://images.pexels.com/photos/6870311/pexels-photo-6870311.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp'],
]
await fs.mkdir('public/images', { recursive: true })
for (const [name, url] of assets) {
  const response = await fetch(url)
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`${name}: ${response.status}`)
  const data = Buffer.from(await response.arrayBuffer())
  await fs.writeFile(`public/images/${name}`, data)
  console.log(`${name}: ${data.length} bytes`)
}
await fs.mkdir('public/fonts', { recursive: true })
for (const name of ['manrope-cyrillic-wght-normal.woff2', 'manrope-latin-wght-normal.woff2']) {
  const response = await fetch(`https://cdn.jsdelivr.net/npm/@fontsource-variable/manrope@5.2.8/files/${name}`)
  if (!response.ok) throw new Error(`Font ${name}: ${response.status}`)
  await fs.writeFile(`public/fonts/${name}`, Buffer.from(await response.arrayBuffer()))
}
const license = await fetch('https://cdn.jsdelivr.net/npm/@fontsource-variable/manrope@5.2.8/LICENSE')
if (license.ok) await fs.writeFile('public/fonts/LICENSE.txt', await license.text())
