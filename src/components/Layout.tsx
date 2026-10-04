import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Gift, ListFilter, MapPin, Menu, Phone, X } from 'lucide-react'
import { navigation, site } from '../data/site'

const year = new Date().getFullYear()

export function Brand() {
  return <a className="brand" href="#top" aria-label={`${site.name}, на главную`}><span className="brand-mark" aria-hidden="true">///</span>{site.name}<span className="brand-dot">.</span></a>
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const update = () => setCompact(window.scrollY > 40)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  useEffect(() => {
    if (!open) return
    const element = dialog.current
    element?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
      element?.close()
    }
  }, [open])
  return <>
    <a className="skip-link" href="#main">К содержимому</a>
    <header className={`header ${compact ? 'is-compact' : ''}`}>
      <Brand />
      <nav className="desktop-nav" aria-label="Основная навигация">{navigation.map(({ id, label }) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
      <a className="header-phone" href={site.phoneHref} aria-label={`Позвонить: ${site.phone}`}><Phone size={18} /><span>{site.phone}</span></a>
      <button className="icon-button menu-toggle" title="Открыть меню" aria-label="Открыть меню" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><Menu /></button>
    </header>
    <dialog ref={dialog} id="mobile-menu" className="mobile-menu" onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
      <div className="menu-sheet">
        <div className="menu-top"><Brand /><button className="icon-button" aria-label="Закрыть меню" onClick={() => setOpen(false)}><X /></button></div>
        <nav aria-label="Мобильная навигация">{navigation.map(({ id, label }, index) => <a href={`#${id}`} key={id} onClick={() => setOpen(false)}><small>0{index + 1}</small>{label}<ArrowUpRight size={24} /></a>)}</nav>
        <div className="menu-contact"><span>Москва / Черёмушки</span><a href={site.phoneHref}>{site.phone}<Phone size={20} /></a></div>
      </div>
    </dialog>
  </>
}

export function MobileDock() {
  return <nav className="mobile-dock" aria-label="Быстрые действия">
    <a href="#prices"><ListFilter size={21} /><span>Прайс</span></a>
    <a href="#loyalty"><Gift size={21} /><span>Скидки</span></a>
    <a href="#contacts"><MapPin size={21} /><span>Карта</span></a>
    <a className="dock-call" href={site.phoneHref}><Phone size={20} /><span>Позвонить</span></a>
  </nav>
}

export function Footer() {
  return <footer className="footer">
    <div className="footer-main"><div><Brand /><p>Шиномонтаж и уход за автомобилем.<br />Москва, Черёмушки.</p></div>
      <nav aria-label="Навигация в подвале">{navigation.map(({ id, label }) => <a href={`#${id}`} key={id}>{label}</a>)}</nav>
      <div className="footer-contact"><a href={site.phoneHref}>{site.phone}</a><address>{site.address}</address><a href={site.routeUrl} target="_blank" rel="noreferrer">Построить маршрут <ArrowUpRight size={17} /></a></div>
    </div>
    <div className="footer-bottom"><span>© {year} {site.name}</span><span>Внимание к каждой детали.</span><a href="#top">Наверх <ArrowUpRight size={16} /></a></div>
  </footer>
}
