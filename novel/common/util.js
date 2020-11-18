const Util = {};

Util.pToView = function(content, str) {
	var reg = /<p>/g;
	var reg1 = /<\/p>/g;
	content = content.replace(reg, '<p ' + str + ' class="content-p" >');
	content = content.replace(reg1, '</p>');
	return content;
}
//转换时间格式
Util.getTimeToday = function() {
	const d = new Date();
	const Y = d.getFullYear();
	const M = d.getMonth()+1<10 ? '0'+d.getMonth() : d.getMonth();
	const D = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
	const h = d.getHours();
	const m = d.getMinutes();
	const s = d.getSeconds();
	return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}
Util.formatDate = (time) => {
	let d = new Date(time);
	let Y = d.getFullYear();
	let M = d.getMonth()>8?d.getMonth()+1:'0'+(d.getMonth()+1);
	let D = d.getDate();
	let h = d.getHours();
	let m = d.getMinutes();
	let s = d.getSeconds();
	return ` ${Y}-${M}-${D} ${h}:${m}:${s}`;
}

Util.statusToText = function(status) {
	switch(status) {
		case 0: 
			return '完结';
		case 1: 
			return '连载中';
		case 2:
			return '停更';
	}
}
//随机16位
Util.getRamNumber = function() {
	var result = '';
	for (var i = 0; i < 16; i++) {
		result += Math.floor(Math.random() * 16).toString(16); //获取0-15并通过toString转16进制
	}
	//默认字母小写，手动转大写
	return result.toUpperCase(); //另toLowerCase()转小写

}


module.exports = Util;
