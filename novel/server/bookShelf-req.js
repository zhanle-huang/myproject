//加入书架
var express = require('express');
var db_mysql = require('./mysql.js');

var Util = require('./Util.js');
var router = express.Router();

var reqParamErr = {
	"status": 1,
	"statusInfo": {
		"message": "请求参数不正确",
		"detail": {
			"exception": "bookShelf-req.js"
		}
	}
};

//加入书架
router.post('/', function(req, res) {
	console.log(req.body.userId)
	let userId = req.body.userId;
	let bookId = parseInt(req.body.bookId);
	let num = parseInt(req.body.num);
	let time = Util.getTimeToday();
	var arr = [userId, bookId, num, time];
	
	res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
	// 设置所有域允许跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	var sql = 'insert into bookshelf(userId, bookId, chapterNum, time) values(?,?,?,?)';
	try {
		db_mysql.insert(sql, arr, (result) => {
			res.send(result);
		})
	} catch{
		console.log("插入出错，位置-bookShelf-req.js的post请求");
	}
})
//获取书架
router.get('/', function(req, res) {
	var userId = req.query.userId;
	var sql = 'select * from bookshelfview where userId=? order by id desc';
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
					"message": "查询不到类书籍，确认分类id是否正确",
					"detail": {
						"exception": "bookShelf-req.js"
					}
				}
			}
			res.send(data);
		}
	})
})
//查看某本书是否在书架
router.get('/exits', (req, res) => {
	var bookId = parseInt(req.query.bookId);
	var userId = parseInt(req.query.userId);
	var arr = [userId, bookId];
	res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
	// 设置所有域允许跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	var sql = 'select * from bookshelf where userId=? and bookId=?';
	db_mysql.select(sql, arr, result => {
		console.log(result,result.length)
		if(result.length>0) {
			res.send(true);
		} else {
			res.send(false)
		}
	})
})
//修改书架的书籍章节数
router.put('/', (req, res) => {
	console.log("修改来了", req.body)
	let userId = req.body.userId;
	let bookId = parseInt(req.body.bookId);
	let chapterNum = parseInt(req.body.chapterNum);
	let arr = [chapterNum, userId, bookId];
	
	res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
	// 设置所有域允许跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	var sql = 'update bookshelf set chapterNum=? where userId=? and bookId=?';
	try {
		db_mysql.update(sql, arr, result => {
			if(result) {
				res.send(true);
			} else {
				res.send(false);
			}
		})
	} catch {
		console.log("书架更新出错")
	}
})
//删除书架的书籍，传递一个数组
router.post('/delete', function(req, res) {
	
	let userId = req.body.userId;
	let token = req.body.token;
	let arrId = req.body.id.split(',');
	console.log(arrId)
	var sql = 'delete from bookshelf where id=?';
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

module.exports = router;