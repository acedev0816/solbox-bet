const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
      
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );
    
    config.ignoreWarnings= [/Failed to parse source map/];
    return config;
}