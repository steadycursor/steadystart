#!/bin/bash

# Getting active origin URL
ORIGIN_URL=$(git config --get remote.origin.url)

if [ -z "$ORIGIN_URL" ]; then
    echo "❌ No remote origin found! Exiting..."
    exit 1
fi

echo "🚀 Removing Git history..."
rm -rf .git

echo "🚀 Reinitializing Git..."
git init

echo "🚀 Adding remote origin: $ORIGIN_URL"
git remote add origin "$ORIGIN_URL"

echo "🚀 Staging all files..."
git add .

echo "🚀 Creating initial commit..."
git commit -m "Starting from fresh with Steady Start template"

echo "🚀 Force pushing to origin/main..."
git branch -M main
git push --force origin main

echo "✅ Done! Git history has been wiped and force-pushed."
