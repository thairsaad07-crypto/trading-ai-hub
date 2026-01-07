from typing import Dict
import logging

logger = logging.getLogger(__name__)

def run_strategy(image_data: Dict, market_data: Dict) -> Dict:
    """
    تشغيل استراتيجية التداول الذكية
    """
    try:
        # استخراج البيانات
        symbol = image_data.get("symbol", "BTCUSDT")
        timeframe = image_data.get("timeframe", "5m")
        close_price = market_data.get("close", 0)
        
        # حساب مستويات التداول (يمكن توسيع هذا لاستخدام نماذج ML)
        entry_price = close_price
        stop_loss = close_price * 0.98  # 2% أقل من السعر الحالي
        take_profit = close_price * 1.05  # 5% أكثر من السعر الحالي
        
        # تحديد الاتجاه بناءً على البيانات
        trend = determine_trend(market_data)
        signal = "BUY" if trend == "bullish" else "SELL" if trend == "bearish" else "HOLD"
        
        analysis = {
            "trend": trend,
            "entry": round(entry_price, 2),
            "stop_loss": round(stop_loss, 2),
            "take_profit": round(take_profit, 2),
            "confidence": 0.85,
            "signal": signal
        }
        
        logger.info(f"استراتيجية تم تشغيلها: {analysis}")
        return analysis
        
    except Exception as e:
        logger.error(f"خطأ في تشغيل الاستراتيجية: {e}")
        raise

def determine_trend(market_data: Dict) -> str:
    """
    تحديد الاتجاه بناءً على البيانات السوقية
    """
    try:
        close = market_data.get("close", 0)
        open_price = market_data.get("open", 0)
        high = market_data.get("high", 0)
        low = market_data.get("low", 0)
        
        # حساب بسيط للاتجاه
        if close > open_price:
            return "bullish"
        elif close < open_price:
            return "bearish"
        else:
            return "neutral"
            
    except Exception as e:
        logger.error(f"خطأ في تحديد الاتجاه: {e}")
        return "neutral"

def calculate_risk_reward(entry: float, stop_loss: float, take_profit: float) -> Dict:
    """
    حساب نسبة المخاطرة والعائد
    """
    try:
        risk = abs(entry - stop_loss)
        reward = abs(take_profit - entry)
        
        if risk == 0:
            ratio = 0
        else:
            ratio = reward / risk
        
        return {
            "risk": round(risk, 2),
            "reward": round(reward, 2),
            "ratio": round(ratio, 2)
        }
        
    except Exception as e:
        logger.error(f"خطأ في حساب المخاطرة والعائد: {e}")
        return {"risk": 0, "reward": 0, "ratio": 0}
