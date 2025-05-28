#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Basit market arama fonksiyonu
async function searchMarket(keywords: string) {
  // Simüle edilmiş market verisi
  return {
    success: true,
    message: `"${keywords}" için arama sonuçları`,
    data: [
      {
        name: `${keywords} - BIM`,
        price: 15.99,
        market: 'BIM',
        location: 'Ankara'
      },
      {
        name: `${keywords} - A101`,
        price: 16.50,
        market: 'A101',
        location: 'Ankara'
      }
    ]
  };
}

// MCP Server oluştur
const server = new Server(
  {
    name: 'smart-market-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tools listesi
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'market_search',
        description: 'Türkiye market fiyatları API\'sini kullanarak ürün arar',
        inputSchema: {
          type: 'object',
          properties: {
            keywords: {
              type: 'string',
              description: 'Aranacak ürün adı',
            },
          },
          required: ['keywords'],
        },
      },
    ],
  };
});

// Tool çağrıları
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'market_search') {
    const keywords = args.keywords as string;
    const result = await searchMarket(keywords);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }

  throw new Error(`Bilinmeyen tool: ${name}`);
});

// Server'ı başlat
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('🛒 Smart Market MCP Server başlatıldı');
}

main().catch((error) => {
  console.error('Server hatası:', error);
  process.exit(1);
}); 