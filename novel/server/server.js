var path = require('path');
var db_mysql = require('./mysql.js');
var express = require('express');
var pac = require('./pac.js');
var port = 3000;
var hostname = '127.0.0.1';
const bodyParser = require('body-parser');
const novel = express();
const bookReq = require('./book-req.js');
const categoryReq = require('./category-req.js');
const chapterReq = require('./chapter-req.js');
const bookShelfReq = require('./bookShelf-req.js');
const loginRegister = require('./login-register-req.js');
const readCardReq = require('./readcard-req.js');
const commonReq = require('./common-req.js');
// create application/json parser
novel.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
novel.use(bodyParser.urlencoded({ extended: false }));
novel.use('/public', express.static('public'));

novel.listen(port, hostname, function() {
	console.log("服务器启动成功！-- http://" + hostname + ":" + port + '/jojo')
})
novel.all("*", function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Headers', 'ontent-Type,Content-Length,Authorization,Accept,X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	res.header('X-Powered-By', '3.2.1')
	if (req.method == 'OPTIONS') res.send(200);
	// /让options请求快速返回/
	else next();
});
//路由中转
novel.use('/jojo/book', bookReq);
novel.use('/jojo/category', categoryReq);
novel.use('/jojo/chapter', chapterReq);
novel.use('/jojo/bookshelf', bookShelfReq);
novel.use('/jojo/reader', loginRegister);
novel.use('/jojo/readcard', readCardReq);
novel.use('/jojo/common', commonReq);



var cNum = 1;
async function insertBook(data) {
	console.log(data);
	
	var arr = [7, data.bookName, data.author, 0, data.describe, data.imgSrc];
	var sql = 'insert into books(categoryId, name, author, status, bookDesc, imgSrc) values(?, ?, ?, ?, ?, ?)';
	try {
		var flag = await db_mysql.asyncInsert(sql, arr);
		cNum = 0;
	} catch (e) {
		//TODO handle the exception
		console.log(e);
	}
	if (flag) {
		console.log("插入数据失败");
		return;
	}
}
async function insertContent(data, bookName) {
	console.log(bookName, data.title)
	var sel_sql = 'select id from books where name=?';
	try {
		var result = await db_mysql.asyncSelect(sel_sql, bookName);
	} catch (e) {
		//TODO handle the exception
		console.log(e)
	} 
	if (!result) {
		console.log("查询失败");
		return;
	}
	var src = 'insert into chapters(bookId, chapterNum, title, total, time, content) values(?, ?, ?, ?, ?, ?)';
	var updateTotal = 'update books set total=total+? where id=?';
	var updateTotalArr = [data.number, result[0].id];
	var arr = [result[0].id, cNum, data.title, data.number, data.time, data.content];
	try {
		var f = await db_mysql.asyncUpdate(updateTotal, updateTotalArr);
		var flag = await db_mysql.asyncInsert(src, arr);
		cNum++;
		
	} catch (e) {
		//TODO handle the exception
		console.log(e);
	}
	if (!flag) {
		console.log("插入内容失败");
		return;
	}
}
//讲查询都统一为返回一个对象{data:[]},里面包含查询的数组

//爬虫
// pac.start(insertBook, insertContent);

//
