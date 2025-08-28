"""Model training utilities."""

import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import TimeSeriesSplit
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


def _train_model(X: pd.DataFrame, y: pd.Series):
    tscv = TimeSeriesSplit(n_splits=5)
    pipeline = Pipeline(
        [
            ("scaler", StandardScaler()),
            (
                "clf",
                LogisticRegression(max_iter=1000, class_weight="balanced"),
            ),
        ]
    )

    try:
        for train_idx, test_idx in tscv.split(X):
            pipeline.fit(X.iloc[train_idx], y.iloc[train_idx])
            pipeline.predict_proba(X.iloc[test_idx])
    except Exception:
        pipeline = GradientBoostingClassifier()
        for train_idx, test_idx in tscv.split(X):
            pipeline.fit(X.iloc[train_idx], y.iloc[train_idx])
            pipeline.predict_proba(X.iloc[test_idx])

    pipeline.fit(X, y)
    return pipeline


def predict_probability(df: pd.DataFrame) -> float:
    """Train a model on df and return probability of upward move for last row."""

    X = df.drop(columns=["target"])
    y = df["target"]
    model = _train_model(X, y)
    last_features = X.iloc[[-1]]
    proba = model.predict_proba(last_features)[0, 1]
    return float(proba)

