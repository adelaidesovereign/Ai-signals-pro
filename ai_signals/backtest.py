from __future__ import annotations

import pandas as pd
import numpy as np


def performance_metrics(returns: pd.Series) -> dict:
    if returns.empty:
        return {}
    rf = 0.0
    mean = returns.mean() - rf / 252
    std = returns.std()
    sharpe = np.sqrt(252) * mean / std if std != 0 else 0
    neg = returns[returns < 0]
    std_neg = neg.std()
    sortino = np.sqrt(252) * mean / std_neg if std_neg != 0 else 0
    win_rate = (returns > 0).mean()
    cum = (1 + returns).cumprod()
    peak = cum.cummax()
    drawdown = (cum - peak) / peak
    max_dd = drawdown.min()
    n_years = len(returns) / 252
    cagr = cum.iloc[-1] ** (1 / n_years) - 1 if n_years > 0 else 0
    return {
        'sharpe': sharpe,
        'sortino': sortino,
        'win_rate': win_rate,
        'max_drawdown': max_dd,
        'cagr': cagr,
    }
