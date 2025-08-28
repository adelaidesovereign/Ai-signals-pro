from __future__ import annotations

import pandas as pd
from . import utils


def add_features(df: pd.DataFrame, spy: pd.Series, vix: pd.Series) -> pd.DataFrame:
    data = df.copy()
    data['ema9'] = utils.ema(data['Close'], 9)
    data['ema21'] = utils.ema(data['Close'], 21)
    data['rsi14'] = utils.rsi(data['Close'], 14)
    data['atr14'] = utils.atr(data[['High', 'Low', 'Close']], 14)
    data['bb_bw'] = utils.bollinger_bandwidth(data['Close'], 20, 2)
    data['vol_trend'] = utils.volume_trend(data['Volume'], 20)
    spy_vix = (spy / vix).reindex(data.index).ffill()
    data['spy_vix_regime'] = spy_vix
    data['return'] = data['Close'].pct_change().shift(-1)
    data['target'] = (data['return'] > 0).astype(int)
    data = data.dropna()
    features = data[['ema9', 'ema21', 'rsi14', 'atr14', 'bb_bw', 'vol_trend', 'spy_vix_regime']]
    target = data['target']
    return features, target, data
