const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  /***
  
      Archivo de configuracion para webpack + ReactJs + Babel + Ofuscador
  
  ***/
  entry: {
    'index': './src/index.js',
    'recuperacion': './src/recuperacion.js',
  },
  /***
  
      Definicion de los nombres de salida para el empaquetado de React + WebPack
  
  ***/
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/frontend/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          /***
          
              Definicion de la configuracion para los loaders de babel
          
          ***/
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              ["@babel/plugin-transform-runtime",
                {
                  "regenerator": true
                }
              ],
              "emotion"
            ]
          }
        }
      },
      /***
      
          Inclucion del css dentro del empaquetado producido por webpack
      
      ***/
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  /***
     
        Definicion para los archivos comunes para los multi entry points
        Es optimo ya que se genera un commons-xxxxxxx.js con todos los 
        componentes comunes que usan los diferentes entry points
     
  ***/
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
          minSize: 0,
        }
      }
    },
    occurrenceOrder: true
  },
  plugins: [
    new webpack.ProgressPlugin(),
    /***
       
       Se ofusca el codigo para el empaquetado de produccion
       
    ***/
    new JavaScriptObfuscator({
      rotateUnicodeArray: true
    }, []),
    new CleanWebpackPlugin(),
    /***
       
       Se definen los HTMLS a los cuales se les quiere inyectar los JS
       empaquetados por webpack
       
    ***/
    new HtmlWebpackPlugin({ chunks: ['recuperacion', 'commons'], template: './public/recuperacion.html', filename: 'recuperacion.html' }),
    new HtmlWebpackPlugin({ chunks: ['index', 'commons'], template: './public/index.html', filename: 'index.html' }),
  ],

  /***
     
     Se definela configuracion del servidor de desarrollo
     
  ***/
  devServer: {
    port: 3001,
    historyApiFallback: true,

  },
}