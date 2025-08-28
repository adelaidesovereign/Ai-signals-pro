from __future__ import annotations

import pandas as pd
from datetime import datetime, timedelta
from tabulate import tabulate
from . import config, data, features, model, options


def generate_signals(tickers: list[str], mode: str = "swing", save: bool = True) -> pd.DataFrame:
    end = datetime.utcnow()
    start = end - timedelta(days=config.settings.lookback)
    spy_df = data.fetch("SPY", start, end)
    vix_df = data.fetch("^VIX", start, end)
    results = []
    for ticker in tickers:
        try:
            df = data.fetch(ticker, start, end)
        except Exception:
            continue
        X, y, full = features.add_features(df, spy_df['Close'], vix_df['Close'])
        if len(X) < 20:
            continue
        mdl = model.train_model(X, y)
        proba = model.predict_proba(mdl, X.tail(1))
        if proba >= config.settings.confidence_threshold:
            direction = "CALL"
            decision = "Buy CALL (bullish)"
        elif proba <= 1 - config.settings.confidence_threshold:
            direction = "PUT"
            decision = "Buy PUT (bearish)"
        else:
            direction = "NONE"
            decision = "No trade"
        spot = float(full['Close'].iloc[-1])
        opt = options.get_option_suggestion(ticker, spot, direction) if direction != "NONE" else "-"
        results.append({
            "Ticker": ticker,
            "Direction": decision,
            "Confidence": round(proba * 100, 2),
            "SpotPrice": round(spot, 2),
            "Suggested Option": opt,
        })
    df_res = pd.DataFrame(results)
    if save and not df_res.empty:
        df_res.to_csv("signals_today.csv", index=False)
    if not df_res.empty:
        print(tabulate(df_res, headers="keys", tablefmt="github", showindex=False))
    return df_res
