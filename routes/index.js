//总路由
var express = require('express');
var router = express.Router();
var app = express();
var index = require('./branch/index');

/**
 * 总路由
 * @param {Object} app
 */
module.exports = function(app){

	app.use(index);

};