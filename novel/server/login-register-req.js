var express = require('express');
var db_mysql = require('./mysql.js');
var bodyParser = require('body-parser')


var router = express.Router();



function getRamNumber() {
	var result = '';
	for (var i = 0; i < 16; i++) {
		result += Math.floor(Math.random() * 16).toString(16); //获取0-15并通过toString转16进制
	}
	//默认字母小写，手动转大写
	return result.toUpperCase(); //另toLowerCase()转小写

}
router.post('/login', function(req, res) {
	let userId = req.body.userId;
	let pwd = req.body.pwd;
	let arr = [userId, pwd];
	res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
	// 设置所有域允许跨域
	res.setHeader('Access-Control-Allow-Origin', '*');
	let sql = 'select userId,name,token from users where userId=? and password=?';
	db_mysql.select(sql, arr, result => {
		if(result && result.length > 0) {
			console.log(result)
			res.send(result[0]);
		} else {
			var reqParamErr = {
				"status": 1,
				"statusInfo": {
					"message": "账号或密码错误",
					"detail": {
						"exception": "login-req.js"
					}
				}
			};
			res.send(reqParamErr);
		}
	})
})

//注册
router.post('/register', function(req, res) {
	console.log(req.body);
	console.log(req.body.userId)
	let userId = req.body.userId;
	let pwd = req.body.pwd;
	let name = getRamNumber();
	console.log(name)
	let phone = req.body.phone;
	let token = getRamNumber();
	let arrCheck = [phone, userId];
	var arr = [userId, pwd, name, phone, token];
	var regSql = 'select * from users where phone=? or userId=?';
	db_mysql.select(regSql, arrCheck, result => {
		console.log("aals")
		if (result.length>0) {
			if(result[0].userId === userId) {
				var reqParamErr = {
					"status": 0,
					"statusInfo": {
						"message": "账号已存在",
						"detail": {
							"exception": "register-req.js"
						}
					}
				};
				res.send(reqParamErr);
			} else if(result[0].phone === phone) {
				var reqParamErr = {
					"status": 0,
					"statusInfo": {
						"message": "改手机号码已绑定",
						"detail": {
							"exception": "register-req.js"
						}
					}
				};
				res.send(reqParamErr);
			}
			
		} else {
			var sql = 'insert into users (userId, password, name, phone, token) values(?,?,?,?,?)';
			db_mysql.insert(sql, arr, result => {
				if (result) {
					res.send(true);
				} else {
					res.send(false);
				}
			
			})
			res.send(false);
		}
	
	})
	
})

module.exports = router;
