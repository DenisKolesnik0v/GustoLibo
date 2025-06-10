module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'standard',
        'plugin:import/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'import',
    ],
    rules: {
        'dot-notation': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/no-unresolved': 'error',
        'import/order': [
            'error',
            {
                groups: [
                    ['builtin', 'external'],
                    ['internal'],
                    ['parent', 'sibling', 'index'],
                ],
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'internal',
                        position: 'before',
                    },
                ],
                'newlines-between': 'always',
            },
        ],
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        'react/jsx-quotes': ['off'],
        'no-useless-escape': 'off',
        semi: ['error', 'always'],
        indent: ['error', 4],
        'comma-dangle': ['error', 'always-multiline'],
    },
    ignorePatterns: [
        'redux/',
        'src/utils/request.ts',
        'vite.config.ts',
        'node_modules/',
        'dist/',
        'public/',
    ],
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@utils', './src/utils'],
                    ['@models', './src/utils/models'],
                    ['@components', './src/components'],
                    ['@themecontext', './src/context/ThemeContext.tsx'],
                    ['@hooks', './src/hooks'],
                    ['@redux', './src/redux'],
                ],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};
