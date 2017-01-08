var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();
var viewPath = path.join(__dirname,'./views');
var template = require('art-template');
// 将jade模板引擎替换为art引擎模板
app.set('views', path.join(viewPath));
//app.set('view engine', 'pug');
// 禁用模板缓存，修改模板立即生效  注意:在正式产品中不要禁用，仅在开发时可以使用
template.config('cache',false);
// 指定.html使用的解析引擎
app.engine('.html',template.__express);
// 指定使用html视图引擎
app.set('view engine','html');
template.config('base','');
template.config('extname','.html');


/********************   定义静态资源路径 start ****************************/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/********************   定义静态资源路径  end ****************************/


//路由汇总
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
