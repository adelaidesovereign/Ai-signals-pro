"""Option chain utilities."""

import datetime as dt
from typing import Optional

import pandas as pd
import yfinance as yf


def get_option_suggestion(ticker: str, direction: str, spot: float) -> str:
    """Return nearest Friday expiry and ATM strike matching direction."""

    if direction not in {"CALL", "PUT"}:
        return "N/A"
    try:
        t = yf.Ticker(ticker)
        expiries = [pd.to_datetime(e).date() for e in t.options]
        today = dt.date.today()
        future_exp = [e for e in expiries if e >= today]
        if not future_exp:
            return "N/A"
        expiry = min(future_exp)
        chain = t.option_chain(expiry.strftime("%Y-%m-%d"))
        df = chain.calls if direction == "CALL" else chain.puts
        df["diff"] = (df["strike"] - spot).abs()
        row = df.iloc[df["diff"].idxmin()]
        return f"{expiry} {row['strike']:.2f} {direction}"
    except Exception:
        return "N/A"

