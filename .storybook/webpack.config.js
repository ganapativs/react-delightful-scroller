const path = require("path");

module.exports = async ({config, mode}) => {
    config.module.rules.push({
      test: /\.(story|stories)\.jsx?$/,
      loaders: [require.resolve('@storybook/addon-storysource/loader')],
      enforce: 'pre',
    });

    const jsRule = config.module.rules.find(rule => {
        return String(rule.test) === String(/\.(mjs|jsx?)$/)
    });

    /** Exclude node_modules from sub-directories as well */
    jsRule.exclude = /node_modules/

    return config;
};
