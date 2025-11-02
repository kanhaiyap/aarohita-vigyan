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
 
# --- Optional: deploy directly to a remote Hostinger server via SSH/rsync ---
# Usage: ./deploy.sh hostinger   (or set HOSTINGER_DEPLOY=1 and run the script)
if [ "${1:-}" = "hostinger" ] || [ "${HOSTINGER_DEPLOY:-}" = "1" ]; then
  echo "\n🚀 Starting Hostinger deploy..."

  # Configure these via environment variables or edit the defaults below
  HOSTINGER_SSH_USER="${HOSTINGER_SSH_USER:-u222466996}"
  HOSTINGER_SSH_HOST="${HOSTINGER_SSH_HOST:-217.21.94.162}"
  HOSTINGER_SSH_PORT="${HOSTINGER_SSH_PORT:-65002}"
  # Remote webroot (default to public_html in home)
  HOSTINGER_REMOTE_PUBROOT="${HOSTINGER_REMOTE_PUBROOT:-~/public_html}"
  # Local folder to deploy (after build)
  LOCAL_DIST="${DIST_IN}"

  echo "Using SSH: ${HOSTINGER_SSH_USER}@${HOSTINGER_SSH_HOST} -p ${HOSTINGER_SSH_PORT}"
  echo "Remote webroot: ${HOSTINGER_REMOTE_PUBROOT}"

  # Dry-run option
  if [ "${HOSTINGER_DRY_RUN:-0}" = "1" ]; then
    RSYNC_DRYFLAG="--dry-run"
    echo "⚠️  Dry-run mode enabled (no remote changes will be made)"
  else
    RSYNC_DRYFLAG=""
  fi

  # Create a timestamped backup of remote public_html (on remote server)
  REMOTE_BACKUP_DIR="${HOSTINGER_REMOTE_PUBROOT}_backup_$(date -u +'%Y%m%dT%H%M%SZ')"
  echo "Creating remote backup at: $REMOTE_BACKUP_DIR"
  ssh -p "$HOSTINGER_SSH_PORT" "$HOSTINGER_SSH_USER"@"$HOSTINGER_SSH_HOST" "mkdir -p \"$REMOTE_BACKUP_DIR\" && if [ -d \"$HOSTINGER_REMOTE_PUBROOT\" ]; then mv \"$HOSTINGER_REMOTE_PUBROOT\" \"${REMOTE_BACKUP_DIR}\"; fi && mkdir -p \"$HOSTINGER_REMOTE_PUBROOT\""

  echo "Syncing local '$LOCAL_DIST/' -> remote '${HOSTINGER_SSH_USER}@${HOSTINGER_SSH_HOST}:${HOSTINGER_REMOTE_PUBROOT}/'"
  # Use rsync over SSH. --delete ensures old files are removed.
  rsync -avz $RSYNC_DRYFLAG --delete -e "ssh -p ${HOSTINGER_SSH_PORT}" "${LOCAL_DIST}/" "${HOSTINGER_SSH_USER}@${HOSTINGER_SSH_HOST}:${HOSTINGER_REMOTE_PUBROOT}/"

  echo "Setting permissions on remote files..."
  ssh -p "$HOSTINGER_SSH_PORT" "$HOSTINGER_SSH_USER"@"$HOSTINGER_SSH_HOST" "find \"$HOSTINGER_REMOTE_PUBROOT\" -type d -exec chmod 755 {} \; && find \"$HOSTINGER_REMOTE_PUBROOT\" -type f -exec chmod 644 {} \;"

  echo "✅ Hostinger deploy finished."
  echo "Remote backup preserved at: $REMOTE_BACKUP_DIR"
  echo "If you ran a dry-run, re-run with HOSTINGER_DRY_RUN=0 or omit the env var to perform the real deploy."
fi
