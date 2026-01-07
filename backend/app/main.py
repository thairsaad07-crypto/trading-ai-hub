import asyncio
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import router
from app.binance_ws import binance_listener

# إعداد السجلات
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# إنشاء تطبيق FastAPI
app = FastAPI(
    title="Trading AI Hub - Live Analysis Platform",
    description="منصة تحليل التداول الذكية مع تحليل الصور والبيانات الحية",
    version="1.0.0"
)

# إضافة CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# تضمين الموجهات
app.include_router(router)

# متغير عام لتخزين مهام WebSocket
background_tasks = []

@app.on_event("startup")
async def startup_event():
    """تشغيل المهام الخلفية عند بدء الخادم"""
    logger.info("بدء تشغيل الخادم...")
    
    # بدء الاستماع إلى Binance WebSocket
    # يمكن إضافة عملات وأطر زمنية أخرى هنا
    symbols_timeframes = [
        ("BTCUSDT", "5m"),
        ("ETHUSDT", "5m"),
        ("SOLUSDT", "5m"),
        ("XRPUSDT", "5m"),
    ]
    
    for symbol, timeframe in symbols_timeframes:
        task = asyncio.create_task(binance_listener(symbol, timeframe))
        background_tasks.append(task)
        logger.info(f"تم بدء الاستماع إلى {symbol} {timeframe}")

@app.on_event("shutdown")
async def shutdown_event():
    """إيقاف المهام الخلفية عند إيقاف الخادم"""
    logger.info("إيقاف الخادم...")
    
    # إلغاء جميع المهام الخلفية
    for task in background_tasks:
        task.cancel()
        try:
            await task
        except asyncio.CancelledError:
            pass
    
    logger.info("تم إيقاف جميع المهام الخلفية")

@app.get("/")
async def root():
    """الصفحة الرئيسية"""
    return {
        "message": "مرحباً بك في منصة Trading AI Hub",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
