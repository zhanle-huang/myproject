var express = require('express');
var db_mysql = require('./mysql.js');
var router = express.Router();

var reqParamErr = {
	"status": 1,
	"statusInfo": {
		"message": "请求参数不正确",
		"detail": {
			"exception": "category-req.js"
		}
	}
};

//查询分类
router.get('/', function(req, res) {
	var sql = 'select * from category';
	db_mysql.select(sql, null, function(result) {
		if(result.length > 0) {
			res.send(result);
		} else {
			var data = {
				"status": 1,
				"statusInfo": {
					"message": "查询不到该书名，确认id是否正确",
					"detail": {
						"exception": "category-req.js"
					}
				}
			}
			res.send(data);
		}
	});
	
})

module.exports = router;