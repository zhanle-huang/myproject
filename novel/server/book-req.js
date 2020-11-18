var express = require('express');
var db_mysql = require('./mysql.js');
var bodyParser = require('body-parser')

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
router.get("/", function(req, res) {
	//书籍id
	var bookId = parseInt(req.query.id);
	//分类id
	var categoryId = parseInt(req.query.categoryId);
	var pageNum = parseInt(req.query.pageNum);
	var pageSize = parseInt(req.query.pageSize);
	//如果存在id参数，就是获取某一本书籍
	res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
	// 设置所有域允许跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	if (bookId) {
		if (isNaN(bookId)) {
			res.send(reqParamErr);
			return;
		}
		var sql = 'select * from bookview where id=?';
		var sql1 = 'select count(id) as total from chapters where bookId=?';
		let chapterTotal;
		db_mysql.select(sql1, bookId, result => {
			console.log(result[0].total, "ss")
			chapterTotal = result[0].total;
		})
		db_mysql.select(sql, bookId, result => {
			console.log(result)
			if (result && result.length > 0) {
				let dd = {
					data: result,
					chapterTotal: chapterTotal
				};
				res.send(dd);
			} else {
				var data = {
					"status": 1,
					"statusInfo": {
						"message": "查询不到类书籍，确认分类id是否正确",
						"detail": {
							"exception": "book-req.js"
						}
					}
				}
				res.send(data);
			}
		})

	} else {
		if (isNaN(categoryId) || isNaN(pageNum) || isNaN(pageSize)) {
			res.send(reqParamErr);
			return;
		}
		var sql = 'select * from bookview where categoryId=? limit ?,?';
		var param = [];
		param.push(parseInt(categoryId), (pageNum - 1) * pageSize, parseInt(pageSize))
		console.log(param, "sss")
		db_mysql.select(sql, param, function(result) {
			console.log(result)
			if (result.length > 0) {
				res.send(result);
			} else {
				var data = {
					"status": 1,
					"statusInfo": {
						"message": "查询不到类书籍，确认分类id是否正确",
						"detail": {
							"exception": "book-req.js"
						}
					}
				}

				res.send(data);
			}
		})
	}

})

router.get('/search', (req, res) => {
	var searchStr = '%' + req.query.searchStr + '%';
	var pageNum = parseInt(req.query.pageNum);
	var pageSize = parseInt(req.query.pageSize);
	var reqArr = [searchStr, (pageNum - 1) * pageSize, pageSize];
	console.log(reqArr);
	// if (isNaN(searchStr) || isNaN(pageNum) || isNaN(pageSize)) {
	// 	res.send(reqParamErr);
	// 	return;
	// }
	res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
	// 设置所有域允许跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	var sql = 'select * from bookview where name like ? limit ?,?';
	db_mysql.select(sql, reqArr, function(result) {
		console.log(result)
		if (result && result.length > 0) {
			res.send(result);
			return;
		} else {
			var data = {
				"status": 1,
				"statusInfo": {
					"message": "查询不到类书籍，确认分类id是否正确",
					"detail": {
						"exception": "book-req.js"
					}
				}
			}

			res.send(data);
		}
	})
})

//请求全部书籍
router.get("/all", (req, res) => {
	var pageNum = parseInt(req.query.pageNum);
	var pageSize = parseInt(req.query.pageSize);
	//如果存在id参数，就是获取某一本书籍
	if (isNaN(pageNum) || isNaN(pageSize)) {
		res.send(reqParamErr);
	}
	res.send(data);
	res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
	// 设置所有域允许跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	var arr = [(pageNum - 1) * pageSize, pageSize];
	var sql = 'select * from bookview limit ?,?';
	db_mysql.select(sql, arr, result => {
		if (res.length > 0) {
			res.send(res);
		}
	})
})

//修改书名
router.put("/", async function(req, res) {
	var books = req.body.book;
	var flag = false;
	for (var i = 0; i < books.length; i++) {
		var arr = [];

		var ls = '';
		for (key in books[i]) {
			//先过滤id，最后再将id加到后面
			if (key === "id") {
				break;
			}
			arr.push(books[i][key])
			ls += `${key}=?,`;
		}
		//去掉最后的 , 
		ls = ls.substr(0, ls.length - 1);
		arr.push(books[i].id);
		var sql = `update books set ${ls} where id=?`;
		flag = db_mysql.update(sql, arr);
	}
	if (flag) {
		res.send({
			"status": "0"
		})
	} else {
		var data = {
			"status": 1,
			"statusInfo": {
				"message": "查询不到该书名，确认id是否正确",
				"detail": {
					"exception": "book-req.js"
				}
			}
		}
		res.send(data);
	}
})

module.exports = router;
