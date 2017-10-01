const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './app/app.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
            // 'window.Tether': 'tether',
            // tether: 'tether',
            // Tether: 'tether'
        }),
        new ExtractTextPlugin('styles.css')
    ],
    output: {
        path: path.resolve(__dirname, './public/'),
        filename: 'bundle.js'
    },
    
    devServer: {
        contentBase: path.join(__dirname, './public/'),
        compress: true,
        port: 3000,
        historyApiFallback: true
    },

    resolve: {
        alias: {

            // Libraries
            Materialize: path.resolve(__dirname, './app/js/materialize.min.js'),

            // Components
            Root: path.resolve(__dirname, './app/components/Root.js'),
            Teams: path.resolve(__dirname, './app/components/Teams/Teams.js'),
            TeamsNumber: path.resolve(__dirname, './app/components/Teams/TeamsNumber.js'),
            Fixtures: path.resolve(__dirname, './app/components/Fixtures/Fixtures.js'),
            LeagueTable: path.resolve(__dirname, './app/components/LeagueTable/LeagueTable.js'),
            
            // common
            Navbar: path.resolve(__dirname, './app/components/common/Navbar/Navbar.js'),
            InputField: path.resolve(__dirname, './app/components/common/InputField/InputField.js'),
            
            // css
            materialize: path.resolve(__dirname, './node_modules/materialize-css/dist/css/materialize.min.css'),

        },
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
     
            // Loaders for other file types can go here

            // load materialize fonts
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader?limit=800000!name=public/fonts/roboto/[name].[ext]',
                }],      
            }
        ]
    },
    node: {
        fs: 'empty'
    },

    devtool: 'cheap-module-eval-source-map'       // for deployment - faster building
};