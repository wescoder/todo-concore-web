module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['xo', 'xo-nextjs/space'],
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'capitalized-comments': 'off',
    indent: ['error', 2, {
      SwitchCase: 1
    }],
    'linebreak-style': ['error', 'unix'],
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': ['error', 'after', {
      overrides: {
        '?': 'before',
        ':': 'before',
        '&&': 'before',
        '||': 'before'
      }
    }],
    quotes: ['error', 'single'],
    'react/jsx-no-bind': ['warn', { allowArrowFunctions: true }],
    'react/no-array-index-key': 'off',
    'react/react-in-jsx-scope': 'off',
    semi: ['error', 'never'],
    'space-before-function-paren': ['error', 'always']
  }
}
