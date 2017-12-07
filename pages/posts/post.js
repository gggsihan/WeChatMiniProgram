var postData=require("../../data/posts-data.js")  //只能使用相对路径

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*假设从服务器传来参数*/
    this.setData({
        data_key:postData.postList
    })
    
  },
  
  onPostTap:function(event){
      var postId=event.currentTarget.dataset.postId;
      wx.navigateTo({
          url: 'post-detail/post-detail?id='+postId,
      })
  },

  onSwiperTap:function(event){
	  var postId=event.target.dataset.postId;
	  wx.navigateTo({
		  url: 'post-detail/post-detail?id=' + postId,
	  })
  }

})