const HtmlWebpackPlugin = require("html-webpack-plugin")
	webpack = require("webpack")
	path = require("path"),
	UglifyEsPlugin = require('uglify-es-webpack-plugin');

let config = {
	context:__dirname,
	entry:'./src/index.js',
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:"[name].[chunkhash].js",
		publicPath:'/'
	},
	module:{
		rules:[
		{
			test:/\.js?/,
			exclude:/node_modules/,
			loader:'babel-loader'
		},{
			test:/\.css?/,
			use:['style-loader','css-loader']
		}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'public/index.html'),
			filename:'index.html'
		})
	]
}

if(process.env.NODE_ENV !== 'production'){
	config['devServer'] = {
		progress:true,
		historyApiFallback:true
	}
}else{
	config["plugins"].push(
		new webpack.optimize.MinChunkSizePlugin({
			minChunkSize: 10000 // Minimum number of characters
		}))
	config["plugins"].push(
		new UglifyEsPlugin({
                compress:{
                    drop_console: true
                }
            }))
}

module.exports = config