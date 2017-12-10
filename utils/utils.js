//用来存放与业务无关的公共函数

//获取星星数
function convertToStarsArray(stars){
	var num=stars.toString().substring(0,1);
	var starsArr=[];
	for(var i=1;i<=5;i++){
		if(i<=num){
			starsArr.push(1);
		}else{
			starsArr.push(0);
		}
	}
	return starsArr;
}

//封装http请求
function http(url,callBack) {
	wx.request({
		url: url,
		method: 'GET',
		header: {
			'Content-Type': 'application/xml'
		},
		success: function (res) {
			callBack(res.data);
		}
	})
}

module.exports = {
	convertToStarsArray: convertToStarsArray,
	http:http
}