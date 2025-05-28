# Node.js 18 Alpine base image
FROM node:18-alpine

# Metadata
LABEL name="smart-market-mcp-server"
LABEL version="1.0.0"
LABEL description="Smart Market MCP Server - Türkiye market fiyatları için akıllı alışveriş asistanı"
LABEL author="Smart Market Team"

# Çalışma dizini oluştur
WORKDIR /app

# Package files kopyala
COPY package*.json ./
COPY tsconfig.json ./

# Dependencies yükle
RUN npm ci --only=production

# Source code kopyala
COPY src/ ./src/
COPY ../shared/ ./shared/

# TypeScript build
RUN npm run build

# Port expose et
EXPOSE 3000

# Health check ekle
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Non-root user oluştur
RUN addgroup -g 1001 -S nodejs
RUN adduser -S mcp -u 1001
USER mcp

# Server başlat
CMD ["npm", "run", "start:http"] 