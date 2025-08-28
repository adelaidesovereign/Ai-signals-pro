from __future__ import annotations

from datetime import datetime
import yfinance as yf
from .utils import nearest_friday


def get_option_suggestion(ticker: str, spot: float, direction: str) -> str:
    try:
        t = yf.Ticker(ticker)
        expiries = t.options
        if not expiries:
            return "No chain"
        today = datetime.utcnow()
        target = nearest_friday(today).strftime('%Y-%m-%d')
        expiry = target if target in expiries else expiries[0]
        chain = t.option_chain(expiry)
        df = chain.calls if direction == "CALL" else chain.puts
        if df.empty:
            return "No chain"
        strike = df.iloc[(df['strike'] - spot).abs().argsort()].iloc[0]['strike']
        return f"{expiry} {strike:.0f} {direction}"
    except Exception:
        return "No chain"
