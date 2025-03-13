module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["import"],
    ignorePatterns: ["**/dist/**", "**/generated/**", "node_modules"],
    overrides: [
        {
            files: ["**/*.mjs"],
            parserOptions: {
                sourceType: "module",
                ecmaVersion: 2020
            }
        },
        {
            files: ["**/eslint.config.mjs"],
            rules: {
                "import/no-default-export": "off"
            }
        }
    ],
    rules: {
        "no-restricted-syntax": ["warn", {
            selector: "SwitchStatement",
            message: "Switch statements are not allowed. Use match function instead from 'ts-pattern' package.",
        }, {
                selector: "TSTypeAliasDeclaration[id.name='Props']",
                message: "Props type name should follow the component or hook name.",
            }, {
                selector: "TSTypeAliasDeclaration[id.name='Args']",
                message: "Args type name should follow the function name.",
            }, {
                selector: "TSTypeAliasDeclaration[id.name='Options']",
                message: "Options type name should follow the class name.",
            }],
        "no-process-env": "warn",
        "import/no-extraneous-dependencies": "warn",
        "import/no-default-export": "warn",
        "space-before-blocks": "warn",
        "newline-before-return": "warn",
        curly: "warn",
        "import/order": ["warn", {
            groups: [
                ["builtin", "external"],
                ["internal", "parent", "sibling", "index", "object", "type"],
            ],
            "newlines-between": "never",
            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],
    },
};