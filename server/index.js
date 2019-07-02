const http = require('http')
const ReactDOMServer = require('react-dom/server')
const React = require('react')
const fs = require('fs')
const path = require('path')

const app = http.createServer((req, res) => {
    res.end(htmlTemplate(ReactDOMServer.renderToString(<App></App>)))
})
app.listen(1314)

const arrJs = []
const arrCss = []
function getPath(root) {
    const isDirectory = fs.statSync(root).isDirectory()
    if (isDirectory) {
        fs.readdirSync(root).forEach(i => {
            getPath(path.resolve(root, i))
        })
    } else {
        const extName = path.extname(root)
        if (extName === '.js') {
            arrJs.push(root)
        } else if (extName === '.css') {
            arrCss.push(root)
        }
    }
}

getPath(path.resolve(__dirname, '..', 'build', 'static'))

console.log(arrJs)
console.log(arrCss)

function htmlTemplate(reactDom) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React SSR</title>
        </head>
        
        <body>
            <div id="app">${ reactDom}</div>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}
class App extends React.Component {
    render() {
        return (
            <div>aaa</div>
        )
    }
}