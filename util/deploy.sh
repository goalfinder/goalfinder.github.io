#!/usr/bin/env sh
set -euo pipefail

# Checkout deploy branch
git checkout deploy

# Minify code
script_dir="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
target_dir="$(dirname "$script_dir")"

if [ ! -d "$target_dir" ]; then
  printf 'Target directory not found: %s\n' "$target_dir" >&2
  exit 1
fi

printf 'Minifying files in: %s\n' "$target_dir"

# Collect files (exclude node_modules)
# shellcheck disable=SC2039 # for -print0 portability (GNU/BusyBox find)
find "$target_dir" -type f \
  \( -name '*.js' -o -name '*.css' -o -name '*.html' \) \
  ! -path '*/node_modules/*' -print0 |
while IFS= read -r -d '' file; do
  case "${file##*.}" in
    js)
      printf 'Minifying JS: %s\n' "$file"
      npx terser "$file" -o "$file" -c -m >/dev/null 2>&1
      ;;
    css)
      printf 'Minifying CSS: %s\n' "$file"
      npx cleancss -o "$file" "$file" >/dev/null 2>&1
      ;;
    html)
      printf 'Minifying HTML: %s\n' "$file"
      npx html-minifier-terser "$file" \
        --collapse-whitespace --remove-comments \
        --minify-js true --minify-css true \
        -o "$file" >/dev/null 2>&1
      ;;
  esac
done

# Commit and push changes
git add -A
timestamp="$(date +"%d.%m.%Y %H:%M:%S")"
git commit -m "Deploy at: $timestamp"
git push origin deploy --force