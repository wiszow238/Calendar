var path = require("path"),
    webpack = require("webpack");

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/components/index.js',
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
};
