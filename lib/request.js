/* 此模块用于扩展原生req中的属性 */
const request = {
  get url() {
    /* {protocol,slashes,auth,host,port,hostname,hash,search,query,pathnam,path,href}=this.req.url */
    /* 这就是为什么在request上加一个req属性,就是为了在取值的时候方便获取原生的req */
    return this.req.url
  },
  set url(val) {
    this.req.url = val;
  },

  get path() {
    return this.req.url.path
  },
  set path(val) {
    this.req.url.path = val
  },

  get headers() {
    return this.req.headers;
  },

  get origin() {
    return `${this.protocol}://${this.host}`;
  },

  get method() {
    return this.req.method;
  },
  set method(val) {
    this.req.method = val;
  },

  get query() {
    const str = this.querystring;
    const c = this._querycache = this._querycache || {};
    return c[str] || (c[str] = qs.parse(str));
  },
  set query(obj) {
    this.querystring = qs.stringify(obj);
  },
  //等等。。。
}
module.exports = request