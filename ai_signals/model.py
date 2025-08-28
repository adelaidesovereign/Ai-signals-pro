from __future__ import annotations

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import TimeSeriesSplit, cross_val_score


def train_model(X, y):
    model = LogisticRegression(max_iter=1000, class_weight="balanced")
    try:
        tscv = TimeSeriesSplit(n_splits=3)
        cross_val_score(model, X, y, cv=tscv)
        model.fit(X, y)
        return model
    except Exception:
        gbr = GradientBoostingClassifier()
        gbr.fit(X, y)
        return gbr


def predict_proba(model, X_last):
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(X_last)[0, 1]
    else:
        # GradientBoosting has predict_proba
        proba = model.predict_proba(X_last)[0, 1]
    return proba
