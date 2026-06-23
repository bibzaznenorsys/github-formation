#!/usr/bin/env bash
set -euo pipefail

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "Run from a git repository."
  exit 1
fi

ROOT="$(git rev-parse --show-toplevel)"
LAB="$ROOT/labs/module-2"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [[ "$SCRIPT_DIR" != "$LAB/scripts" ]]; then
  echo "Expected script at labs/module-2/scripts/bootstrap-branches.sh"
  exit 1
fi

cd "$ROOT"

copy_stub() {
  local stub="$1"
  local dest="$2"
  cp "$LAB/stubs/$stub" "$dest"
}

create_branch() {
  local branch="$1"
  echo "Creating $branch ..."
  git checkout main
  git branch -D "$branch" 2>/dev/null || true
  git checkout -b "$branch"

  case "$branch" in
    feature/module-2/00-intro)
      cp "$LAB/stubs/00-intro/app.js" "$LAB/src/app.js"
      cp "$LAB/stubs/01-schemas/validators.js" "$LAB/src/validators.js"
      ;;
    feature/module-2/01-schemas)
      cp "$LAB/stubs/01-schemas/validators.js" "$LAB/src/validators.js"
      cp "$LAB/stubs/00-intro/app.js" "$LAB/src/app.js"
      ;;
    feature/module-2/02-student-route)
      cp "$LAB/stubs/02-student-route/students.js" "$LAB/src/routes/students.js"
      cp "$LAB/stubs/00-intro/app.js" "$LAB/src/app.js"
      cat > "$LAB/src/app.js" <<'EOF'
import express from 'express'
import studentsRouter from './routes/students.js'

export function createApp() {
  const app = express()
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', module: 2 })
  })

  app.use('/students', studentsRouter)
  return app
}
EOF
      git checkout main -- "$LAB/src/validators.js"
      ;;
    feature/module-2/03-class-route)
      git checkout main -- "$LAB/src/validators.js" "$LAB/src/routes/students.js"
      cp "$LAB/stubs/03-class-route/classes.js" "$LAB/src/routes/classes.js"
      cat > "$LAB/src/app.js" <<'EOF'
import express from 'express'
import studentsRouter from './routes/students.js'
import classesRouter from './routes/classes.js'

export function createApp() {
  const app = express()
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', module: 2 })
  })

  app.use('/students', studentsRouter)
  app.use('/classes', classesRouter)
  return app
}
EOF
      ;;
    feature/module-2/04-duplicate-errors)
      cp "$LAB/stubs/04-duplicate-errors/students.js" "$LAB/src/routes/students.js"
      cp "$LAB/stubs/04-duplicate-errors/classes.js" "$LAB/src/routes/classes.js"
      git checkout main -- "$LAB/src/validators.js" "$LAB/src/middleware/errors.js"
      cat > "$LAB/src/app.js" <<'EOF'
import express from 'express'
import classesRouter from './routes/classes.js'
import studentsRouter from './routes/students.js'

export function createApp() {
  const app = express()
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', module: 2 })
  })

  app.use('/students', studentsRouter)
  app.use('/classes', classesRouter)
  return app
}
EOF
      ;;
    feature/module-2/05-tests-and-docs)
      git checkout main -- "$LAB/src" "$LAB/LAB-NOTES.md"
      cat > "$LAB/LAB-NOTES.md" <<'EOF'
# Module 2 Lab Notes

Add your Copilot reflections here before pushing.
EOF
      ;;
  esac

  git add "$LAB"
  git commit -m "chore(lab): bootstrap $branch starter state" || true
}

for branch in \
  feature/module-2/00-intro \
  feature/module-2/01-schemas \
  feature/module-2/02-student-route \
  feature/module-2/03-class-route \
  feature/module-2/04-duplicate-errors \
  feature/module-2/05-tests-and-docs
do
  create_branch "$branch"
done

git checkout main
echo "Done. Solution remains on main; learner branches created."
