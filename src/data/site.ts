const address = 'Москва, Новочерёмушкинская улица, 44к3, 117418'
const point = { latitude: 55.673819, longitude: 37.565183 }

export const site = {
  name: 'CLEANCAR911',
  address,
  phone: '+7 (925) 717-89-11',
  phoneHref: 'tel:+79257178911',
  point,
  mapUrl: `https://yandex.ru/maps/?text=${encodeURIComponent(address)}&ll=${point.longitude}%2C${point.latitude}&z=17`,
  routeUrl: `https://yandex.ru/maps/?rtext=~${point.latitude}%2C${point.longitude}&rtt=auto`,
  googleMapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
  mapEmbedUrl: `https://yandex.ru/map-widget/v1/?ll=${point.longitude}%2C${point.latitude}&z=17&pt=${point.longitude}%2C${point.latitude}%2Cpm2blm&lang=ru_RU`,
  heroImage: '/images/hero.webp',
  heroMobileImage: '/images/hero-mobile.webp',
}

export const navigation = [
  { label: 'Услуги', id: 'services' },
  { label: 'Цены', id: 'prices' },
  { label: 'Привилегии', id: 'loyalty' },
  { label: 'Галерея', id: 'gallery' },
  { label: 'О нас', id: 'about' },
  { label: 'Контакты', id: 'contacts' },
]

export type PriceTab = 'tires' | 'wash' | 'polish' | 'interior'

export const services: { id: PriceTab; title: string; subtitle: string; image: string; alt: string }[] = [
  { id: 'tires', title: 'Шиномонтаж', subtitle: 'Смена сезона. Точность движения.', image: '/images/tires.webp', alt: 'Специалист проверяет колесо автомобиля' },
  { id: 'wash', title: 'Мойка', subtitle: 'Чистота в каждой линии.', image: '/images/wash.webp', alt: 'Мойка кузова автомобиля в пене' },
  { id: 'polish', title: 'Полировка', subtitle: 'Глубина цвета. Блеск деталей.', image: '/images/polish.webp', alt: 'Полировка кузова машинкой' },
  { id: 'interior', title: 'Химчистка', subtitle: 'Особое внимание к интерьеру.', image: '/images/interior.webp', alt: 'Очистка интерьера автомобиля' },
]
