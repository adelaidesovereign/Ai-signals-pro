from __future__ import annotations

import pandas as pd


class PaperSimulator:
    def __init__(self, capital: float = 10000.0, risk_pct: float = 0.01, slippage: float = 0.0, fees: float = 0.0):
        self.capital = capital
        self.risk_pct = risk_pct
        self.slippage = slippage
        self.fees = fees

    def run(self, returns: pd.Series) -> pd.DataFrame:
        capital = self.capital
        records = []
        for r in returns:
            risk = capital * self.risk_pct
            pnl = risk * r - self.fees - self.slippage
            capital += pnl
            records.append({"return": r, "pnl": pnl, "capital": capital})
        return pd.DataFrame(records)
