from __future__ import annotations

import pandas as pd
import yfinance as yf
from pandas_datareader import data as pdr
from datetime import datetime
import time
from typing import Optional
from .config import settings


def fetch_yfinance(ticker: str, start: datetime, end: datetime, retries: int = 3) -> pd.DataFrame:
    last_exc = None
    for _ in range(retries):
        try:
            df = yf.download(ticker, start=start, end=end, progress=False, threads=False, auto_adjust=False)
            if not df.empty:
                return df
        except Exception as e:
            last_exc = e
        time.sleep(1)
    if last_exc:
        raise last_exc
    return pd.DataFrame()


def fetch(ticker: str, start: datetime, end: datetime) -> pd.DataFrame:
    try:
        df = fetch_yfinance(ticker, start, end)
        if not df.empty:
            return df
    except Exception:
        pass
    try:
        df = yf.Ticker(ticker).history(start=start, end=end)
        if not df.empty:
            return df
    except Exception:
        pass
    try:
        df = pdr.DataReader(ticker, "stooq", start, end).sort_index()
        if not df.empty:
            return df
    except Exception:
        pass
    if settings.alpha_vantage_key:
        try:
            df = pdr.DataReader(ticker, "av-daily", start=start, end=end, api_key=settings.alpha_vantage_key)
            if not df.empty:
                return df
        except Exception:
            pass
    raise RuntimeError(f"Unable to fetch data for {ticker}")
