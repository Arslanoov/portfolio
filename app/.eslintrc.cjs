module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'vue/no-setup-props-destructure': 0,
    'vue/no-v-html': 0,
    'vue/require-default-prop': 0,
  },
}
