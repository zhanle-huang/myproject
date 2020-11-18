const http = require('http');
const fs = require('fs');
 
function Pac() {
	this.data = null;
}

function getData(html) {
	const cheerio = require('cheerio');
	const $ = cheerio.load(html, {
		decodeEntities: false
	})
	return $;
}
//爬取内容,用promise对象包装异步获取数据的操作
function getHttpData(http1, callback) {
	//爬取内容
	// console.log(this);
	var p = new Promise(function(resolve, reject) {
		http.get(http1, function(req, res) {
			var html = '';
			req.on('data', function(data) {
				html += data;
			})
			req.on('end', function() {
				// console.log(html,);
				//爬取完毕装载到，并返回装载后的对象
				// var $ = getData(html);
				//调用处理函数来处理装载的数据
				// console.log(_this, callback);
				var d = callback(getData(html));
				resolve(d);
			})
		})
	}).catch((err) => {
		console.log(err);
	})
	return p;
}
//获取章节内容
function getChapterContent($) {

	//获取章节标题
	var reg1 = /(?:\s)*/g;

	var title = $('.reader_box .title_txtbox').text();
	//作者

	var author = $('.bookinfo a:first-child').text();
	//字数

	var number = $('.bookinfo span:nth-child(2)').text()
	//时间
	
	var time = $('.bookinfo span:nth-child(3)').text();
	//内容

	var content = $('.reader_box .content').html();
	// var info = `${title}-${number}字-${time}`;
	// content = `<h5>${info}</h5>${content}`;
	// title = title.replace(/\?|\!|\"|\:|\<|\>|\||\\|\//g, " ");

	var obj = {
		title: title,
		number: number,
		time: time,
		content: content
	}
	// console.log("获取到" + title)
	return obj;

}
//获取章节连接
function getChapterList($) {
	// console.log("章节")
	var url = [];
	var reg = /http.+.html/g;
	// var str_url = '';
	$('.chapter-list .col-4').each(function(index, ele) {
		// console.log($(ele).html())
		var str_url = $(this).html().match(reg);
		// str_url[0] = str_url[0].replace('book.zongheng', 'huayu.zongheng')
		//获取章节的详细内容
		// getHttpData(str_url[0], getChapterContent);
		// console.log(str_url[0])
		url.push(str_url[0]);

	});

	return url;
	//书名数组->目录数组
}

function getBookName($) {
	var reg = /http.+.html/g;
	var url = [];
	// console.log($('.store_collist .bookbox').html())
	var _this = $('.store_collist .bookbox');
	//获取书名数组
	$('.store_collist .bookbox').each(function(index, ele) {
		// console.log(_this.)
		// $(this).find('.bookname')
		// console.log( $(this).find('.bookname').html());
		var _url = $(ele).find('.bookname').html().match(reg);
		var bookName = $(ele).find('.bookname a').text();
		// console.log(bookName)
		var author = $(ele).find('.bookilnk a:first-child').text();
		_url[0] = _url[0].replace('com/book', "com/showchapter");
		//图片链接
		var imgUrl = $(ele).find('.bookimg img').prop('src');
		//获取本书描述
		var describe = $(ele).find('.bookintro').text();
		// fs.mkdir(`${bookName}-${author}`);
		var obj = {
			bookUrl: _url[0],
			bookName: bookName,
			author: author,
			imgSrc: imgUrl,
			describe: describe,
			childrenUrl: []
		}
		// console.log(obj)
		url.push(obj);
		// getHttpData(url1[0], getChapterList);
	})
	return url;
}
// console.log(global)
Pac.start = async function(callback, callback1) {
	console.log("进来了");
	//拿到书名数据
	var data = [];
	for (var i = 1; i <20; i++) {
		var d = await getHttpData('http://book.zongheng.com/store/c9/c1097/b0/u0/p'+i+'/v0/s1/t0/u0/i1/ALL.html',
			getBookName);
		data = [...data, ...d];
	}

	//遍历书名,获取目录连接
	for (var i = 0; i < data.length; i++) {
		var d1 = await getHttpData(data[i].bookUrl, getChapterList);
		data[i].childrenUrl = d1;

	}
	// console.log(data)
	// return
	//设置速度为1s爬取一次
	//遍历目录链接，获取内容
	for (var i = 0; i < data.length; i++) {
		//存储书名信息
		var bookId = null;
		if(callback) {
			bookId = callback(data[i]);
		}
		for (var j = 0; j < data[i].childrenUrl.length; j++) {
			
			var obj = await getHttpData(data[i].childrenUrl[j], getChapterContent);
			if(callback1) {
				console.log(data[i].bookName,"name")
				callback1(obj, data[i].bookName);
			}
			
			// var p_txt = `异界大陆/${data[i].bookName}-${data[i].author}/${obj.txtName}`
			//先判断上级目录是否存在，不存在就创建

			// if (!fs.existsSync(`异界大陆/${data[i].bookName}-${data[i].author}`)) {
			// 	try {
			// 		fs.mkdirSync(`异界大陆/${data[i].bookName}-${data[i].author}`)
			// 	} catch (e) {
			// 		console.log(e)
			// 	}
			// }
			// //如果问价存在，就不写

			// if (!fs.existsSync(p_txt)) {
			// 	try {
			// 		fs.writeFileSync(p_txt, obj.content)
			// 	} catch (e) {
			// 		console.log(e)
			// 	}
			// }

			//用来控制时间间隔
			for (var k = 0; k < 1000000000; k++) {}
		}
	}
	console.log("爬取完成")
}
// Pac.start();

module.exports = Pac;