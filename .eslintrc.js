module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser 
    extends: "airbnb-base", parserOptions: { ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features 
        sourceType: 'module', // Allows for the use of imports 
    }, settings: {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    rules: {
        "explicit-function-return-type" : ["off"], 
        "react/prop-types": ["off"], 
        "semi": ["error", "always"], 
        "indent": ["error", 4], 
        "no-unused-vars" : ["off"], 
        "no-return-await" : ["off"], 
        "no-param-reassign" : ["off"], 
        "class-methods-use-this": ["error", { "exceptMethods": ["create", "createArray"] }], 
        "line-comment-position": ["error"], "no-console": "off", 
        "spaced-comment": ["error", "always"], 
        "no-inline-comments": ["error"], 
        "no-underscore-dangle": ["error", { "allowAfterThis": true }], 
        "no-underscore-dangle": ["off"], "dot-notation": ["off"], 
        "multiline-comment-style": ["error", "starred-block"], 
        "lines-around-comment": ["error", { "beforeBlockComment": true , "afterBlockComment": true , "beforeLineComment": true }] 
    }, 
}