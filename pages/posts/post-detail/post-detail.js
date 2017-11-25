var postsData = require("../../../data/posts-data.js") ;

Page({
    onLoad:function(option){
		var postId=option.id;
		this.setData({
			postData:postsData.postList[postId]
		})
	}
})