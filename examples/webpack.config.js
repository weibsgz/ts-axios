const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  /**
   * 我们会在 examples 目录下建多个子目录
   * 我们会把不同章节的 demo 放到不同的子目录中
   * 每个子目录的下会创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象，key 为目录名
   * fs.readdirSync(__dirname) === 得到一个当前文件目录下的所有文件名称 的数组对象。
   * dirname === 当前模块的文件夹名称
   */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
      // entries ===》
      // 当前的 要处理的这个文件目录
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
         //fs.statSync(fullDir).isDirectory() ===> 检测是否存在当前这个目录
        // fs.existsSync(entry) ===> 检测是否存在当前要处理的这个文件
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
        console.log('entries: ' , entries) //{}
        console.log('entry: ' , entry) //D:\学习\ts-axios\ts-axios\examples\simple\app.ts
        console.log('dir: ' , dir) //simple
        //webpack-dev-middleware和webpack-hot-middleware express和 webpack配合使用熱更新
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  }, {}),

  /**
   * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
   */
  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}