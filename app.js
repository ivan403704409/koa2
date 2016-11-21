//开启mongo服务 mongod --dbpath=./db  --port=27018
// http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001471133885340dad9058705804899b1cc2d0a10e7dc80000
import './db.js'
import User from './models/user.js'
const Koa = require('koa');
const app = new Koa();
import router from './router.js'
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const body = require('koa-better-body')
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
import Cookies from 'cookies'

const index = require('./routes/index');
const users = require('./routes/users');

// api
import './api/user.js'


// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));

// app.use(body({}));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// 设置cookie
app.use(async (ctx, next) => {
	let {request, response} = ctx
	console.log(ctx.cookies.get('test'))
	// ctx.cookies = new Cookies(request, response)
	await next()
})

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});

module.exports = app;