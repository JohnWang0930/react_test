const http = require('http')
const ReactDOMServer = require('react-dom/server')
const React = require('react')
const fs = require('fs')
const path = require('path')

const MIME_MAP = { // 各个后缀和MIME的映射
    js: 'text/javascript',
    css: 'text/css',
}
const httpPort = 1314
class StaticResource {
    arrJs = [] // 保存js静态资源相对路径
    arrCss = [] // 保存css静态资源相对路径
    exp = new RegExp(path.resolve(__dirname, '..', 'build').replace(/\//g, '\\/') + '(.*$)') // 捕获静态资源的正则
    constructor() {
        this.getPath(path.resolve(__dirname, '..', 'build', 'static'))
    }
    getPath(root) { // 读取build目录下静态资源相对build的路径
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
    getCssStr() { // 获取css的html字符串
        return this.arrCss.map(i => {
            const relPath = i.match(this.exp)[1]
            if (!relPath) {
                return ''
            } else {
                return `<link href="${relPath}" rel="stylesheet">`
            }
        }).join('\n')
    }
    getJsStr() { // 获取js的html字符串
        return this.arrJs.map(i => {
            const relPath = i.match(this.exp)[1]
            if (!relPath) {
                return ''
            } else {
                return `<script src="${relPath}"></script>`
            }
        }).join('\n')
    }
}
const sr = new StaticResource() // 实例化资源对象

class App extends React.Component {
    render() {
        return (
            <div>aa</div>
        )
    }
}

function htmlTemplate(reactDom) { // 返回html模板组合 静态资源和react字符串的方法
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <title>React SSR</title>
    ${sr.getCssStr()}
    </head>
    
    <body>
    <div id="root">${reactDom}</div>
    ${sr.getJsStr()}
    </body>
    </html>
    `;
}

http.createServer((req, res) => {
    if (/\/static\//.test(req.url)) { // 如果是获取静态资源的
        const pathStr = path.join(__dirname, '..', 'build', req.url) // 获取静态资源绝对路径
        const ext = path.extname(pathStr).replace('.', '') // 获取后缀
        if (Object.keys(MIME_MAP).includes(ext)) { // 给js和css文件设content-type头
            res.setHeader('Content-Type', MIME_MAP[ext])
        }
        return fs.createReadStream(pathStr).pipe(res) // 静态资源响应
    }
    res.end(htmlTemplate(ReactDOMServer.renderToString(<App></App>))) // 如果不是获取静态资源 返回ssr字符串
})
    .listen(httpPort) // 监听端口