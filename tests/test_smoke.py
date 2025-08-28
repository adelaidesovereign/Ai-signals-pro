import subprocess
import sys


def test_cli_help():
    result = subprocess.run([sys.executable, "cli.py", "--help"], capture_output=True, check=True)
    assert b"today" in result.stdout
