var postsData = require("../../../data/posts-data.js");
var app=getApp();

Page({
	data: {
		isPlayingMusic: false
	},
	onLoad: function (option) {
		var postId = option.id;
		var postData = postsData.postList[postId];
		this.data.currentPostId = postId;

		//如果在onLoad方法中，不是异步执行数据绑定
		//则不需要使用this.setData方法
		//只需要对this.data赋值即可实现数据绑定

		//this.data.postData=postData;

		this.setData({
			postData: postsData.postList[postId]
		});

		var postsCollected = wx.getStorageSync('collection_key');
		if (postsCollected) {
			var postCollected = postsCollected[postId];
			this.setData({
				collected: postCollected
			})
		} else {
			var postsCollected = {};
			postsCollected[postId] = false;
			wx.setStorageSync('collection_key', postsCollected)
		}

		if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId===postId){
			this.setData({
				isPlayingMusic:true
			})
		}

		this.setMusicMonitor();
	},

	setMusicMonitor:function(){
		var that=this;
		wx.onBackgroundAudioPlay(function(){
			that.setData({
				isPlayingMusic:true
			});
			app.globalData.g_isPlayingMusic=true;
			app.globalData.g_currentMusicPostId = that.data.currentPostId;
		});
		wx.onBackgroundAudioPause(function(){
			that.setData({
				isPlayingMusic:false
			});
			app.globalData.g_isPlayingMusic = false;
			app.globalData.g_currentMusicPostId = null;
		});
	},

	onCollectionTap: function (event) {
		var postsCollected = wx.getStorageSync('collection_key');
		var postCollected = postsCollected[this.data.currentPostId];
		//收藏变成未收藏
		postCollected = !postCollected;
		postsCollected[this.data.currentPostId] = postCollected;
		this.showToast(postsCollected, postCollected)
	},

	showToast: function (postsCollected, postCollected) {

		//更新文章是否收藏的缓存值
		wx.setStorageSync('collection_key', postsCollected);
		//更新数据绑定，从而实现图片切换
		this.setData({
			collected: postCollected
		});
		wx.showToast({
			title: postCollected ? "收藏成功" : "取消收藏",
			duration: 1000
		})
	},

	onShareTap: function (event) {
		var itemList = [
			"分享到微信好友",
			"分享到朋友圈",
			"分享到QQ",
			"分享到微博"
		];
		wx.showActionSheet({
			itemList: itemList,
			itemColor: "#FF8888",
			success: function (res) {
				//res.tapIndex   用户点击的数组元素的序号
			}
		})
	},

	onMusicTap: function (event) {
		var currentPostId = this.data.currentPostId;
		var postData=postsData.postList[currentPostId];
		var isPlayingMusic=this.data.isPlayingMusic;

		if (isPlayingMusic) {
			wx.pauseBackgroundAudio();
			this.setData({
				isPlayingMusic: false
			})
		} else {
			wx.playBackgroundAudio({
				dataUrl: postData.music.url,
				title:postData.music.title
			});
			this.setData({
				isPlayingMusic:true
			})
		}

	}

})