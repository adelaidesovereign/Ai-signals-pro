from __future__ import annotations

import argparse
from ai_signals import signals


def main():
    parser = argparse.ArgumentParser(description="AI Signals CLI")
    sub = parser.add_subparsers(dest="command")

    today = sub.add_parser("today", help="Generate today's signals")
    today.add_argument("--tickers", nargs="*", default=None)
    today.add_argument("--mode", default="swing")

    backtest = sub.add_parser("backtest", help="Run backtest")
    backtest.add_argument("--file", required=False)

    paper = sub.add_parser("paper", help="Run paper trading simulation")
    paper.add_argument("--file", required=False)

    args = parser.parse_args()
    if args.command == "today":
        tickers = args.tickers or []
        if not tickers:
            from ai_signals.config import settings
            tickers = settings.tickers
        signals.generate_signals(tickers, mode=args.mode)
    elif args.command == "backtest":
        print("Backtest stub. Provide implementation.")
    elif args.command == "paper":
        print("Paper trading stub. Provide implementation.")
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
