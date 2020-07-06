const marked = require('marked')
module.exports = soure => {
    console.log(soure)
    const html = marked(soure)
    return `module.exports = ${JSON.stringify(html)}`
} 