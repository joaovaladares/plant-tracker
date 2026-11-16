# 🌿 Plant Tracker — Walkthrough

## O que foi construído

Um PWA (Progressive Web App) completo para rastreamento de rega de plantas, mobile-first, em Português do Brasil. Pode ser instalado na tela inicial do celular sem passar por nenhuma loja de apps.

---

## Stack utilizada

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript |
| Build / PWA | Vite 6 + `vite-plugin-pwa` (Workbox) |
| Estilo | Tailwind CSS 3 |
| Banco de Dados | Dexie.js (IndexedDB) + `dexie-react-hooks` |
| Roteamento | React Router v7 |
| Notificações | Web Notifications API |

---

## Funcionalidades implementadas

### 🏠 Dashboard (Home)
- Grade de **2 colunas com fotos** das suas plantas
- Badge de status visual em cada card: 🚨 Atrasada / 💧 Regar hoje! / 🟡 Em breve / ✅ Em dia
- **Banner de alerta** no topo quando há plantas pendentes
- Tela de boas-vindas amigável quando vazio
- Botão `+` fixo para adicionar novas plantas

### ➕ Adicionar Planta
- **Captura de foto** direto pela câmera do celular ou da galeria
- Compressão automática da imagem (máx 800px, 80% qualidade) antes de salvar
- Nome personalizado para a planta
- Seleção opcional do tipo (13 espécies + "Outro") com dicas exibidas em tempo real
- Slider para ajuste do intervalo de rega (1–60 dias)
- Campo de observações livres
- Toggle de notificações por planta

### 🌿 Detalhe da Planta
- Foto em destaque (hero image)
- Status de rega prominente com cor
- Botão grande **"💧 Reguei agora!"** — registra no histórico instantaneamente
- Contador de regas realizadas
- Histórico de regas com datas
- Dicas de cuidado da espécie selecionada
- Exclusão com confirmação via modal

### ⚙️ Configurações
- Ativar notificações push do navegador
- Instruções de instalação do PWA (Android e iPhone)
- Informação sobre detecção automática de estação (hemisfério sul)

### 🔔 Lembretes inteligentes
- Detecção automática da estação do ano (**hemisfério sul**)
  - Verão: Dezembro, Janeiro, Fevereiro, Março
  - Inverno: Junho, Julho, Agosto, Setembro
- Intervalo de rega sugerido ajustado por espécie e estação

---

## Arquivos criados

```
plant-tracker/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
├── public/
│   └── icons/
│       ├── icon-192.png
│       ├── icon-512.png
│       ├── icon-512-maskable.png
│       ├── apple-touch-icon.png
│       └── icon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── db/index.ts
    ├── data/speciesHints.ts        (13 espécies + "Outro")
    ├── utils/
    │   ├── watering.ts             (lógica de datas, estações, status)
    │   ├── notifications.ts        (Notification API)
    │   └── imageUtils.ts           (compressão de fotos)
    ├── hooks/
    │   ├── usePlants.ts            (CRUD + Dexie live queries)
    │   └── useNotifications.ts
    ├── components/
    │   ├── PlantCard.tsx           (card com foto na grade)
    │   ├── AddPlantForm.tsx        (formulário completo)
    │   ├── BottomNav.tsx
    │   └── WateringBanner.tsx
    └── pages/
        ├── Dashboard.tsx
        ├── AddPlant.tsx
        ├── PlantDetail.tsx
        └── Settings.tsx
```

---

## Verificação

### Build de produção
```
✓ 59 modules transformed
dist/index.html                   1.02 kB │ gzip:   0.50 kB
dist/assets/index-*.css          19.83 kB │ gzip:   4.29 kB
dist/assets/index-*.js          312.12 kB │ gzip: 101.34 kB
PWA: 15 entries precached (Service Worker gerado)
```
**Build: ✅ Sem erros de TypeScript ou de bundle.**

### Dev server
```
HTTP 200 em http://localhost:5173/
```

---

## Como rodar

```bash
cd plant-tracker
npm run dev          # desenvolvimento local
npm run dev -- --host  # acessível na rede local (celular na mesma rede Wi-Fi)
npm run build        # build de produção
npm run preview      # preview do build (Service Worker ativo)
```

### Acessar pelo celular (mesma rede Wi-Fi)
1. Rode `npm run dev -- --host`
2. No terminal aparece o endereço `Network: http://192.168.x.x:5173/`
3. Abra esse endereço no celular
4. Android Chrome: menu → "Adicionar à tela inicial" para instalar como PWA

---

## Próximos passos sugeridos

| Feature | Complexidade |
|---|---|
| Publicar no Netlify/Vercel (HTTPS + acesso de qualquer lugar) | Baixa |
| Notificações enquanto app fechado (Supabase + serverless) | Média |
| Galeria de fotos por planta (histórico fotográfico) | Baixa |
| Backup/exportação dos dados como JSON | Baixa |
