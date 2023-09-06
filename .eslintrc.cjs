module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.*', '*.html'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-console': ['warn'],
    'capitalized-comments': ['warn'],
    camelcase: ['warn'],
    'default-param-last': ['warn'],
    'default-case-last': ['warn'],
    'id-length': [
      'warn',
      {
        min: 3,
        exceptions: [
          'i',
          'j',
          'k',
          'x',
          'y',
          'z',
          'e',
          '_',
          'dx',
          'dy',
          'dz',
          'p1',
          'p2',
          'p3',
          't',
          'u',
          'v',
          'id',
        ],
      },
    ],
    'max-lines': ['warn', { max: 500 }],
    'multiline-comment-style': ['warn', 'starred-block'],
    'sort-imports': ['warn'],
    'sort-vars': ['warn'],
    'spaced-comment': ['warn'],
    yoda: ['warn', 'never'],
    '@typescript-eslint/ban-ts-comment': ['warn'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'block-scoped-var': ['error'],
    'no-await-in-loop': ['error'],
    'no-duplicate-imports': ['error', { includeExports: false }],
    'no-self-compare': ['error'],
    'no-unmodified-loop-condition': ['error'],
    'no-unreachable-loop': ['error'],
    curly: ['error'],
    eqeqeq: ['error'],
    'id-denylist': ['error', 'list', 'array', 'variable', 'function'],
    'init-declarations': ['error', 'always'],
    'no-continue': ['error'],
    'no-else-return': ['error'],
    'no-empty-function': ['error'],
    'no-extend-native': ['error'],
    'no-lone-blocks': ['error'],
    'no-multi-assign': ['error'],
    'no-multi-str': ['error'],
    'no-nested-ternary': ['error'],
    'no-redeclare': ['error'],
    'no-script-url': ['error'],
    'no-sequences': ['error'],
    'no-shadow': ['error'],
    'no-throw-literal': ['error'],
    'no-underscore-dangle': ['error'],
    'no-unneeded-ternary': ['error'],
    'no-useless-concat': ['error'],
    'no-useless-rename': ['error'],
    'no-var': ['error'],
    'operator-assignment': ['error', 'always'],
    'prefer-arrow-callback': ['error'],
    'prefer-const': ['error'],
    'prefer-named-capture-group': ['error'],
    'prefer-object-spread': ['error'],
    'quote-props': ['error', 'as-needed'],
    'require-await': ['error'],
    'array-bracket-spacing': ['error', 'never'],
    'arrow-parens': ['error'],
    'arrow-spacing': ['error'],
    'block-spacing': ['error'],
    'brace-style': ['error'],
    'comma-dangle': ['error', 'only-multiline'],
    'comma-spacing': ['error'],
    'computed-property-spacing': ['error'],
    'eol-last': ['error'],
    'func-call-spacing': ['error'],
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['off', { minItems: 3 }],
    'jsx-quotes': ['error', 'prefer-single'],
    'key-spacing': ['error'],
    'keyword-spacing': ['error'],
    'line-comment-position': ['error', 'beside'],
    'linebreak-style': ['off'],
    'max-len': ['warn', { code: 80 }],
    'max-statements-per-line': ['error'],
    'no-multi-spaces': ['error'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-trailing-spaces': ['error'],
    'no-whitespace-before-property': ['error'],
    'nonblock-statement-body-position': ['error'],
    semi: ['error'],
    'semi-spacing': ['error'],
    'space-before-blocks': ['error'],
    'switch-colon-spacing': ['error'],
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/await-thenable': ['error'],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Boolean: {
            message: 'Avoid using Boolean. Use boolean instead.',
            fixWith: 'boolean',
          },
          String: {
            message: 'Avoid using String. Use string instead.',
            fixWith: 'string',
          },
          BigInt: {
            message: 'Avoid using BigInt. Use bigint instead.',
            fixWith: 'bigint',
          },
          Number: {
            message: 'Avoid using Number. Use number instead.',
            fixWith: 'number',
          },
          Symbol: {
            message: 'Avoid using Symbol. Use symbol instead.',
            fixWith: 'symbol',
          },
        },
      },
    ],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'as' },
    ],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['error'],
    'react/boolean-prop-naming': ['error'],
    'react/react-in-jsx-scope': ['off'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/hook-use-state': ['error'],
    '@typescript-eslint/no-misused-promises': ['off'],
    '@typescript-eslint/no-floating-promises': ['off'],
  },
};
