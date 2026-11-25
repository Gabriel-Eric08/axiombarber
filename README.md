# Navalha & Co. — Landing page de barbearia (React + Vite)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera /dist
```

## Estrutura

```
src/
  data/site.js        ← TUDO editável: nome, WhatsApp, serviços, preços, barbeiros, horários, imagens, depoimentos
  utils/hours.js      ← lógica de "aberto agora" e geração de horários disponíveis
  components/         ← peças reutilizáveis (Button, ImageSlot, Reveal, SectionHeading, Counter, WhatsAppFloat…)
  sections/           ← uma seção por arquivo (Navbar, Hero, About, Services, Booking, Team, Gallery, Testimonials, Hours, FinalCta, Footer)
  styles/global.css   ← paleta e tipografia (variáveis CSS)
  App.jsx             ← ordem das seções — remova/reordene à vontade
```

## Personalização rápida

- **WhatsApp**: `brand.whatsapp` em `site.js` (formato `5511999999999`).
- **Imagens**: qualquer `src: null` / `img: null` mostra o placeholder **"Sua imagem aqui"**. As fotos atuais são do Unsplash (uso livre).
- **Agenda**: os horários ocupados são simulados em `slotsFor()` (`utils/hours.js`). Para uma agenda real, troque essa função por um `fetch` à sua API (Google Calendar, Calendly, backend próprio etc.).
- **Cores**: variáveis `--ink`, `--cream`, `--brass` em `global.css`.
- **Mapa**: em `sections/Hours.jsx`, troque o `ImageSlot` por um `<iframe>` do Google Maps.

## Bibliotecas

- `framer-motion` — animações (reveal no scroll, parallax, máscara de texto, lightbox, transições)
- `lucide-react` — ícones
