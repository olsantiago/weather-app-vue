import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  ...pluginVue.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  {
    rules: {
      'vue/require-prop-types': 0,
      'vue/require-default-prop': 0,
      'vue/no-unused-vars': 'error',
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
]
