#!/usr/bin/env node

import express from 'express';
import cors from 'cors';
import { createMCPServer } from '@smithery/sdk';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Tools import
import { 
  marketSearchTool, 
  handleMarketSearch 
} from './tools/market-search.js';
import { 
  priceTrackerTool, 
  createPriceAlertTool,
  handlePriceTracker,
  handleCreatePriceAlert 
} from './tools/price-tracker.js';
import {
  createShoppingListTool,
  addItemToListTool,
  updateListItemTool,
  calculateBudgetTool,
  handleCreateShoppingList,
  handleAddItemToList,
  handleUpdateListItem,
  handleCalculateBudget
} from './tools/shopping-list.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// MCP Server oluştur
const mcpServer = createMCPServer({
  name: 'smart-market-mcp-server',
  version: '1.0.0',
  description: 'Smart Market MCP Server - Akıllı Market Asistanı için MCP sunucusu',
});

// Tools tanımla
const tools = [
  marketSearchTool,
  priceTrackerTool,
  createPriceAlertTool,
  createShoppingListTool,
  addItemToListTool,
  updateListItemTool,
  calculateBudgetTool
];

// Tool handlers tanımla
const toolHandlers = {
  'market_search': handleMarketSearch,
  'price_tracker': handlePriceTracker,
  'create_price_alert': handleCreatePriceAlert,
  'create_shopping_list': handleCreateShoppingList,
  'add_item_to_list': handleAddItemToList,
  'update_list_item': handleUpdateListItem,
  'calculate_budget': handleCalculateBudget,
};

// List tools handler
mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Call tool handler
mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  const handler = toolHandlers[name as keyof typeof toolHandlers];
  if (!handler) {
    throw new Error(`Bilinmeyen tool: ${name}`);
  }

  try {
    const result = await handler(args);
    
    if (result.success) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              message: result.message,
              data: result.data
            }, null, 2),
          },
        ],
      };
    } else {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: false,
              error: result.error,
              message: result.message
            }, null, 2),
          },
        ],
        isError: true,
      };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata oluştu';
    return {
      content: [
        {
          type: 'text',
          text: `Hata: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

// MCP endpoint'ini Express app'e bağla
app.use('/mcp', mcpServer.createExpressHandler());

// Server'ı başlat
app.listen(PORT, () => {
  console.log(`🛒 Smart Market MCP HTTP Server başlatıldı`);
  console.log(`🌐 Server çalışıyor: http://localhost:${PORT}`);
  console.log(`📍 MCP Endpoint: http://localhost:${PORT}/mcp`);
  console.log(`🔧 Mevcut araçlar: ${tools.length} adet`);
  console.log('   - market_search: Ürün arama');
  console.log('   - price_tracker: Fiyat takibi');
  console.log('   - create_price_alert: Fiyat alarmı');
  console.log('   - create_shopping_list: Alışveriş listesi oluşturma');
  console.log('   - add_item_to_list: Listeye ürün ekleme');
  console.log('   - update_list_item: Liste ürünü güncelleme');
  console.log('   - calculate_budget: Bütçe hesaplama');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Server kapatılıyor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Server kapatılıyor...');
  process.exit(0);
}); 