module.exports = {
  // https://github.com/feross/standard/blob/master/RULES.md
  extends: [
    'standard',
    'standard-react'
  ],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    "space-before-function-paren": [2, { "anonymous": "always", "named": "never" }]
  }
}
