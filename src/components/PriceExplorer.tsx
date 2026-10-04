import { useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CarFront, ChevronDown, CircleGauge, Droplets, Phone, Search, Sparkles, X } from 'lucide-react'
import catalog from '../data/catalog.json'
import { services, site, type PriceTab } from '../data/site'
import { formatPrice } from '../lib/price'
import { serviceLabel } from '../lib/serviceLabel'

type Service = { id: string; name: string; prices: Record<string, string | null>; includes?: string[] }
type Section = { title: string; services: Service[] }
const icons = [CircleGauge, Droplets, Sparkles, CarFront]

function PriceRow({ item, vehicle }: { item: Service; vehicle: string }) {
  const value = item.prices[vehicle]
  const price = formatPrice(value)
  return <div className="price-row">
    <div className="price-name"><span>{serviceLabel(item.name)}</span>{item.includes && <ul className="package-includes">{item.includes.map((name, i) => <li key={`${name}-${i}`}>{serviceLabel(name)}</li>)}</ul>}</div>
    <div className={`price-value ${value == null ? 'price-missing' : ''}`}>
      {value == null ? <a href={site.phoneHref}>{price.text}<ArrowUpRight size={16} /></a> : <strong>{price.text}</strong>}
      {price.note && <small>{serviceLabel(price.note)}</small>}
    </div>
  </div>
}

export function PriceExplorer({ tab, onTabChange }: { tab: PriceTab; onTabChange: (tab: PriceTab) => void }) {
  const [tireGroupIndex, setTireGroupIndex] = useState(0)
  const [radius, setRadius] = useState('R14')
  const [classIndex, setClassIndex] = useState(0)
  const [query, setQuery] = useState('')
  const group = catalog.tireGroups[tireGroupIndex]
  const dataset = tab === 'wash' ? catalog.wash : tab === 'polish' ? catalog.polish : catalog.interior
  const vehicle = tab === 'tires' ? radius : dataset.classes[classIndex]
  const normalizedQuery = query.trim().toLocaleLowerCase('ru-RU')
  const sections: Section[] = tab === 'tires' ? [{ title: 'Шиномонтажные работы', services: group.services }] : dataset.sections
  const filtered = sections.map((section) => ({ ...section, services: section.services.filter((item) => serviceLabel(`${section.title} ${item.name} ${item.includes?.join(' ') || ''}`).toLocaleLowerCase('ru-RU').includes(normalizedQuery)) })).filter((section) => section.services.length)
  const changeTab = (next: PriceTab) => { onTabChange(next); setClassIndex(0); setQuery('') }
  const tabKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const key = event.key
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return
    event.preventDefault()
    const next = key === 'Home' ? 0 : key === 'End' ? 3 : (index + (key === 'ArrowRight' ? 1 : 3)) % 4
    changeTab(services[next].id)
    document.getElementById(`tab-${services[next].id}`)?.focus()
  }
  return <section className="price-section section" id="prices" aria-labelledby="price-title">
    <div className="section-heading"><div><p className="eyebrow">02 / Услуги и стоимость</p><h2 id="price-title">Детали важны.<br /><span>И в прайсе тоже.</span></h2></div><p>От сезонной смены колёс<br />до полного ухода за автомобилем.</p></div>
    <div className="price-tabs" role="tablist" aria-label="Категория услуг">{services.map((item, index) => {
      const Icon = icons[index]
      return <button key={item.id} id={`tab-${item.id}`} role="tab" aria-selected={tab === item.id} aria-controls="price-panel" tabIndex={tab === item.id ? 0 : -1} className={tab === item.id ? 'active' : ''} onClick={() => changeTab(item.id)} onKeyDown={(event) => tabKeys(event, index)}><Icon size={22} /><span>{item.title}</span><small>0{index + 1}</small></button>
    })}</div>
    <div className="price-workspace">
      <aside className="price-settings">
        <div className="filter-fields">{tab === 'tires' ? <>
          <label className="select-field"><span>Тип автомобиля</span><div><select value={tireGroupIndex} onChange={(event) => { const index = Number(event.target.value); setTireGroupIndex(index); setRadius(catalog.tireGroups[index].radii[0]) }}>{catalog.tireGroups.map((item, index) => <option value={index} key={item.name}>{serviceLabel(item.name)}</option>)}</select><ChevronDown size={18} /></div></label>
          <fieldset className="radius-filter"><legend>Радиус колёс</legend><div>{group.radii.map((item) => <button key={item} aria-pressed={radius === item} className={radius === item ? 'selected' : ''} onClick={() => setRadius(item)}>{item}</button>)}</div></fieldset>
        </> : <label className="select-field"><span>Класс автомобиля</span><div><select value={classIndex} onChange={(event) => setClassIndex(Number(event.target.value))}>{dataset.classes.map((name, index) => <option value={index} key={name}>{serviceLabel(name)}</option>)}</select><ChevronDown size={18} /></div></label>}</div>
        <label className="price-search"><Search size={19} /><input type="search" placeholder="Найти услугу" aria-label="Найти услугу" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button aria-label="Очистить поиск" onClick={() => setQuery('')}><X size={18} /></button>}</label>
        <div className="price-help"><span>Обсудим ваш автомобиль</span><a href={site.phoneHref}><Phone size={18} />{site.phone}</a></div>
        {tab === 'wash' && <a className="wash-reward-note" href="#loyalty"><span>Ваши привилегии</span><strong>5-й заказ −25%<br />Каждый 10-й −50%</strong><ArrowUpRight size={23} /></a>}
      </aside>
      <AnimatePresence mode="wait"><motion.div key={`${tab}-${normalizedQuery ? 'search' : 'all'}`} className="price-results" id="price-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} tabIndex={0} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
        <div className="price-context"><span>{serviceLabel(tab === 'tires' ? `${group.name} / ${radius}` : vehicle)}</span><span>₽</span></div>
        {!filtered.length && <div className="empty-state"><Search size={28} /><h3>Ничего не найдено</h3><p>Попробуйте другое название услуги.</p><button className="text-link" onClick={() => setQuery('')}>Сбросить поиск <X size={16} /></button></div>}
        {filtered.map((section, index) => tab === 'tires' ? <div key={section.title}>{section.services.map((item) => <PriceRow key={item.id} item={item} vehicle={vehicle} />)}</div> : <details className="price-group" key={`${tab}-${section.title}-${!!normalizedQuery}`} open={normalizedQuery || index === 0 ? true : undefined}>
          <summary><h3>{serviceLabel(section.title)}</h3><span>{section.services.length.toString().padStart(2, '0')}<ChevronDown size={20} /></span></summary>
          <div>{section.services.map((item) => <PriceRow key={item.id} item={item} vehicle={vehicle} />)}</div>
        </details>)}
        <p className="price-footnote">Стоимость указана «от». Итоговая сумма зависит от состояния автомобиля и объёма работ.</p>
      </motion.div></AnimatePresence>
    </div>
  </section>
}
