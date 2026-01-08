/**
 * Real-Time Crypto Price Server
 * Source: Binance WebSocket
 * Integrated with Trading AI Hub
 */

const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Disable cache completely
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// ===============================
// REAL-TIME DATA STORAGE
// ===============================
let prices = {};
let priceHistory = {}; // لتخزين السجل التاريخي للأسعار

// ===============================
// BINANCE WEBSOCKET - Multiple Symbols
// ===============================
const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT', 'DOGEUSDT'];
const streams = symbols.map(s => `${s.toLowerCase()}@trade`).join('/');
const binanceUrl = `wss://stream.binance.com:9443/ws/${streams}`;

console.log('🔗 Connecting to Binance WebSocket...');
const ws = new WebSocket(binanceUrl);

ws.on('open', () => {
  console.log('✅ Connected to Binance WebSocket');
  console.log(`📊 Monitoring: ${symbols.join(', ')}`);
});

ws.on('message', (data) => {
  try {
    const trade = JSON.parse(data);
    const symbol = trade.s;
    const price = parseFloat(trade.p);
    const timestamp = new Date(trade.T).toISOString();
    
    // تخزين السعر الحالي
    if (!prices[symbol]) {
      prices[symbol] = {
        symbol: symbol,
        price: price,
        quantity: parseFloat(trade.q),
        timestamp: timestamp,
        change24h: 0,
        high24h: price,
        low24h: price
      };
      
      // تهيئة السجل التاريخي
      priceHistory[symbol] = [{ price, timestamp }];
    } else {
      // تحديث البيانات
      const oldPrice = prices[symbol].price;
      prices[symbol].price = price;
      prices[symbol].quantity = parseFloat(trade.q);
      prices[symbol].timestamp = timestamp;
      
      // حساب التغيير
      prices[symbol].change24h = ((price - oldPrice) / oldPrice * 100).toFixed(2);
      
      // تحديث أعلى وأقل سعر
      if (price > prices[symbol].high24h) prices[symbol].high24h = price;
      if (price < prices[symbol].low24h) prices[symbol].low24h = price;
      
      // إضافة إلى السجل التاريخي (الاحتفاظ بآخر 100 سعر)
      if (!priceHistory[symbol]) priceHistory[symbol] = [];
      priceHistory[symbol].push({ price, timestamp });
      if (priceHistory[symbol].length > 100) {
        priceHistory[symbol].shift();
      }
    }
  } catch (err) {
    console.error('❌ Error parsing message:', err);
  }
});

ws.on('error', (err) => {
  console.error('❌ WebSocket Error:', err);
});

ws.on('close', () => {
  console.log('⚠️  WebSocket closed. Attempting to reconnect...');
  setTimeout(() => {
    // إعادة الاتصال بعد 5 ثوانٍ
    const newWs = new WebSocket(binanceUrl);
    Object.assign(ws, newWs);
  }, 5000);
});

// ===============================
// API ENDPOINTS
// ===============================

// الحصول على جميع الأسعار الحالية
app.get('/api/prices', (req, res) => {
  res.json({
    source: 'Binance',
    lastServerUpdate: new Date().toISOString(),
    data: prices,
    count: Object.keys(prices).length
  });
});

// الحصول على سعر محدد
app.get('/api/prices/:symbol', (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  if (prices[symbol]) {
    res.json({
      source: 'Binance',
      data: prices[symbol]
    });
  } else {
    res.status(404).json({ error: 'Symbol not found' });
  }
});

// الحصول على السجل التاريخي لسعر محدد
app.get('/api/history/:symbol', (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  if (priceHistory[symbol]) {
    res.json({
      symbol: symbol,
      history: priceHistory[symbol]
    });
  } else {
    res.status(404).json({ error: 'Symbol not found' });
  }
});

// فحص صحة الخادم
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    serverTime: new Date().toISOString(),
    connectedSymbols: Object.keys(prices).length,
    wsStatus: ws.readyState === WebSocket.OPEN ? 'connected' : 'disconnected'
  });
});

