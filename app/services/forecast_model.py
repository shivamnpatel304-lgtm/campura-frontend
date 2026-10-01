from __future__ import annotations

from typing import List

import numpy as np
from sklearn.linear_model import LinearRegression


class SalesForecastModel:
    """Simple regression-based sales forecast model for Campura demand planning."""

    def __init__(self) -> None:
        self.model = LinearRegression()

    def fit(self, x_values: List[float], y_values: List[float]) -> None:
        x = np.asarray(x_values, dtype=float).reshape(-1, 1)
        y = np.asarray(y_values, dtype=float)
        self.model.fit(x, y)

    def predict(self, input_value: float) -> float:
        return float(self.model.predict(np.asarray([[input_value]], dtype=float))[0])

    def forecast(self, history: List[float], future_months: int = 3) -> List[float]:
        if not history:
            return [0.0 for _ in range(future_months)]

        x_values = list(range(len(history)))
        self.fit(x_values, history)
        predictions = []
        for offset in range(1, future_months + 1):
            next_index = len(history) + offset
            predictions.append(self.predict(next_index))
        return predictions
