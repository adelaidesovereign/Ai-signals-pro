"""Feature engineering."""

import pandas as pd

from .data import get_data
from .utils import (
    atr,
    bollinger_bandwidth,
    ema,
    rsi,
    spy_vix_regime,
    volume_trend,
)


def build_feature_dataframe(ticker: str, start: str = "2018-01-01") -> pd.DataFrame:
    """Return a dataframe with engineered features and target."""

    df = get_data(ticker, start=start)
    spy = get_data("SPY", start=start)
    vix = get_data("^VIX", start=start)

    df = df.join(
        pd.DataFrame(
            {
                "ema9": ema(df["Close"], 9),
                "ema21": ema(df["Close"], 21),
                "rsi14": rsi(df["Close"], 14),
                "atr14": atr(df, 14),
                "boll_bw": bollinger_bandwidth(df["Close"], 20, 2),
                "vol_trend": volume_trend(df["Volume"], 20),
            }
        )
    )

    regime = spy_vix_regime(spy["Close"], vix["Close"]).reindex(df.index)
    df["regime"] = regime.ffill()

    df["target"] = (df["Close"].shift(-1) > df["Close"]).astype(int)
    return df.dropna()

