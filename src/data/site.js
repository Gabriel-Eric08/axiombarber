// ============================================================
//  CONFIGURAÇÃO CENTRAL — edite aqui e a página inteira muda.
// ============================================================

const u = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`

export const brand = {
  name: 'Navalha & Co.',
  short: 'Navalha',
  tagline: 'Barbearia clássica, corte contemporâneo.',
  since: 2014,
  // Número no formato internacional, só dígitos (55 + DDD + número)
  whatsapp: '5511999999999',
  phoneLabel: '(11) 99999-9999',
  instagram: 'https://instagram.com/',
  address: 'Rua Augusta, 1234 — Consolação, São Paulo/SP',
  mapsUrl: 'https://maps.google.com/?q=Rua+Augusta+1234+Sao+Paulo',
  email: 'contato@navalhaeco.com.br',
}

export const waLink = (text = `Olá! Vim pelo site da ${brand.name} e gostaria de agendar um horário.`) =>
  `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`

export const nav = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Horários', href: '#horarios' },
]

// Use `null` em src para mostrar o placeholder "Sua imagem aqui".
export const images = {
  hero: u('photo-1622287162716-f311baa1a2b8', 1600),
  about: u('photo-1585747860715-2ba37e788b70'),
  aboutDetail: u('photo-1621605815971-fbc98d665033', 700),
  finalCta: u('photo-1503951914875-452162b0f3f1', 1600),
}

export const services = [
  { id: 'corte', name: 'Corte Clássico', desc: 'Tesoura e máquina, lavagem e finalização com pomada.', price: 60, duration: 45 },
  { id: 'fade', name: 'Fade / Degradê', desc: 'Degradê navalhado com acabamento de precisão.', price: 70, duration: 50 },
  { id: 'barba', name: 'Barba Terapia', desc: 'Toalha quente, óleo pré-barba e navalha.', price: 50, duration: 35 },
  { id: 'combo', name: 'Corte + Barba', desc: 'O ritual completo. Saia pronto para qualquer coisa.', price: 100, duration: 80, featured: true },
  { id: 'pigmentacao', name: 'Pigmentação', desc: 'Correção de falhas na barba ou no cabelo.', price: 40, duration: 25 },
  { id: 'sobrancelha', name: 'Sobrancelha', desc: 'Alinhamento na navalha ou na pinça.', price: 25, duration: 15 },
]

export const barbers = [
  { id: 'rafa', name: 'Rafael Moura', role: 'Fundador · Navalha', years: 12, img: null },
  { id: 'dudu', name: 'Eduardo Lima', role: 'Especialista em Fade', years: 7, img: null },
  { id: 'thi', name: 'Thiago Reis', role: 'Barba & Visagismo', years: 9, img: null },
  { id: 'gab', name: 'Gabriel Nunes', role: 'Cortes Texturizados', years: 5, img: null },
]

// 0 = domingo ... 6 = sábado. `null` = fechado.
export const openingHours = [
  { day: 'Domingo', open: null, close: null },
  { day: 'Segunda', open: '13:00', close: '20:00' },
  { day: 'Terça', open: '09:00', close: '20:00' },
  { day: 'Quarta', open: '09:00', close: '20:00' },
  { day: 'Quinta', open: '09:00', close: '21:00' },
  { day: 'Sexta', open: '09:00', close: '21:00' },
  { day: 'Sábado', open: '08:00', close: '18:00' },
]

export const slotMinutes = 40

export const gallery = [
  { src: u('photo-1599351431202-1e0f0137899a', 900), alt: 'Detalhe de degradê navalhado', tall: true },
  { src: u('photo-1605497788044-5a32c7078486', 900), alt: 'Finalização com secador' },
  { src: u('photo-1517832606299-7ae9b720a186', 900), alt: 'Barba na tesoura' },
  { src: null, alt: 'Foto do seu espaço', tall: true },
  { src: u('photo-1567894340315-735d7c361db0', 900), alt: 'Barbeiro trabalhando em corte texturizado' },
  { src: u('photo-1512690459411-b9245aed614b', 900), alt: 'Cadeira de barbeiro em couro' },
  { src: u('photo-1493256338651-d82f7acb2b38', 900), alt: 'Acabamento na máquina' },
  { src: u('photo-1622286342621-4bd786c2447c', 900), alt: 'Corte na tesoura' },
]

export const testimonials = [
  { name: 'Lucas F.', text: 'Melhor degradê que já fiz. Ambiente top, café bom e ninguém te apressa.', rating: 5 },
  { name: 'Marcelo A.', text: 'Agendei pelo WhatsApp em dois minutos e fui atendido no horário. Raro hoje em dia.', rating: 5 },
  { name: 'Pedro H.', text: 'A barba terapia é outro nível. Toalha quente, navalha, saí outra pessoa.', rating: 5 },
  { name: 'João V.', text: 'Frequento há 4 anos. O Rafael entende exatamente o que eu quero sem eu explicar.', rating: 5 },
]

export const stats = [
  { value: 12, suffix: '+', label: 'anos de navalha' },
  { value: 18000, suffix: '+', label: 'cortes realizados' },
  { value: 4.9, suffix: '★', label: 'avaliação média', decimals: 1 },
]
