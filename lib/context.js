/* 本模块用于扩展context中的属性 */
const context = {}
function defineGetter(target, key) {
  context.__defineGetter__(key, function () {//相当于defineProperty的get() 
    return this[target][key]
  })
}
function defineSetter(target, key) {
  context.__defineSetter__(key, function (value) {//相当于defineProperty的get() 
    this[target][key] = value
  })
}
defineGetter('request', 'path') //获取contxt.path,实际上是获取request.path 
defineGetter('request', 'url')
defineGetter('request', 'query')

defineGetter('response', 'body')
defineSetter('response', 'body')

module.exports = context