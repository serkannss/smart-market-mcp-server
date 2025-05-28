# 🛒 SmartMarket MCP + AI Agent + Mobil App

## Proje Yapısı
```
smart-market-assistant/
├── mcp-server/                 # MCP Sunucusu
│   ├── src/
│   │   ├── tools/
│   │   │   ├── market-search.ts
│   │   │   ├── price-tracker.ts
│   │   │   └── location-finder.ts
│   │   ├── server.ts
│   │   └── types.ts
│   ├── package.json
│   └── tsconfig.json
│
├── ai-agent/                   # AI Agent Servisi
│   ├── src/
│   │   ├── agents/
│   │   │   ├── shopping-assistant.ts
│   │   │   ├── price-analyzer.ts
│   │   │   └── recommendation-engine.ts
│   │   ├── services/
│   │   │   ├── market-api.ts
│   │   │   └── user-preferences.ts
│   │   └── app.ts
│   ├── package.json
│   └── Dockerfile
│
├── mobile-app/                 # React Native App
│   ├── src/
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── SearchScreen.tsx
│   │   │   ├── FavoritesScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   ├── components/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── PriceChart.tsx
│   │   │   └── MarketMap.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   └── App.tsx
│   ├── package.json
│   └── app.json
│
├── shared/                     # Ortak Tipler
│   ├── types/
│   │   ├── product.ts
│   │   ├── market.ts
│   │   └── user.ts
│   └── utils/
│       ├── price-calculator.ts
│       └── distance-calculator.ts
│
└── docs/
    ├── api-documentation.md
    ├── mcp-protocol.md
    └── deployment-guide.md
```

## Teknoloji Stack

### Backend (MCP Server + AI Agent)
- **Node.js + TypeScript**
- **Express.js** (API endpoints)
- **Socket.io** (Real-time updates)
- **Redis** (Caching)
- **PostgreSQL** (User data)
- **OpenAI GPT-4** (AI Agent)

### Mobile App
- **React Native + TypeScript**
- **React Navigation**
- **React Query** (Data fetching)
- **Zustand** (State management)
- **React Native Maps**
- **Expo** (Development platform)

### MCP Özellikleri
1. **Market Search Tool** - Ürün arama
2. **Price Tracker Tool** - Fiyat takibi
3. **Location Finder Tool** - En yakın market bulma
4. **Shopping List Tool** - Alışveriş listesi yönetimi
5. **Budget Calculator Tool** - Bütçe hesaplama

### AI Agent Yetenekleri
1. **Akıllı Ürün Önerileri**
2. **Fiyat Trend Analizi**
3. **Bütçe Optimizasyonu**
4. **Market Karşılaştırması**
5. **Kişiselleştirilmiş Alışveriş Planı**

## Özgün Özellikler

### 🎯 **Smart Shopping Assistant**
- Kullanıcının alışveriş geçmişini analiz eder
- En uygun market ve fiyatları önerir
- Alışveriş rotası optimize eder

### 📊 **Price Intelligence**
- Fiyat değişimlerini takip eder
- En iyi alışveriş zamanını önerir
- Kampanya ve indirim bildirimleri

### 🗺️ **Location-Based Recommendations**
- GPS konumuna göre en yakın marketleri bulur
- Trafik durumunu hesaba katar
- Açılış saatlerini kontrol eder

### 💰 **Budget Optimizer**
- Aylık bütçeye göre alışveriş planı
- Harcama analizi ve raporlama
- Tasarruf önerileri

### 🤖 **AI-Powered Chat**
- Doğal dil ile ürün arama
- Akıllı soru-cevap sistemi
- Kişiselleştirilmiş öneriler 