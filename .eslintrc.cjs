// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    plugins: [
        '@typescript-eslint',
        'import',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts"]
        },
        "import/resolver": {
            "typescript": {
                "alwaysTryTypes": true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
                // "project": "./tsconfig.json",
            },
            node: true
        }
    },
    extends: [
        'airbnb-base',

        // ESLint's inbuilt "recommended" config - it turns on a small, sensible set of rules which lint for well-known best-practices.
        'eslint:recommended',

        // Meant to be used after extending 'eslint:recommended'.
        // It disables core ESLint rules that are already checked by the TypeScript compiler.
        // Additionally, it enables rules that promote using the more modern constructs TypeScript allows for.
        'plugin:@typescript-eslint/eslint-recommended',

        // It's similar to 'eslint:recommended', except it turns on TypeScript-specific rules.
        'plugin:@typescript-eslint/recommended',

        // Enable 'eslint-plugin-import' package, combination of 'plugin:import/errors' and 'plugin:import/warnings'.
        'plugin:import/recommended',

        // Support for TypeScript for 'eslint-plugin-import' package.
        'plugin:import/typescript',

        // Disable any formatting/stylistic rules, should go last in the extends section.
        'prettier',
    ],
    reportUnusedDisableDirectives: true,
    rules: {
        // compatibility with mongodb
        'no-underscore-dangle': [
            "error",
            {"allow": ["_id"]}
        ],

        // Sync with .prettierrc.json
        'max-len': [
            'error',
            {
                code: 130,
                ignoreUrls: true,
            },
        ],
        'no-tabs': [
            'error',
            { allowIndentationTabs: true },
        ],
        indent: [
            'error',
            'tab',
            { SwitchCase: 1 },
        ],

        // Disallow variable declarations from shadowing variables declared in the outer scope.
        'no-shadow': 'off',

        // Disallow unnecessary constructors.
        'no-useless-constructor': 'off',

        // Enforce consistent line breaks after opening and before closing braces.
        'object-curly-newline': [
            'error',
            {
                ImportDeclaration: {
                    consistent: true,
                },
            },
        ],

        // Enable compatibility with tsconfig.checks.json.
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': 'error',

        // turn on errors for missing imports
        "import/no-unresolved": "error",

        // Ensure consistent use of file extension within the import path.
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],

        // Require used npm package to be explicitly installed.
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
            },
        ],
    },
};
