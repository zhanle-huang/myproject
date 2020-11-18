const Request = {};

// var dnsName = 'http://127.0.0.1:3000';
var dnsName = 'http://8.131.73.38:80';
// var dnsName = 'http://c755ec1839ad.ngrok.io';
// var dnsName = 'http://zhanle.ngrok2.xiaomiqiu.cn';
//获取书籍的请求
Request.getBook = function(data, callback) {
	console.log(data,"data")
	uni.request({ 
		url: dnsName+'/jojo/book',
		data: data,
		method: 'GET',
		success: (res) => {
			console.log(res);
			callback(res);
		}
	});
}
//获取某章内容
Request.getRecChapter = function(data, callback) { 
	uni.request({
		url: dnsName+'/jojo/chapter/content',
		data: data,
		method: 'GET',
		success: (res) => {
			callback && callback(res)
		}
	});
}

//加入书架
Request.addToShelf = function(data, callback) {
	uni.request({
		url: dnsName+'/jojo/bookshelf',
		data: data,
		method: 'POST',
		//post需要设置头类型
		header: {'Content-Type': 'application/x-www-form-urlencoded'},
		success: (res) => {
			console.log(res.data);
			callback && callback(res)
		}
	})
}

//获取章节
Request.getChapter = function(data, callback) {

	uni.request({
		url: dnsName+'/jojo/chapter',
		data: data,
		method: 'GET',
		success: (res) => {
			callback && callback(res);
		}
	})
}

Request.get = function(url, data, callback) {
	uni.request({
		url: dnsName+'/jojo' + url,
		data: data,
		method: 'GET',
		success: (res) => {
			callback && callback(res);
		}
	})
}

Request.post = function(url, data, callback) {
	uni.request({
		url: dnsName+'/jojo' + url,
		data: data,
		method: 'POST',
		header: {'Content-Type': 'application/x-www-form-urlencoded'},
		success: (res) => {
			callback && callback(res);
		}
	})
}

Request.put = function(url, data, callback) {
	uni.request({
		url: dnsName+'/jojo' + url,
		data: data,
		method: 'PUT',
		header: {'Content-Type': 'application/x-www-form-urlencoded'},
		success: (res) => {
			callback && callback(res);
		}
	})
}


module.exports = Request;
