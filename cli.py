"""Command line interface for ai-signals-pro."""

import argparse
from typing import List

from ai_signals.backtest import run_backtest
from ai_signals.config import DEFAULT_TICKERS
from ai_signals.paper import run_paper_sim
from ai_signals.signals import generate_signals



def main(argv: List[str] | None = None) -> None:
    parser = argparse.ArgumentParser(description="AI Signals Pro CLI")
    sub = parser.add_subparsers(dest="command")

    p_today = sub.add_parser("today", help="Generate today's signals")
    p_today.add_argument("--tickers", nargs="+", default=DEFAULT_TICKERS)
    p_today.add_argument("--mode", default="swing")

    p_back = sub.add_parser("backtest", help="Run backtest")
    p_back.add_argument("--ticker", required=True)

    p_paper = sub.add_parser("paper", help="Run paper trading sim")
    p_paper.add_argument("--ticker", required=True)

    args = parser.parse_args(argv)

    if args.command == "today":
        generate_signals(args.tickers)
    elif args.command == "backtest":
        metrics = run_backtest(args.ticker)
        print(metrics)
    elif args.command == "paper":
        metrics = run_paper_sim(args.ticker)
        print(metrics)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()

