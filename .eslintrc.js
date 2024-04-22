module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["react", "prettier"],
    rules: {
        quotes: ["error", "single"], // Use single quotes
        // or "quotes": ["error", "double"], // Use double quotes
        "prettier/prettier": ["error"],
    },
};
