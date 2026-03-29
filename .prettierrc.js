export default {
  semi: false,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  jsxSingleQuote: false,
  jsxBracketSameLine: false,
  importOrder: ['^@app/(.*)$', '^@pages/(.*)$', '^@ui-kit/(.*)$', '^@utils/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],

  overrides: [
    {
      files: '*.css',
      options: {
        tabWidth: 2,
        useTabs: false,
      },
    },
  ],
}
