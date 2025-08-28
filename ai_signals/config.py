"""Configuration for ai_signals package."""

from pydantic import BaseModel
from typing import List

DEFAULT_TICKERS = [
    "SPY",
    "AAPL",
    "NVDA",
    "TSLA",
    "AMZN",
    "NFLX",
    "GOOGL",
    "META",
]

CONF_THRESHOLD = 0.52

class BacktestConfig(BaseModel):
    start: str = "2020-01-01"
    end: str = None
    initial_capital: float = 10000.0
    risk_per_trade: float = 0.01
    slippage: float = 0.001
    fee: float = 0.0

