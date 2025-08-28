from ai_signals import signals


def test_generate_signals():
    df = signals.generate_signals(["SPY"], save=False)
    assert not df.empty
    assert "Ticker" in df.columns
