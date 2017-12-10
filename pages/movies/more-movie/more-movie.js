// pages/movies/more-movie/more-movie.js

var util = require('../../../utils/utils.js');
var app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		navigateTitle: "",
		movies: {},
		requestUrl:"",
		totalCount:0,
		isEmpty:true,
		httpLock:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var category = options.category;
		this.data.navigateTitle = category;
		var dataUrl = "";
		switch (category) {
			case "正在热映":
				dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
				break;
			case "即将上映":
				dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
				break;
			case "豆瓣Top250":
				dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
				break;
		}
		this.data.requestUrl = dataUrl;
		util.http(dataUrl, this.postDoubanData);
	},

	onScrollLower: function (event) {
		var nextUrl=this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
		if(!this.data.httpLock){
			this.data.httpLock=true;
			util.http(nextUrl, this.postDoubanData);
		}
	},

	postDoubanData: function (doubanMovies) {
		var movies = [];
		for (var idx in doubanMovies.subjects) {
			var subject = doubanMovies.subjects[idx];
			var title = subject.title;
			if (title.length >= 6) {
				title = title.substring(0, 6) + "...";
			}
			var temp = {
				stars: util.convertToStarsArray(subject.rating.stars),
				title: title,
				average: subject.rating.average,
				coverageUrl: subject.images.large,
				movieId: subject.id
			};
			movies.push(temp);
		}
		var totalMovies = [];
		if(!this.data.isEmpty){
			totalMovies =this.data.movies.concat(movies);
		}else{
			totalMovies = movies;
			this.data.isEmpty = false;
		}
		this.setData({
			movies: totalMovies
		})
		this.data.totalCount += 20;
		this.data.httpLock=false;
	},

	onReady: function (event) {
		wx.setNavigationBarTitle({
			title: this.data.navigateTitle,
		})
	}


})