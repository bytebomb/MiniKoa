# MiniKoa
1. 内置的http模块创建简单服务
```js
const http=require('http')
const server = http.createServer((req, res) => {
  res.end(`<h1>hello world</h1>`)
})
server.listen(3000, () => {
  console.log("server listen at port 3000")
})
```
2. 原生的req和res功能比较弱，将其封装成context,并扩展其他功能，使用更方便

3. koa2和gin等web api框架都是采用洋葱模型,采用中间件的模式
- 中间件是一个回调函数，其中有context和next两个参数
- context用于封装和扩展req、res
- next用来调用下一个中间件，这就是中间件的奥秘
- 中间件需要使用async和await来实现异步操作

4. koa开发常用的中间件
- koa-json 用于给前端返回json对象
- koa-bodyparser 用于解析post请求体
- koa-router 路由分配
- koa2-cors 解决跨域
- koa-jwt 登录令牌
- jsonwebtoken 权限管理
- nodemailer 发送邮件
