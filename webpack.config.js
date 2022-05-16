const path = require('path');
const webpack = require('webpack');

// create the main config object within the file, options within the obj will tell webpack what to do
// Not necessary as of webpack v4, but we will use it to be more specific with how webpack will function 

module.exports = {
    // entry property; the root of the bundle and the beginning of the dependency graph
    // relative path to the client's code 
    entry: './assets/js/script.js',
    // webpack takes the entry point, bundles that code, and outputs to a specified folder
    // best practice to put your bundled code into a folder named dist
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js',
    },
    // set the mode you want webpack to run on. Default is 'production' mode, 
    // where webpack will minify code automatically. 
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    mode: 'development'
};