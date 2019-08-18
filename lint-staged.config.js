module.exports = {
  '*.md': ['npx prettier', 'git add'],
  '*.{ts,tsx}': ['npx prettier', 'eslint --max-warnings=0', 'git add'],
}
