# AI Signals Pro

Simple project that generates basic CALL/PUT signals for a set of tickers using
technical indicators and a logistic regression model.  It can be run locally or
inside Google Colab.

## Installation

```bash
pip install -r requirements.txt
```

## Usage

Generate today's signals for the default tickers:

```bash
python cli.py today
```

Specify your own tickers:

```bash
python cli.py today --tickers SPY AAPL NVDA
```

The script prints a table and saves `signals_today.csv`.

## Backtesting and Paper Trading

The project exposes simple utility modules (`backtest` and `paper`) that you can
extend.  CLI commands are provided as stubs.

## Google Colab Quickstart

Create a new notebook and run the following cell:

```python
!git clone https://github.com/<your-username>/Ai-signals-pro
%cd Ai-signals-pro
!pip install -r requirements.txt
!python cli.py today --mode swing --tickers SPY AAPL NVDA
```

This will print the table of signals and generate `signals_today.csv` in the
notebook's working directory.
