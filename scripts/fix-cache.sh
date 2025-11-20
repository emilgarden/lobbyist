#!/bin/bash

# Quick fix script for Next.js webpack cache errors
# Usage: ./scripts/fix-cache.sh

echo "🔧 Fixing Next.js cache issues..."

# Stop dev server if running
echo "Stopping dev server..."
pkill -f "next dev" 2>/dev/null || echo "No dev server running"

# Clear Next.js cache
echo "Clearing .next cache..."
rm -rf .next

# Clear node_modules cache
echo "Clearing node_modules cache..."
rm -rf node_modules/.cache

echo "✅ Cache cleared! Restart dev server with: npm run dev"

