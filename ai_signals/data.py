"""Data fetching utilities with retries and fallbacks."""

from __future__ import annotations

import datetime as dt
import os
import time
from typing import Optional

import pandas as pd
import yfinance as yf
from pandas_datareader import data as pdr
from dotenv import load_dotenv

load_dotenv()


def _fetch_yahoo_download(ticker: str, start: str, end: str, retries: int = 2) -> Optional[pd.DataFrame]:
    for _ in range(retries):
        try:
            df = yf.download(ticker, start=start, end=end, progress=False, threads=False)
            if not df.empty:
                return df
        except Exception:
            time.sleep(1)
    return None


def _fetch_yahoo_history(ticker: str, start: str, end: str) -> Optional[pd.DataFrame]:
    try:
        t = yf.Ticker(ticker)
        df = t.history(start=start, end=end)
        if not df.empty:
            return df
    except Exception:
        return None
    return None


def _fetch_stooq(ticker: str, start: str, end: str) -> Optional[pd.DataFrame]:
    try:
        df = pdr.DataReader(ticker, "stooq", start, end)
        return df.sort_index()
    except Exception:
        return None


def _fetch_alpha_vantage(ticker: str, start: str, end: str) -> Optional[pd.DataFrame]:
    key = os.getenv("ALPHAVANTAGE_API_KEY")
    if not key:
        return None
    try:
        from pandas_datareader.av import AlphaVantage

        av = AlphaVantage(api_key=key, output_size="full")
        df = av.get_data(ticker)
        df = df.loc[start:end]
        return df.sort_index()
    except Exception:
        return None


def get_data(ticker: str, start: str = "2015-01-01", end: Optional[str] = None) -> pd.DataFrame:
    """Get OHLCV data for *ticker* with multiple fallbacks."""

    if end is None:
        end = dt.datetime.today().strftime("%Y-%m-%d")

    for fetcher in (
        _fetch_yahoo_download,
        _fetch_yahoo_history,
        _fetch_stooq,
        _fetch_alpha_vantage,
    ):
        df = fetcher(ticker, start, end) if fetcher != _fetch_alpha_vantage else fetcher(ticker, start, end)
        if df is not None and not df.empty:
            df = df.rename(columns=str.title)
            df = df[["Open", "High", "Low", "Close", "Volume"]]
            return df.dropna()

    raise RuntimeError(f"Unable to fetch data for {ticker}")

