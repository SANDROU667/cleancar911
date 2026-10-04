import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Droplets, MapPin, Phone, Plus } from 'lucide-react'
import { services, site, type PriceTab } from '../data/site'

const reveal = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.5 } }

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <picture className="hero-media"><source media="(max-width: 600px)" srcSet={site.heroMobileImage} /><img src={site.heroImage} width="2000" height="1334" alt="Чёрный Porsche Panamera на дороге" fetchPriority="high" /></picture>
    <div className="hero-shade" />
    <motion.div className="hero-brand" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}><p className="eyebrow">Москва / Автомобильная культура</p><h1 id="hero-title">{site.name}<span>.</span></h1><p className="hero-caption">Уход. Характер. Движение.</p></motion.div>
    <motion.div className="hero-bottom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
      <div className="hero-copy"><h2>Ваш автомобиль.<br /><span>Наше внимание.</span></h2><p>Шиномонтаж, мойка, полировка<br />и химчистка салона в Черёмушках.</p></div>
      <div className="hero-actions"><a className="button" href="#services">Посмотреть услуги <ArrowUpRight size={21} /></a><a className="hero-location" href="#contacts"><MapPin size={18} /><span>Новочерёмушкинская, 44к3</span></a></div>
      <a className="hero-scroll" href="#services" aria-label="К услугам"><ArrowDown size={21} /></a>
    </motion.div>
  </section>
}

export function ServiceSections({ onSelect }: { onSelect: (tab: PriceTab) => void }) {
  return <>
    <a className="loyalty-teaser" href="#loyalty"><Droplets size={20} /><span>Мойка с привилегиями</span><strong>5-й заказ −25% <span>/</span> 10-й −50%</strong><ArrowUpRight size={21} /></a>
    <section className="services section" id="services"><motion.div {...reveal} className="section-heading"><div><p className="eyebrow">01 / Забота об автомобиле</p><h2>Четыре направления.<br /><span>Один характер.</span></h2></div><p>Кузов. Салон. Колёса.<br />Внимание к тому, что важно вам.</p></motion.div>
      <div className="service-grid">{services.map((service, index) => <motion.a {...reveal} transition={{ duration: 0.5, delay: index * 0.05 }} className="service-card" href="#prices" onClick={() => onSelect(service.id)} key={service.id}>
        <div className="service-photo"><img src={service.image} alt={service.alt} loading="lazy" width="600" height="720" /><span className="service-number">0{index + 1}</span><span className="service-circle"><ArrowUpRight size={24} /></span></div>
        <div className="service-text"><h3>{service.title}</h3><p>{service.subtitle}</p></div>
      </motion.a>)}</div>
    </section>
  </>
}

export function Loyalty() {
  return <section className="loyalty section" id="loyalty" aria-labelledby="loyalty-title">
    <motion.div {...reveal} className="loyalty-heading"><p className="eyebrow">03 / Привилегии на мойке</p><h2 id="loyalty-title">Хорошая привычка.<br /><span>Приятная выгода.</span></h2><p>Возвращайтесь за чистотой.<br />Мы ценим каждый ваш визит.</p></motion.div>
    <div className="reward-grid"><motion.article {...reveal} className="reward reward-five"><div className="reward-top"><span>Пятый заказ</span><Droplets size={24} /></div><p className="reward-value">25<span>%</span></p><div className="reward-bottom"><h3>скидка на мойку</h3><span>05</span></div></motion.article>
      <motion.article {...reveal} transition={{ duration: 0.5, delay: 0.1 }} className="reward reward-ten"><div className="reward-top"><span>Каждый десятый заказ</span><Plus size={26} /></div><p className="reward-value">50<span>%</span></p><div className="reward-bottom"><h3>скидка на мойку</h3><span>10</span></div></motion.article></div>
    <div className="loyalty-bottom"><p>Пятый заказ на мойке со скидкой 25%.<br />Каждый десятый заказ со скидкой 50%.</p><a className="text-link" href={site.phoneHref}>Уточнить детали <ArrowUpRight size={21} /></a></div>
  </section>
}

