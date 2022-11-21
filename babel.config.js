module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false
      }
    ]
  ],
  env: {
    production: {
      plugins: [
        [
          'babel-plugin-jsx-remove-data-test-id',
          {
            attributes: 'test-id'
          }
        ]
      ]
    }
  }
};
