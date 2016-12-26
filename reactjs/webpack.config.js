var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ExtractTextPlugin = require("extract-text-webpack-plugin");


var plugins = [];
var loaders = [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
    { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
    {test: /\.(eot|com|json|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?publicPath=../&name=./css/fonts/[name].[ext]'},
   // {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
    {
        test: /\.jsx?$/,         // Match both .js and .jsx files
        exclude: /node_modules/,
        loader: "babel",
        query:
        {
            presets:['react', "es2015"]
        }
    },
    {
        test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100000&name=images/[name].[ext]'
    },

    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=images/[name].[ext]'
    }
];


plugins.push(new ExtractTextPlugin("css/style.css"));
plugins.push(new webpack.ProvidePlugin({"$":"jquery", 'jQuery': "jquery",'window.jQuery': "jquery",'window.$': 'jquery'}));
plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js', Infinity));
plugins.push( new webpack.DefinePlugin({"require.specified": "require.resolve"}));

plugins.push(
    new HtmlWebpackPlugin({
        template:"./index.html",
        filename:"html/index.html",
        inject:"body",
        hash:true,
        cache:true,
        showErrors:true,
        chunks:["js/index"]
    })
);

module.exports={
  entry:{
    "js/index":"./src/index.js"
  },
    output:{
        path:"./build",
        filename:"[name].js"
    },
    devServer: {
        progress: true,
        host: '0.0.0.0',
        port: 8081,
        colors: true,
        inline: true,
        // hot: true,
        contentBase: './src',
        displayErrorDetails: true,

    },
    module:{
        loaders:loaders
    },
    plugins: plugins,
    externals:{

    }
};