#!/bin/bash
echo "Starting server with PORT: $PORT"
echo "Python path: $(which python)"
echo "Python version: $(python --version)"
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la
python -c "import os; print(f'Environment PORT: {os.getenv(\"PORT\")}')"
python main.py
