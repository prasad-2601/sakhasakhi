"""
Run this once to download all required NLTK data.
Usage: python setup_nltk.py
"""
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import nltk

packages = [
    'punkt',
    'punkt_tab',
    'stopwords',
    'wordnet',
    'averaged_perceptron_tagger',
    'vader_lexicon',
    'omw-1.4',
]

print("Downloading NLTK data packages...")
for pkg in packages:
    try:
        nltk.download(pkg, quiet=False)
        print(f"  OK: {pkg}")
    except Exception as e:
        print(f"  SKIP: {pkg} -- {e}")

print("\nNLTK setup complete! You can now run: python app.py")
