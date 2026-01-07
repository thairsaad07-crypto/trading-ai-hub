import json
import asyncio
import websockets
from datetime import datetime, timezone
from typing import Dict, Optional
import logging

logger = logging.getLogger(__name__)

# تخزين البيانات الحية من Binance
LIVE_MARKET_DATA: Dict = {}
BINANCE_WS_URL = "wss://stream.binance.com:9443/ws"

def _key(symbol: str, timeframe: str) -> str:
    """إنشاء مفتاح فريد للبيانات"""
    return f"{symbol.lower()}_{timeframe}"

async def binance_listener(symbol: str, timeframe: str):
    """
    الاستماع إلى بيانات Binance WebSocket
    """
    stream = f"{symbol.lower()}@kline_{timeframe}"
    url = f"{BINANCE_WS_URL}/{stream}"
    
    try:
        async with websockets.connect(url) as ws:
            logger.info(f"متصل بـ Binance WebSocket: {symbol} {timeframe}")
            async for msg in ws:
                try:
                    data = json.loads(msg)
                    kline = data.get("k", {})
                    
                    # تحديث البيانات عند إغلاق الشمعة
                    if kline.get("x"):  # الشمعة أغلقت
                        LIVE_MARKET_DATA[_key(symbol, timeframe)] = {
                            "symbol": symbol,
                            "timeframe": timeframe,
                            "last_candle_open": datetime.fromtimestamp(
                                kline.get("t", 0) / 1000, 
                                tz=timezone.utc
                            ).replace(tzinfo=None),
                            "exchange_time": datetime.fromtimestamp(
                                data.get("E", 0) / 1000, 
                                tz=timezone.utc
                            ).replace(tzinfo=None),
                            "close": float(kline.get("c", 0)),
                            "open": float(kline.get("o", 0)),
                            "high": float(kline.get("h", 0)),
                            "low": float(kline.get("l", 0)),
                            "volume": float(kline.get("v", 0))
                        }
                        logger.debug(f"تحديث البيانات: {_key(symbol, timeframe)}")
                except json.JSONDecodeError:
                    logger.error(f"خطأ في فك تشفير JSON: {msg}")
                    continue
    except Exception as e:
        logger.error(f"خطأ في اتصال WebSocket: {e}")
        # إعادة المحاولة بعد 5 ثوانٍ
        await asyncio.sleep(5)
        await binance_listener(symbol, timeframe)

def get_live_candle(symbol: str, timeframe: str) -> Optional[Dict]:
    """الحصول على آخر شمعة حية"""
    return LIVE_MARKET_DATA.get(_key(symbol, timeframe))

def get_all_live_data() -> Dict:
    """الحصول على جميع البيانات الحية"""
    return LIVE_MARKET_DATA.copy()

def clear_live_data():
    """مسح البيانات الحية"""
    global LIVE_MARKET_DATA
    LIVE_MARKET_DATA = {}
