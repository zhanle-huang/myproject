var express = require('express');
var db_mysql = require('./mysql.js');
var bodyParser = require('body-parser')
var Util = require('./Util.js')
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
	extended: false
})
//获取router对象
var router = express.Router();
//获取某类书籍

var reqParamErr = {
	"status": 1,
	"statusInfo": {
		"message": "请求参数不正确",
		"detail": {
			"exception": "book-req.js"
		}
	}
};

//加入历史
router.post('/', function(req, res) {
	console.log(req.body.userId)
	let userId = req.body.userId;
	let bookId = parseInt(req.body.bookId);
	let readCardId = Util.getRamNumber();
	let time = Util.getTimeToday();
	
	var arr = [readCardId,userId, bookId, time];
	
	res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
	// 设置所有域允许跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	var sql = 'insert into readcards(readCardId, userId, bookId, time) values(?,?,?,?)';
	try {
		db_mysql.insert(sql, arr, (result) => {
			res.send(result);
		})
	} catch{
		console.log("插入出错，位置-readcard-req.js的post请求");
	}
})
//获取历史
router.get('/', function(req, res) {
	var userId = req.query.userId;
	
	var sql = 'select * from readcardview where userId=? order by time desc';
	db_mysql.select(sql, userId, function(result) {
		if(result.length > 0) {
			res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
			// 设置所有域允许跨域
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.send(result);
		} else {
			var data = {
				"status": 1,
				"statusInfo": {
					"message": "暂无历史数据，请去阅读吧",
					"detail": {
						"exception": "readcard-req.js"
					}
				}
			}
			res.send(data);
		}
	})
})

//删除历史的书籍，传递一个数组
router.post('/delete', function(req, res) {
	
	let userId = req.body.userId;
	let token = req.body.token;
	let arrId = req.body.id.split(',');
	
	console.log(arrId) 
	var sql = 'delete from readcards where readCardId=?';
	res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
	// 设置所有域允许跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	for(var i = 0; i<arrId.length; i++) {
		db_mysql.del(sql, arrId[i], function(result) {
			if(!result) {
				res.send(false);
				return;
			}
		})
	}
	res.send(true);
}) 
//更新历史记录
router.put('/', (req, res) => {
	let userId = req.body.userId;
	let bookId = parseInt(req.body.bookId);
	let time = Util.getTimeToday();
	
	let arr = [time, userId, bookId];
	
	res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
	// 设置所有域允许跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	var sql = 'update readcards set time=? where userId=? and bookId=?';
	try {
		db_mysql.update(sql, arr, result => {
			if(result) {
				res.send(true);
			} else {
				res.send(false);
			}
		})
	} catch {
		console.log("历史记录更新出错")
	}
})

//判断是否存在
router.get('/exits', (req, res) => {
	var bookId = parseInt(req.query.bookId);
	var userId = parseInt(req.query.userId);
	
	var arr = [userId, bookId];
	res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
	// 设置所有域允许跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	var sql = 'select * from readcards where userId=? and bookId=?';
	db_mysql.select(sql, arr, result => {
		console.log(result,result.length)
		if(result.length>0) {
			res.send(true);
		} else {
			res.send(false)
		}
	})
})

module.exports = router;