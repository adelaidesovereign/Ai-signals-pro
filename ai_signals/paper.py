"""Paper trading simulator."""

from typing import Dict

import pandas as pd

from .config import BacktestConfig, CONF_THRESHOLD
from .features import build_feature_dataframe
from .model import _train_model


def run_paper_sim(ticker: str, cfg: BacktestConfig = BacktestConfig(), conf_threshold: float = CONF_THRESHOLD) -> Dict[str, float]:
    df = build_feature_dataframe(ticker, start=cfg.start)
    capital = cfg.initial_capital
    equity = [capital]
    for i in range(100, len(df) - 1):
        train_df = df.iloc[:i]
        model = _train_model(train_df.drop(columns=["target"]), train_df["target"])
        test_feat = df.drop(columns=["target"]).iloc[i : i + 1]
        prob = model.predict_proba(test_feat)[0, 1]
        if prob >= conf_threshold:
            direction = 1
        elif prob <= 1 - conf_threshold:
            direction = -1
        else:
            direction = 0
        size = capital * cfg.risk_per_trade
        ret = df["Close"].pct_change().shift(-1).iloc[i] * direction
        pnl = size * ret
        pnl -= cfg.slippage * abs(size)
        pnl -= cfg.fee
        capital += pnl
        equity.append(capital)
    if len(equity) <= 1:
        return {}
    series = pd.Series(equity)
    return {"ending_capital": capital, "trades": len(equity) - 1}

