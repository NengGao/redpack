var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(['/','/index'], function(req, res, next) {

	var data = {};
  	res.render('index',data);
});

module.exports = router;
