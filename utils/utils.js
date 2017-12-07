//用来存放与业务无关的公共函数
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

module.exports = {
	convertToStarsArray: convertToStarsArray
}