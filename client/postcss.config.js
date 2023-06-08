export default {
  // Addons
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
    },
  ],
  // //
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
