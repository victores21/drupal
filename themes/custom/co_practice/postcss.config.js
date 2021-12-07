module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    [
      'postcss-preset-env',
      {
        browsers: 'last 2 versions',
        features: {
          'focus-within-pseudo-class': false,
        },
      },
    ],
  ],
};
