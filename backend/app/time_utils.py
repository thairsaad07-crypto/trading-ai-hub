from datetime import datetime, timedelta, timezone
from typing import Optional

TIMEFRAME_MAP = {
    "1m": timedelta(minutes=1),
    "5m": timedelta(minutes=5),
    "15m": timedelta(minutes=15),
    "1h": timedelta(hours=1),
    "4h": timedelta(hours=4),
    "1d": timedelta(days=1)
}

def get_utc_now() -> datetime:
    """الحصول على الوقت الحالي بصيغة UTC"""
    return datetime.now(timezone.utc).replace(tzinfo=None)

def validate_time_sync(
    image_time: datetime, 
    live_time: datetime, 
    timeframe: str
) -> bool:
    """
    التحقق من أن وقت الصورة متزامن مع وقت البيانات الحية
    """
    max_diff = TIMEFRAME_MAP.get(timeframe, timedelta(minutes=5))
    time_diff = abs((image_time - live_time).total_seconds())
    max_diff_seconds = max_diff.total_seconds()
    
    return time_diff <= max_diff_seconds

def get_timeframe_duration(timeframe: str) -> timedelta:
    """الحصول على مدة الإطار الزمني"""
    return TIMEFRAME_MAP.get(timeframe, timedelta(minutes=5))

def format_datetime(dt: datetime) -> str:
    """تنسيق التاريخ والوقت"""
    return dt.isoformat()
