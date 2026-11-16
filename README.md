# 🌱 Minhas Plantas (Plant Tracker PWA)

Um Progressive Web App (PWA) moderno, acolhedor e mobile-first para acompanhar os cuidados e a rotina de rega das suas plantas.

Construído para funcionar 100% offline, com armazenamento local no próprio dispositivo (IndexedDB) e suporte a captura de fotos reais com a câmera do celular.

---

## ✨ Funcionalidades

- **🏠 Início Acolhedor:** Resumo inteligente das plantas que precisam de atenção hoje, com atalho para a próxima rega.
- **📷 Fotos Reais com a Câmera:** Capture fotos das suas plantas direto pelo celular (com compressão automática no navegador para máxima performance).
- **💡 Dicas de Rega e Cuidados:** Catálogo interno com espécies comuns brasileiras (Jiboia, Espada-de-São-Jorge, Suculentas, etc.), considerando iluminação e ajuste para o clima do Brasil (verão vs. inverno).
- **📋 Linha do Tempo de Histórico:** Acompanhe quando cada planta foi regada com filtros por período (*Todas*, *Este mês*, *Últimos 3 meses*).
- **🎉 Celebração de Rega:** Tela comemorativa com feedback visual ao registrar o cuidado com suas plantas.
- **⚙️ Configurações & Privacidade:** Notificações locais no dispositivo, sem contas obrigatórias e sem coleta de dados em servidores externos.
- **📱 PWA Instalável:** Pode ser adicionado à tela de início do Android ou iOS (Safari) para funcionar em tela cheia como aplicativo nativo.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** React 18 + TypeScript
- **Build & PWA:** Vite 6 + `vite-plugin-pwa` (Workbox)
- **Estilização:** Tailwind CSS + Tipografia DM Sans & Manrope
- **Banco de Dados Local:** Dexie.js (IndexedDB)
- **Roteamento:** React Router v7
- **Ícones:** Lucide React

---

## 🚀 Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone git@github.com:joaovaladares/plant-tracker.git
   cd plant-tracker
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Para testar no celular (mesma rede Wi-Fi):
   ```bash
   npm run dev -- --host
   ```

5. Para gerar o build de produção:
   ```bash
   npm run build
   ```

---

*🌱 Cultive o que te faz bem! 💚*
