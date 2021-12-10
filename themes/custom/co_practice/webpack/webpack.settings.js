// webpack.settings.js - webpack settings config
const srcRoot = 'src';

// Webpack settings exports
module.exports = {
  srcRoot,
  paths: {
    templates: '../templates/', // Template's parent folder.
  },
  entries: {
    main: ['index.js'], // Script's locations.
  },
  devServerConfig: {
    // The base path of your Drupal development server. This is what you would
    // normally navigate to in your browser when working on the site.
    proxy: 'https://localhost/template-drupal/', // e.g. "https://front-framework.dd:8443/"
    // The absolute path to the directory, relative to the PROXY path above, to the
    // directory that contains the files that you want webpack-dev-server to NOT
    // pass on to Drupal.
    public: '/template-drupal/themes/custom/co_practice/dist/', // e.g. "/themes/custom/front_framework/dist/"
    port: 8080, // Default port set to 8080, change it if port is already in use. e.g. 3000.
    https: true, // Recommended.
  },
  purgeCssConfig: {
    // Purgeable templates.
    content: [
      './templates/**/*.{twig,html,tpl}',
      './' + srcRoot + '/**/*.{js,jsx,ts,tsx,vue}',
    ],
    options: {
      safelist: {
        standard: [], // e.g. ['random', 'yep', 'button'] 👉 In this example, the selectors .random, #yep, button will be left in the final CSS.
        deep: [], // e.g. [/red$/] 👉 In this example, selectors ending with red such as .bg-red will be left in the final CSS.
        greedy: [], // e.g. [/red$/] 👉 In this example, selectors such as button.bg-red.nonexistent-class will be left in the final CSS, even if button and nonexistent-class are not found.
        blocklist: [], // e.g. ['usedClass', /^nav-/] 👉 Even if nav-links and usedClass are found by an extractor, they will be removed.
      },
    },
  },
};