export function Gallery() {
  const gallery = [
    { image: '/images/detail.webp', alt: 'Кузов и колесо автомобиля под слоем пены', title: 'Чистота в деталях', label: '01 / Мойка' },
    { image: '/images/polish.webp', alt: 'Полировальная машинка на кузове автомобиля', title: 'Глубина отражений', label: '02 / Полировка' },
    { image: '/images/interior.webp', alt: 'Уход за интерьером автомобиля', title: 'Внутренний комфорт', label: '03 / Салон' },
  ]
  return <section className="gallery section" id="gallery"><motion.div {...reveal} className="section-heading"><div><p className="eyebrow">04 / В фокусе</p><h2>Эстетика<br /><span>каждой детали.</span></h2></div><p>От блеска кузова<br />до фактуры материалов салона.</p></motion.div>
    <div className="gallery-grid">{gallery.map((item) => <motion.figure {...reveal} key={item.image}><img src={item.image} alt={item.alt} loading="lazy" width="1200" height="1000" /><figcaption><small>{item.label}</small><span>{item.title}</span><ArrowUpRight size={22} /></figcaption></motion.figure>)}</div>
  </section>
}

export function About() {
  const principles = [['Под ваш автомобиль', 'Учитываем класс автомобиля, размер колёс и состав работ.'], ['Кузов и интерьер', 'Мойка, полировка и химчистка отдельных элементов или комплексный уход.'], ['Понятная стоимость', 'Обсуждаем детали и стоимость работ до начала.']]
  const steps = [['Выбираете услугу', 'Звоните нам или знакомитесь с прайсом.'], ['Обсуждаем детали', 'Подбираем подходящий состав работ.'], ['Занимаемся автомобилем', 'Выполняем согласованные работы.'], ['Вы забираете автомобиль', 'Возвращаетесь к привычному ритму.']]
  return <>
    <section className="about section" id="about"><motion.div {...reveal}><p className="eyebrow">05 / Наш подход</p><h2>Для тех,<br />кто замечает<br /><span>детали.</span></h2></motion.div><div className="principle-list">{principles.map(([title, text], index) => <motion.article {...reveal} key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><Plus size={22} /></motion.article>)}</div></section>
    <section className="process section"><p className="eyebrow">Как мы работаем</p><div className="process-grid">{steps.map(([title, text], index) => <motion.article {...reveal} transition={{ duration: 0.5, delay: index * 0.06 }} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></motion.article>)}</div></section>
    <section className="cta"><img src="/images/hero.webp" alt="Линии кузова Porsche Panamera" loading="lazy" width="2000" height="1334" /><div className="cta-shade" /><motion.div {...reveal} className="cta-content"><p className="eyebrow">{site.name} / Москва</p><h2>Хороший день<br />начинается<br /><span>с чистого авто.</span></h2><a className="button" href={site.phoneHref}>Позвонить <Phone size={20} /></a></motion.div></section>
  </>
}

export function Contacts() {
  return <section className="contacts section" id="contacts" aria-labelledby="contacts-title">
    <motion.div {...reveal} className="contact-copy"><p className="eyebrow">06 / Всегда рядом</p><h2 id="contacts-title">Встретимся<br /><span>в Черёмушках.</span></h2><a className="contact-phone" href={site.phoneHref}>{site.phone}<ArrowUpRight size={25} /></a><address>{site.address}</address><a className="button" href={site.routeUrl} target="_blank" rel="noreferrer">Построить маршрут <ArrowUpRight size={21} /></a><div className="map-links"><a href={site.mapUrl} target="_blank" rel="noreferrer">Яндекс Карты <ArrowUpRight size={15} /></a><a href={site.googleMapUrl} target="_blank" rel="noreferrer">Google Maps <ArrowUpRight size={15} /></a></div></motion.div>
    <div className="map-container"><div className="map-top"><MapPin size={20} /><span>Новочерёмушкинская, 44к3</span><span className="map-coordinate">55.6738° N</span></div><iframe className="map-frame" title={`Карта: ${site.address}`} src={site.mapEmbedUrl} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /><a className="map-fallback" href={site.mapUrl} target="_blank" rel="noreferrer">Открыть карту в новом окне <ArrowUpRight size={17} /></a></div>
  </section>
}
