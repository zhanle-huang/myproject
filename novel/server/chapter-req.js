var express = require('express');
var db_mysql = require('./mysql.js');
var router = express.Router();
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

var reqParamErr = {
	"status": 1,
	"statusInfo": {
		"message": "请求参数不正确",
		"detail": {
			"exception": "category-req.js"
		}
	}
};

//获取某章内容
router.get('/content/', function(req, res) {
	var num = parseInt(req.query.num);
	var bookId = parseInt(req.query.bookId);
	if (isNaN(bookId) || isNaN(num) ) {
		res.send(reqParamErr);
		return;
	}
	var arr = [];
	arr.push(num, bookId);
	res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
	// 设置所有域允许跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	var sql = 'select * from chapters where chapterNum=? and bookId=?'
	db_mysql.select(sql, arr, function(result) {
		if(result.length > 0) {
			console.log(result)
			result[0].content = decoder.write(result[0].content)
			console.log(result[0].content)
			res.send(result);
		} else {
			var data = {
				"status": 1,
				"statusInfo": {
					"message": "查询不到该书名，确认id是否正确",
					"detail": {
						"exception": "chapter-req.js"
					}
				}
			}
			res.send(data);
		}
	});
	
})

//获取某本书的章节
router.get('/', function(req, res) {
	var bookId = parseInt(req.query.id);
	if (isNaN(bookId) ) {
		res.send(reqParamErr);
		return;
	}
	console.log(bookId)
	res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
	// 设置所有域允许跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	var sql = 'select id, chapterNum, title, total, time from chapters where bookId=?';
	db_mysql.select(sql, bookId , function(result) {
		if(result.length > 0) {
			
			res.send(result);
		} else {
			var data = {
				"status": 1,
				"statusInfo": {
					"message": "查询不到该书名，确认id是否正确",
					"detail": {
						"exception": "chapter-req.js"
					}
				}
			}
			res.send(data);
		}
	});
	
})

module.exports = router;