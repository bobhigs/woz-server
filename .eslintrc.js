module.exports = {
    env: {
        es6: true,
        node: true
    },
    extends: "eslint:recommended",
    parserOptions: {
        sourceType: "module"
    },
    rules: {
        "indent": [
            "warn",
            4,
            {
                SwitchCase: 1,
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "off",
            "double",
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "off"
        ],
        "quote-props": [
            "warn",
            "consistent-as-needed"
        ],
        // "max-len": [
        //     "warn",
        //     {
        //         code: 120,
        //         tabWidth: 4,
        //         ignoreComments: true,
        //         ignoreStrings: true,
        //         ignoreTemplateLiterals: true,
        //     }
        // ],
        "no-cond-assign": [
            "error",
            "except-parens"
        ],
        "space-infix-ops": ["off"],
        "no-unused-vars": [
            "warn",
            {args: "none", vars: "local"}
        ],
        "no-else-return": ["off"],
        "no-param-reassign": ["off"],
        "default-case": ["off"],

    }
};