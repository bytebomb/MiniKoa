const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
class Application {
  constructor() {
    /* 要保证每次创建应用时，以下三个对象是不共享的 */
    //this.context.__proto__=context
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)

    /* 先将中间件存起来，有请求时才会调用 */
    this.middleware = []
  }
  use(fn) {
    this.middleware.push(fn)
  }
  listen() {
    //http请求是无状态的，每请求一次,createServer中的回调函数都会被调用依次，
    const server = http.createServer(this.handleRequest)
    server.listen(...arguments)
  }
  handleRequest = (req, res) => {
    res.statusCode = 404 //当body被赋值时改成200
    const ctx = this.createContext(req, res)
    //将上下文传给用户设置
    this.compose(ctx).then(() => {
      // 中间件组合并执行完毕后进行响应
      res.end(ctx.body || `<h1 style="text-align:center">Not Found</h1>`)
    })
  }
  createContext(req, res) {
    /* 要保证每次创建连接时，以下三个对象是不共享的 */
    const context = Object.create(this.context)
    const request = Object.create(this.request)
    const response = Object.create(this.response)

    /* req,res（原生的），request,response（扩展的），统一挂到context上 */
    context.request = request
    context.request.req = context.req = req;
    context.response = response
    context.response.res = context.res = res;

    return context;
  }
  compose(ctx) {
    // 递归实现洋葱模型(组合中间件)
    const next = (i) => {
      if (this.middleware.length == i) return Promise.resolve()
      return Promise.resolve(this.middleware[i](ctx, () => next(i + 1)))
    }
    return next(0) //执行第一个中间件
  }
}

module.exports = Application