const { noConflict } = require("jquery")

module.exports = class RemoveAnnotatePlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('RemoveAnnotatePlugin', compilation => {
      const assets = compilation.assets
      for (const key in assets) {
        if (key.endsWith('.js')) {
          const context = assets[key].source()
          const resultCxt = context.replace(/\/\*{2,}\/\s?/g,'')
          compilation.assets[key] = {
            source: ()=>resultCxt,
            size: ()=>resultCxt.length
          }
        }
      }
    })
  }
}