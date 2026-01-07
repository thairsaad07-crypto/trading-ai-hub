# Trading AI Hub - Backend API

منصة تحليل التداول الذكية مع تحليل الصور والبيانات الحية من Binance

## المميزات الرئيسية

- ✅ **تحليل الصور الفوري**: تحليل صور الشارتات واستخراج المعلومات
- ✅ **بيانات حية من Binance**: اتصال WebSocket مباشر لأسعار السوق الفعلية
- ✅ **استراتيجية التداول الذكية**: نظام ذكي لتحديد نقاط الدخول والخروج
- ✅ **التحقق من توقيت البيانات**: التأكد من أن الصورة والبيانات متزامنة
- ✅ **API RESTful كامل**: توثيق Swagger مدمج

## المتطلبات

- Python 3.11+
- pip

## التثبيت

### 1. إنشاء Virtual Environment

```bash
python3.11 -m venv venv
source venv/bin/activate  # على Linux/Mac
# أو
venv\Scripts\activate  # على Windows
```

### 2. تثبيت المتطلبات

```bash
pip install -r requirements.txt
```

## التشغيل

### تشغيل الخادم

```bash
source venv/bin/activate
uvicorn app.main:app --reload
```

الخادم سيعمل على: `http://localhost:8000`

### الوثائق التفاعلية

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## هيكل المشروع

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # تطبيق FastAPI الرئيسي
│   ├── api.py               # الموجهات والـ Endpoints
│   ├── schemas.py           # نماذج Pydantic
│   ├── binance_ws.py        # اتصال Binance WebSocket
│   ├── image_ai.py          # تحليل الصور
│   ├── strategy_ai.py       # نظام الاستراتيجية
│   └── time_utils.py        # دوال الوقت والتحقق
├── requirements.txt         # المتطلبات
└── README.md               # هذا الملف
```

## API Endpoints

### 1. فحص صحة الخادم

```http
GET /health
```

**الاستجابة:**
```json
{
  "status": "healthy",
  "server_time": "2026-01-07T14:55:41.123456",
  "live_data_count": 4
}
```

### 2. الحصول على وقت النظام

```http
GET /api/v1/system/time
```

**الاستجابة:**
```json
{
  "server_utc": "2026-01-07T14:55:41.123456",
  "status": "SYNCED"
}
```

### 3. تحليل صورة الشارت

```http
POST /api/v1/analyze/image
Content-Type: multipart/form-data

image: <binary_image_data>
```

**الاستجابة (النجاح):**
```json
{
  "status": "success",
  "symbol": "BTCUSDT",
  "timeframe": "5m",
  "analysis": {
    "trend": "bullish",
    "entry": 95234.50,
    "stop_loss": 93329.61,
    "take_profit": 100096.23,
    "confidence": 0.85,
    "signal": "BUY"
  },
  "timestamps": {
    "server_utc": "2026-01-07T14:55:41.123456",
    "exchange_utc": "2026-01-07T14:55:40.000000",
    "last_candle_open": "2026-01-07T14:50:00.000000"
  }
}
```

**الاستجابة (الفشل - صورة قديمة):**
```json
{
  "status": "rejected",
  "reason": "IMAGE_OUTDATED",
  "server_utc": "2026-01-07T14:55:41.123456"
}
```

### 4. الحصول على البيانات الحية

```http
GET /api/v1/market/live-data
```

**الاستجابة:**
```json
{
  "status": "success",
  "data": {
    "btcusdt_5m": {
      "symbol": "BTCUSDT",
      "timeframe": "5m",
      "last_candle_open": "2026-01-07T14:50:00.000000",
      "exchange_time": "2026-01-07T14:55:40.000000",
      "close": 95234.50,
      "open": 94500.00,
      "high": 95500.00,
      "low": 94200.00,
      "volume": 1234.56
    }
  },
  "server_time": "2026-01-07T14:55:41.123456"
}
```

## العملات والأطر الزمنية المدعومة

### العملات (Symbols)
- BTCUSDT - Bitcoin
- ETHUSDT - Ethereum
- SOLUSDT - Solana
- XRPUSDT - Ripple

### الأطر الزمنية (Timeframes)
- 1m - دقيقة واحدة
- 5m - 5 دقائق
- 15m - 15 دقيقة
- 1h - ساعة واحدة
- 4h - 4 ساعات
- 1d - يوم واحد

## معالجة الأخطاء

### رموز الحالة HTTP

- **200 OK**: الطلب نجح
- **400 Bad Request**: الصورة قديمة أو البيانات غير صحيحة
- **503 Service Unavailable**: البيانات الحية غير متاحة بعد
- **500 Internal Server Error**: خطأ في الخادم

## الميزات المستقبلية

- [ ] دعم نماذج ML متقدمة لتحليل الصور
- [ ] نظام إشعارات فوري
- [ ] قاعدة بيانات لحفظ التحليلات
- [ ] نظام المصادقة والتفويض
- [ ] دعم عملات وأطر زمنية إضافية

## المساهمة

نرحب بالمساهمات! يرجى:

1. Fork المستودع
2. إنشاء فرع للميزة الجديدة
3. Commit التغييرات
4. Push إلى الفرع
5. فتح Pull Request

## الترخيص

MIT License

## الدعم

للمساعدة والدعم، يرجى فتح Issue في المستودع.

---

**آخر تحديث:** 2026-01-07
**الإصدار:** 1.0.0
