"""Signal generation module."""

from typing import Iterable, List

import pandas as pd
from tabulate import tabulate

from .config import CONF_THRESHOLD
from .features import build_feature_dataframe
from .model import predict_probability
from .options import get_option_suggestion


def generate_signals(tickers: Iterable[str], conf_threshold: float = CONF_THRESHOLD) -> pd.DataFrame:
    rows: List[dict] = []
    for ticker in tickers:
        try:
            df = build_feature_dataframe(ticker)
            prob = predict_probability(df)
            spot = df["Close"].iloc[-1]
            if prob >= conf_threshold:
                direction = "Buy CALL (bullish)"
                opt_dir = "CALL"
                conf = prob
            elif prob <= 1 - conf_threshold:
                direction = "Buy PUT (bearish)"
                opt_dir = "PUT"
                conf = 1 - prob
            else:
                direction = "No trade"
                opt_dir = ""
                conf = abs(prob - 0.5) * 2
            option = get_option_suggestion(ticker, opt_dir, spot)
            rows.append(
                {
                    "Ticker": ticker,
                    "Direction": direction,
                    "Confidence": round(conf * 100, 2),
                    "SpotPrice": round(float(spot), 2),
                    "Suggested Option": option,
                }
            )
        except Exception as e:
            rows.append(
                {
                    "Ticker": ticker,
                    "Direction": "Error",
                    "Confidence": 0.0,
                    "SpotPrice": 0.0,
                    "Suggested Option": "N/A",
                }
            )
    out_df = pd.DataFrame(rows)
    out_df.to_csv("signals_today.csv", index=False)
    print(tabulate(out_df, headers="keys", tablefmt="github", showindex=False))
    return out_df

