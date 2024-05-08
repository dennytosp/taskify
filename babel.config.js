const presets = ['module:@react-native/babel-preset'];

const plugins = [];

plugins.push([
  'module-resolver',
  {
    root: ['./src'],
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.android.js',
      '.android.tsx',
      '.ios.js',
      '.ios.tsx',
    ],
    alias: {
      '@': './src',
    },
  },
]);

module.exports = {
  presets,
  plugins,
};
