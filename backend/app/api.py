from fastapi import APIRouter, UploadFile, File, HTTPException
from app.schemas import AnalyzeImageResponse, RejectedResponse, SystemTimeResponse
from app.image_ai import analyze_image
from app.strategy_ai import run_strategy
from app.time_utils import get_utc_now, validate_time_sync
from app.binance_ws import get_live_candle, get_all_live_data
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1")

@router.get("/system/time", response_model=SystemTimeResponse)
async def system_time():
    """الحصول على وقت النظام الحالي"""
    return {
        "server_utc": get_utc_now(),
        "status": "SYNCED"
    }

@router.post(
    "/analyze/image",
    response_model=AnalyzeImageResponse,
    responses={400: {"model": RejectedResponse}, 503: {"model": RejectedResponse}}
)
async def analyze_image_endpoint(image: UploadFile = File(...)):
    """
    تحليل صورة الشارت والحصول على التحليل الفوري
    """
    try:
        server_time = get_utc_now()
        
        # تحليل الصورة
        extracted = await analyze_image(image)
        
        # الحصول على البيانات الحية من Binance
        live_data = get_live_candle(
            extracted["symbol"],
            extracted["timeframe"]
        )
        
        # التحقق من توفر البيانات الحية
        if not live_data:
            raise HTTPException(
                status_code=503,
                detail={
                    "status": "rejected",
                    "reason": "LIVE_DATA_NOT_READY",
                    "server_utc": server_time.isoformat()
                }
            )
        
        # التحقق من توقيت البيانات
        if not validate_time_sync(
            extracted["last_candle_time"],
            live_data["last_candle_open"],
            extracted["timeframe"]
        ):
            raise HTTPException(
                status_code=400,
                detail={
                    "status": "rejected",
                    "reason": "IMAGE_OUTDATED",
                    "server_utc": server_time.isoformat()
                }
            )
        
        # تشغيل الاستراتيجية
        analysis = run_strategy(extracted, live_data)
        
        return AnalyzeImageResponse(
            status="success",
            symbol=extracted["symbol"],
            timeframe=extracted["timeframe"],
            analysis=analysis,
            timestamps={
                "server_utc": server_time,
                "exchange_utc": live_data["exchange_time"],
                "last_candle_open": live_data["last_candle_open"]
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"خطأ في تحليل الصورة: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "reason": "ANALYSIS_FAILED",
                "message": str(e)
            }
        )

@router.get("/market/live-data")
async def get_live_market_data():
    """الحصول على جميع البيانات الحية المتاحة"""
    data = get_all_live_data()
    if not data:
        raise HTTPException(
            status_code=503,
            detail="No live data available yet"
        )
    return {
        "status": "success",
        "data": data,
        "server_time": get_utc_now().isoformat()
    }

@router.get("/health")
async def health_check():
    """فحص صحة الخادم"""
    return {
        "status": "healthy",
        "server_time": get_utc_now().isoformat(),
        "live_data_count": len(get_all_live_data())
    }
