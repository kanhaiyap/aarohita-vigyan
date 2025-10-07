#!/usr/bin/env bash
set -euo pipefail

# --- CONFIG ---
BUILD_CMD="npm run build"        # your Vite build command
DIST_IN="dist"                   # Vite output folder
DIST_OUT="docs"                  # GitHub Pages serves this from main
CUSTOM_DOMAIN="haritaahar.com"   # "" to skip CNAME
# --------------

# --- Pre-deploy: commit any working tree changes to main ---
echo "🧹 Syncing local changes to main before build…"
git add -A
if git diff --cached --quiet; then
  echo "ℹ️  No staged changes to commit before build."
else
  # Use your requested message
  git commit -m "Add blog posts and routes"
  # Push to main
  git push origin main
fi

echo "▶️  Building project…"
npm ci || npm install
rm -rf "$DIST_IN"
$BUILD_CMD

echo "📦 Preparing /docs for GitHub Pages…"
rm -rf "$DIST_OUT"
mkdir -p "$DIST_OUT"

# Copy build output into /docs
cp -R "${DIST_IN}/." "${DIST_OUT}/"

# SPA fallback (works for BrowserRouter and helps even with HashRouter)
cp "${DIST_OUT}/index.html" "${DIST_OUT}/404.html"

# Avoid Jekyll processing
touch "${DIST_OUT}/.nojekyll"

# Custom domain (CNAME)
if [ -n "$CUSTOM_DOMAIN" ]; then
  echo "$CUSTOM_DOMAIN" > "${DIST_OUT}/CNAME"
  echo "🌐 Using custom domain: $CUSTOM_DOMAIN"
fi

echo "📝 Committing /docs to main…"
git add "$DIST_OUT"
if git diff --cached --quiet; then
  echo "ℹ️  No changes to commit."
else
  git commit -m "Deploy to GitHub Pages (docs): $(date -u +'%Y-%m-%d %H:%M:%S UTC')"
  git push origin main
fi

echo "✅ Done!"
echo ""
echo "Now set GitHub Pages (repo → Settings → Pages):"
echo "• Source: Deploy from a branch"
echo "• Branch: main   Folder: /docs"
echo ""
echo "DNS note: Add a CNAME record for ${CUSTOM_DOMAIN:-your-domain} → <your-username>.github.io (if using a custom domain)."
