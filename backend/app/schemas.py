from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Timestamps(BaseModel):
    server_utc: datetime
    exchange_utc: datetime
    last_candle_open: datetime

class AnalysisResult(BaseModel):
    trend: str
    entry: float
    stop_loss: float
    take_profit: float
    confidence: float
    signal: str

class AnalyzeImageResponse(BaseModel):
    status: str
    symbol: str
    timeframe: str
    analysis: AnalysisResult
    timestamps: Timestamps

class RejectedResponse(BaseModel):
    status: str
    reason: str
    server_utc: datetime

class SystemTimeResponse(BaseModel):
    server_utc: datetime
    status: str
