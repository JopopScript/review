module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'src/db/migrations'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'semi': [
      'error',
      'never'
    ],
    'no-console': 'error',
    'key-spacing': 'error',
    'object-shorthand': ['error'],
    'eol-last': 'error',
    'quotes': [
      'error',
      'single',
      { "avoidEscape": true }
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': ['warn', { code: 120 }],
    'object-curly-newline': ['error', {
      'ObjectExpression': {
        // 'multiline': true,
        // 'minProperties': 2,
        "consistent": true,
      },
      // 'ObjectPattern': { 'multiline': true },
      'ImportDeclaration': {
        'multiline': true,
      },
      // "ExportDeclaration": { "multiline": true, "minProperties": 2 }
    }],
    'object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: true
    }],
    'no-return-await': 'error',
    'no-promise-executor-return': 'error',
  },
}