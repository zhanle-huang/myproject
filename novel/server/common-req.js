const express = require('express');
const db_mysql = require('./mysql.js');
const router = express.Router();

const reqParamErr = {
	"status": 1,
	"statusInfo": {
		"message": "请求参数不正确",
		"detail": {
			"exception": "common-req.js"
		}
	}
};

router.put('/read', (req, res) => {
	const bookId = parseInt(req.body.bookId);
	console.log(bookId)
	const sql = 'update books set readNum=readNum+1 where id=?';
	
	db_mysql.select(sql, bookId, function(result) {
		if(result.length > 0) {
			res.send(true);
		} else {
			
			res.send(reqParamErr);
		}
	});
})

module.exports = router;