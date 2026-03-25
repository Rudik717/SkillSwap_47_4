export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-order'],
  rules: {
    // 'selector-class-pattern': '^[a-z][a-zA-Z0-9]*$',
    'max-nesting-depth': 3,
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],
    'font-family-no-missing-generic-family-keyword': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
    'order/order': ['custom-properties', 'declarations', 'rules', 'at-rules'],
  },
  ignoreFiles: ['dist/**/*', 'node_modules/**/*', 'coverage/**/*'],
}
