import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { Footer, Header, MobileDock } from './components/Layout'
import { About, Contacts, Gallery, Hero, Loyalty, ServiceSections } from './components/Sections'
import { PriceExplorer } from './components/PriceExplorer'
import { site, type PriceTab } from './data/site'

const business = {
  '@context': 'https://schema.org', '@type': 'AutomotiveBusiness', name: site.name,
  telephone: '+79257178911',
  address: { '@type': 'PostalAddress', streetAddress: 'Новочерёмушкинская улица, 44к3', addressLocality: 'Москва', postalCode: '117418', addressCountry: 'RU' },
  geo: { '@type': 'GeoCoordinates', ...site.point }, hasMap: site.mapUrl,
}

export default function App() {
  const [tab, setTab] = useState<PriceTab>('tires')
  return <MotionConfig reducedMotion="user"><div id="top">
    <script type="application/ld+json">{JSON.stringify(business)}</script>
    <Header />
    <main id="main"><Hero /><ServiceSections onSelect={setTab} /><PriceExplorer key={tab} tab={tab} onTabChange={setTab} /><Loyalty /><Gallery /><About /><Contacts /></main>
    <Footer /><MobileDock />
  </div></MotionConfig>
}
