"""Simple backtesting utilities."""

from typing import Dict

import numpy as np
import pandas as pd

from .features import build_feature_dataframe
from .model import _train_model
from .config import CONF_THRESHOLD


def run_backtest(ticker: str, conf_threshold: float = CONF_THRESHOLD) -> Dict[str, float]:
    df = build_feature_dataframe(ticker)
    returns = []
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
        ret = df["Close"].pct_change().shift(-1).iloc[i] * direction
        returns.append(ret)
    if not returns:
        return {}
    r = pd.Series(returns)
    equity = (1 + r).cumprod()
    sharpe = r.mean() / r.std() * np.sqrt(252) if r.std() != 0 else 0.0
    downside = r[r < 0]
    sortino = r.mean() / downside.std() * np.sqrt(252) if downside.std() != 0 else 0.0
    win_rate = (r > 0).mean()
    drawdown = (equity / equity.cummax() - 1).min()
    cagr = equity.iloc[-1] ** (252 / len(r)) - 1
    return {
        "sharpe": sharpe,
        "sortino": sortino,
        "win_rate": win_rate,
        "max_drawdown": drawdown,
        "cagr": cagr,
    }

