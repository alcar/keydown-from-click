module.exports = {
  '*.{json,md}': ['npx prettier'],
  '*.{ts,tsx}': ['npx prettier', 'eslint --max-warnings=0'],
}
