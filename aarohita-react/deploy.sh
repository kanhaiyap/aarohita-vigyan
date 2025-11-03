#!/usr/bin/env bash
set -euo pipefail

# =========================
# CONFIG
# =========================
BUILD_CMD="npm run build"        # Vite/React build command
DIST_IN="dist"                   # Vite output folder

# If you ALSO deploy to GitHub Pages /docs, keep this true
DEPLOY_GHP=false
DIST_OUT="docs"                  # GitHub Pages serves /docs from main
CUSTOM_DOMAIN="haritaahar.com"                 # set to new custom domain (was aarohitavigyan.com)

# =========================
# FUNCTIONS
# =========================
# Note: Hostinger upload removed — this script now only builds and optionally
# deploys to GitHub (docs/) or pushes the built output to the repo. Hostinger
# related variables and functions were intentionally removed.

# =========================
# PREP & BUILD
# =========================
echo "🧹 Syncing local changes to main before build…"
git add -A
if git diff --cached --quiet; then
  echo "ℹ️  No staged changes to commit before build."
else
  git commit -m "Add blog posts and routes"
  git push origin main
fi

echo "▶️  Building project…"
npm ci || npm install
rm -rf "$DIST_IN"
$BUILD_CMD

# =========================
# OPTIONAL: GitHub Pages (/docs)
# =========================
if [ "$DEPLOY_GHP" = true ]; then
  echo "📦 Preparing /docs for GitHub Pages…"
  rm -rf "$DIST_OUT"
  mkdir -p "$DIST_OUT"
  cp -R "${DIST_IN}/." "${DIST_OUT}/"
  # SPA fallback
  cp "${DIST_OUT}/index.html" "${DIST_OUT}/404.html"
  # Avoid Jekyll processing
  touch "${DIST_OUT}/.nojekyll"
  # Custom domain (CNAME) if set
  if [ -n "$CUSTOM_DOMAIN" ]; then
    echo "$CUSTOM_DOMAIN" > "${DIST_OUT}/CNAME"
    echo "🌐 Using custom domain for GitHub Pages: $CUSTOM_DOMAIN"
  fi

  echo "📝 Committing /docs to main…"
  git add "$DIST_OUT"
  if git diff --cached --quiet; then
    echo "ℹ️  No changes to commit in /docs."
  else
    git commit -m "Deploy to GitHub Pages (docs): $(date -u +'%Y-%m-%d %H:%M:%S UTC')"
    git push origin main
  fi
fi

# Hostinger/remote rsync deploy removed per request. If you want to re-add
# remote upload in the future, reintroduce the relevant variables and the
# rsync/ssh steps here.

echo "🎉 All done."
