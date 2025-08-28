# AI Signals Pro

AI Signals Pro generates CALL/PUT trading signals for US equities using
historical price data and simple machine learning models. The project runs
locally or on Google Colab.

## Quickstart (Colab)
```python
# Colab setup cell
!git clone https://github.com/openai/ai-signals-pro.git
%cd ai-signals-pro
!pip install -r requirements.txt
```
After installation, run:
```python
!python cli.py today --mode swing --tickers SPY AAPL NVDA
```

## Local Usage
```bash
pip install -r requirements.txt
python cli.py today --mode swing --tickers SPY AAPL NVDA
```

Commands available:
- `today` – generate today's signals
- `backtest` – run a simple backtest for a ticker
- `paper` – run a basic paper trading simulator

Signals are saved to `signals_today.csv` and printed as a table.

