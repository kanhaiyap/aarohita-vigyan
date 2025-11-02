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
CUSTOM_DOMAIN=""                 # e.g. "aarohitavigyan.com" or leave "" to skip CNAME

# Hostinger (aarohitavigyan.com)
HOSTINGER_DEPLOY=${HOSTINGER_DEPLOY:-1}      # 1 = enable by default
HOSTINGER_SSH_USER="${HOSTINGER_SSH_USER:-u222466996}"
HOSTINGER_SSH_HOST="${HOSTINGER_SSH_HOST:-217.21.94.162}"
HOSTINGER_SSH_PORT="${HOSTINGER_SSH_PORT:-65002}"

# ✅ Correct webroot for add-on domain on Hostinger
#    ~/domains/aarohitavigyan.com/public_html
HOSTINGER_REMOTE_PUBROOT="${HOSTINGER_REMOTE_PUBROOT:-~/domains/aarohitavigyan.com/public_html}"

# Keep ACME/SSL challenges
RSYNC_EXCLUDES=( "--exclude" ".well-known/" )

# Optional dry-run for testing (1 = no remote changes)
HOSTINGER_DRY_RUN="${HOSTINGER_DRY_RUN:-0}"

# =========================
# FUNCTIONS
# =========================
remote_path_expand() {
  # turns leading ~/ into $HOME/ for remote expansion
  local in="$1"
  echo "${in/#\~/\$HOME}"
}

ssh_h() {
  ssh -p "$HOSTINGER_SSH_PORT" "$HOSTINGER_SSH_USER@$HOSTINGER_SSH_HOST" "$@"
}

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

# =========================
# HOSTINGER DEPLOY (aarohitavigyan.com)
# =========================
if [ "${HOSTINGER_DEPLOY}" = "1" ]; then
  echo
  echo "🚀 Starting Hostinger deploy to aarohitavigyan.com …"
  echo "Using SSH: ${HOSTINGER_SSH_USER}@${HOSTINGER_SSH_HOST} -p ${HOSTINGER_SSH_PORT}"

  # Expand ~ to $HOME on the REMOTE side safely
  REMOTE_PUBROOT_REMOTE="$(remote_path_expand "$HOSTINGER_REMOTE_PUBROOT")"
  echo "Remote webroot: ${REMOTE_PUBROOT_REMOTE}"

  # Marker file to quickly verify deployment
  echo "$(date -u +'%Y-%m-%dT%H:%M:%SZ') DEPLOY OK" > "${DIST_IN}/__deployed.txt"

  # Dry-run
  if [ "${HOSTINGER_DRY_RUN}" = "1" ]; then
    RSYNC_DRYFLAG="--dry-run"
    echo "⚠️  Dry-run mode enabled (no remote changes will be made)"
  else
    RSYNC_DRYFLAG=""
  fi

  echo "🗄️  Creating remote backup (tar) of current public_html…"
  ssh_h "set -e;
    mkdir -p \$HOME/backups &&
    if [ -d ${REMOTE_PUBROOT_REMOTE} ]; then
      # tar the PARENT dir's public_html to keep structure stable
      PARENT_DIR=\$(dirname ${REMOTE_PUBROOT_REMOTE})
      BASENAME=\$(basename ${REMOTE_PUBROOT_REMOTE})
      tar -czf \"\$HOME/backups/\${BASENAME}_\$(date -u +'%Y%m%dT%H%M%SZ').tar.gz\" -C \"\${PARENT_DIR}\" \"\${BASENAME}\" || true
    fi &&
    mkdir -p ${REMOTE_PUBROOT_REMOTE}
  "

  echo "🔁 rsync -> ${REMOTE_PUBROOT_REMOTE}/"
  rsync -avz ${RSYNC_DRYFLAG} --delete \
    "${RSYNC_EXCLUDES[@]}" \
    -e "ssh -p ${HOSTINGER_SSH_PORT}" \
    "${DIST_IN}/" \
    "${HOSTINGER_SSH_USER}@${HOSTINGER_SSH_HOST}:${REMOTE_PUBROOT_REMOTE}/"

  echo "🔑 Fixing permissions…"
  ssh_h "find ${REMOTE_PUBROOT_REMOTE} -type d -exec chmod 755 {} \; && \
         find ${REMOTE_PUBROOT_REMOTE} -type f -exec chmod 644 {} \;"

  echo "🔍 Verifying marker file…"
  ssh_h "ls -l ${REMOTE_PUBROOT_REMOTE}/__deployed.txt || true"

  echo "✅ Hostinger deploy finished."
  echo "   Domain: https://aarohitavigyan.com"
  echo "   Path:   ${HOSTINGER_REMOTE_PUBROOT}"
fi

echo "🎉 All done."
