// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { CracoAliasPlugin } = require('react-app-alias');

const options = {
  source: 'tsconfig',
  tsConfigPath: 'tsconfig.paths.json',
};

// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options,
    },
  ],
};
