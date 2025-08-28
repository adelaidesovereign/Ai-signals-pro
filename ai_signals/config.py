from pydantic import BaseModel
from typing import List

class Settings(BaseModel):
    tickers: List[str] = [
        "SPY",
        "AAPL",
        "NVDA",
        "TSLA",
        "AMZN",
        "NFLX",
        "GOOGL",
        "META",
    ]
    confidence_threshold: float = 0.52
    lookback: int = 150
    risk_free_rate: float = 0.01
    alpha_vantage_key: str | None = None

settings = Settings()
