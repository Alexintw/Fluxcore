# Exit on error
set -e

# Configuration
REPO_DIR="$(dirname "$0")"
GIT_REMOTE="origin"
GIT_BRANCH="main"

echo "\n🔄 Updating FluxCore project..."

# Navigate to repository directory
cd "$REPO_DIR"

echo "→ Fetching latest changes from $GIT_REMOTE/$GIT_BRANCH"
git fetch $GIT_REMOTE

echo "→ Checking out $GIT_BRANCH"
git checkout $GIT_BRANCH

echo "→ Pulling updates"
git pull $GIT_REMOTE $GIT_BRANCH

# Install or update npm packages
if [ -f package.json ]; then
  echo "→ Installing npm dependencies"
  npm install
fi

# Rebuild Docker images and restart containers (if Docker Compose file exists)
if [ -f docker-compose.yml ]; then
  echo "→ Rebuilding and restarting Docker containers"
  docker compose up --build -d
fi

# Success message
echo "\n✅ FluxCore has been updated and services restarted."
