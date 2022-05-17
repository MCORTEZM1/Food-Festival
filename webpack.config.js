const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');

// create the main config object within the file, options within the obj will tell webpack what to do
// Not necessary as of webpack v4, but we will use it to be more specific with how webpack will function 

module.exports = {
    // entry property; the root of the bundle and the beginning of the dependency graph
    // relative path to the client's code 
    entry:  {
        app: './assets/js/script.js',
        events: './assets/js/events.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js'
    },
    // webpack takes the entry point, bundles that code, and outputs to a specified folder
    // best practice to put your bundled code into a folder named dist
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.jpg$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name (file) {
                                return "[path][name].[ext]"
                            },
                            publicPath: function(url) {
                                return url.replace("../", "/assets")
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]

    },


    // set the mode you want webpack to run on. Default is 'production' mode, 
    // where webpack will minify code automatically. 
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static" // the report outputs to an HTML file in dist folder. 
            //Can also set "disable" to temporarily stop auto reporting in browser
        })
    ],
    mode: 'development'
};