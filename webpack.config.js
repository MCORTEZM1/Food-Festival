const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');

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
                test: /\.png|jpe?g|gif$/i,
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
            analyzerMode: "disable" // the report outputs to an HTML file in dist folder. 
            //Can also set "disable" to temporarily stop auto reporting in browser
        }),
        // invoke constructor w keyword 'new' passing an object as the only argument
        new WebpackPwaManifest({
            name: 'Food Event',
            short_name: 'Foodies',
            description: 'An app that allows you to view upcoming food events.',
            // specify the homepage for the PWA relative to the location of the manifest file
            start_url: '../index.html',
            background_color: '#01579b',
            theme_color: '#ffffff',
            // fingerprints tells webpack whether or not it should generate unique fingerprints
            // so that each time a new manifest is generated it looks like: `manifest.lhge325d.json`
            fingerprints: false,
            // inject property determines whether the link to the manifest.json us added to the HTML
            // Because we are not using fingerprints, set to false.
            // path to manifest.json will be hard-coded instead
            inject: false,
                // fingerprints and inject are specific to the manifest plugin
            // v5 of this plugin prepends 'auto' the src below. Set to an empty string w a space to prevent that. 
            publicPath: ' ',
            // icons value is an array of objects.
            icons: [{
            // object contains
                // path to the icon we want to use
                src: path.resolve('assets/img/icons/icon-512x512.png'),
                // this plugin takes the src and creates icons with the dimensions provided as value of sizes: []
                sizes: [96, 128, 192, 256, 358, 512],
                // designates where the icons will be sent after the creation of the web manifest is completed by the plugin.
                destination: path.join('assets',  'icons')
            }]
        })
    ],
    mode: 'development'
};