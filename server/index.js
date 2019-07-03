const http = require('http')
const ReactDOMServer = require('react-dom/server')
const React = require('react')
const fs = require('fs')
const path = require('path')

const app = http.createServer((req, res) => {
    if (/\/static\//.test(req.url)){ // 如果是获取静态资源的
        const pathStr = path.join(__dirname, '..', 'build', req.url)
        const ext = path.extname(pathStr).replace('.','')
        const MIME_MAP = {
            js:'text/javascript',
            css:'text/css',
        }
        if (Object.keys(MIME_MAP).includes(ext)){ // 给js和css文件设content-type头
            res.setHeader('Content-Type',MIME_MAP[ext])
        }
        return fs.createReadStream(pathStr).pipe(res)
    }
    res.end(htmlTemplate(ReactDOMServer.renderToString(<App></App>)))
})
app.listen(1314)

class StaticResource {
    arrJs = []
    arrCss = []
    exp = new RegExp(path.resolve(__dirname, '..', 'build').replace(/\//g,'\\/') + '(.*$)')
    constructor(){
        this.getPath(path.resolve(__dirname, '..', 'build', 'static'))
    }
    getPath(root) {
        const isDirectory = fs.statSync(root).isDirectory()
        if (isDirectory) {
            fs.readdirSync(root).forEach(i => {
                this.getPath(path.resolve(root, i))
            })
        } else {
            const extName = path.extname(root)
            if (extName === '.js') {
                this.arrJs.push(root)
            } else if (extName === '.css') {
                this.arrCss.push(root)
            }
        }
    }
    getCssStr(){ // 获取css的html字符串
        return this.arrCss.map(i=>{
            const relPath = i.match(this.exp)[1]
            if (!relPath){
                return ''
            }else{
                return `<link href="${relPath}" rel="stylesheet">`
            }
        }).join('\n')
    }
    getJsStr(){ // 获取js的html字符串
        return this.arrJs.map(i=>{
            const relPath = i.match(this.exp)[1]
            if (!relPath){
                return ''
            }else{
               return `<script src="${relPath}"></script>`
            }
        }).join('\n')
    }
}
const sr = new StaticResource() // 实例化资源对象

function htmlTemplate(reactDom) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React SSR</title>
            ${sr.getCssStr()}
        </head>
        
        <body>
            <div id="root">${ reactDom}</div>
            ${sr.getJsStr()}
        </body>
        </html>
    `;
}
class App extends React.Component {
    render() {
        return (
            <div>aa</div>
        )
    }
}