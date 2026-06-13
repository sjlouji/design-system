import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "staticDirs": ["../public"],
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    // Clear the library build's external function so it doesn't affect Storybook's bundling.
    // The rollupOptions.external in vite.config.ts is intended only for the ESM library build,
    // not for Storybook where all deps need to be bundled.
    if (config.build?.rollupOptions) {
      config.build.rollupOptions.external = [];
    }
    return config;
  },
};
export default config;