// ===============================
// SIMPLE FRONTEND PAGE
// ===============================
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trading AI Hub - Real-Time Crypto Prices</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      background: #0b1220;
      color: #00f0ff;
      font-family: 'JetBrains Mono', monospace;
      padding: 20px;
      min-height: 100vh;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding: 20px;
      border: 2px solid #00f0ff;
      border-radius: 8px;
      background: rgba(0, 240, 255, 0.05);
    }
    
    .header h1 {
      font-size: 24px;
      text-shadow: 0 0 10px #00f0ff;
    }
    
    .time {
      font-size: 14px;
      color: #00ff88;
    }
    
    .prices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .price-box {
      border: 2px solid #00f0ff;
      padding: 20px;
      border-radius: 8px;
      background: rgba(0, 240, 255, 0.05);
      transition: all 0.3s ease;
      box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
    }
    
    .price-box:hover {
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
      transform: translateY(-5px);
    }
    
    .symbol {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 10px;
      color: #00ff88;
    }
    
    .price {
      font-size: 28px;
      font-weight: bold;
      margin: 10px 0;
      color: #00f0ff;
      text-shadow: 0 0 10px #00f0ff;
    }
    
    .change {
      font-size: 14px;
      margin: 5px 0;
    }
    
    .change.positive {
      color: #00ff88;
    }
    
    .change.negative {
      color: #ff0055;
    }
    
    .timestamp {
      font-size: 12px;
      color: #888;
      margin-top: 10px;
    }
    
    .loading {
      text-align: center;
      padding: 40px;
      color: #00ff88;
      font-size: 18px;
    }
    
    .status {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 20px;
      border: 2px solid #00ff88;
      border-radius: 8px;
      background: rgba(0, 255, 136, 0.1);
      color: #00ff88;
      font-size: 12px;
    }
    
    .status.connected::before {
      content: '● ';
      color: #00ff88;
    }
    
    .status.disconnected {
      border-color: #ff0055;
      background: rgba(255, 0, 85, 0.1);
      color: #ff0055;
    }
    
    .status.disconnected::before {
      content: '● ';
      color: #ff0055;
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <h1>🚀 Trading AI Hub - Real-Time Prices</h1>
      <div class="time">
        <div id="currentTime">--:--:--</div>
        <div id="currentDate">--/--/----</div>
      </div>
    </div>
    
    <div id="pricesContainer" class="prices-grid">
      <div class="loading">⏳ جاري تحميل الأسعار...</div>
    </div>
  </div>
  
  <div id="status" class="status disconnected">جاري الاتصال...</div>

  <script>
    // تحديث الساعة
    function updateTime() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('ar-SA');
      const dateStr = now.toLocaleDateString('ar-SA');
      document.getElementById('currentTime').innerText = timeStr;
      document.getElementById('currentDate').innerText = dateStr;
    }
    
    // تحميل الأسعار
    async function loadPrices() {
      try {
        const res = await fetch('/api/prices');
        const json = await res.json();
        
        const container = document.getElementById('pricesContainer');
        container.innerHTML = '';
        
        if (json.data && Object.keys(json.data).length > 0) {
          Object.values(json.data).forEach(price => {
            const changeClass = parseFloat(price.change24h) >= 0 ? 'positive' : 'negative';
            const changeSymbol = parseFloat(price.change24h) >= 0 ? '📈' : '📉';
            
            const box = document.createElement('div');
            box.className = 'price-box';
            box.innerHTML = \`
              <div class="symbol">\${price.symbol}</div>
              <div class="price">$\${price.price.toFixed(2)}</div>
              <div class="change \${changeClass}">
                \${changeSymbol} \${price.change24h}%
              </div>
              <div class="change">
                High: $\${price.high24h.toFixed(2)} | Low: $\${price.low24h.toFixed(2)}
              </div>
              <div class="timestamp">
                Updated: \${new Date(price.timestamp).toLocaleTimeString()}
              </div>
            \`;
            container.appendChild(box);
          });
          
          // تحديث حالة الاتصال
          document.getElementById('status').className = 'status connected';
          document.getElementById('status').innerText = '✓ متصل بـ Binance';
        } else {
          container.innerHTML = '<div class="loading">⏳ جاري تحميل البيانات...</div>';
        }
      } catch (err) {
        console.error('Error loading prices:', err);
        document.getElementById('status').className = 'status disconnected';
        document.getElementById('status').innerText = '✗ خطأ في الاتصال';
      }
    }
    
    // تحديث الساعة كل ثانية
    setInterval(updateTime, 1000);
    updateTime();
    
    // تحميل الأسعار كل ثانية
    setInterval(loadPrices, 1000);
    loadPrices();
  </script>

</body>
</html>
  `);
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('🚀 Binance Real-Time Server running on http://localhost:' + PORT);
  console.log('📊 API Endpoints:');
  console.log('  - GET http://localhost:' + PORT + '/api/prices');
  console.log('  - GET http://localhost:' + PORT + '/api/prices/:symbol');
  console.log('  - GET http://localhost:' + PORT + '/api/history/:symbol');
  console.log('  - GET http://localhost:' + PORT + '/api/health');
});
