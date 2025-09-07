import globals from "globals"
import pluginJs from "@eslint/js"

/** @type {import('eslint').Linter.Config[]} */
export default [
    { 
        languageOptions: { 
            globals: {
                ...globals.browser,
                process: "readonly"
            },
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: "module"
            }
        } ,
        settings: {
            react: {
                version: "detect"
            }
        }
    },
    pluginJs.configs.recommended
]