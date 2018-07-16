//微信小程序是单向的数据绑定：js里面数据改变了可以影响视图的渲染。反过来呢，视图层的数据变了不会影响到js里面的数据。
// 以后学的vue和react，angular都是双向的数据绑定。也就是视图层面的变化可以改变js里面的data的变化。
Page({
	data: {
		number: 29839,
		h: 0,
		m: 0,
		s: 0,
		disabled: false,
		actionText: "正在计费"
	},
	onLoad(options) {
		this.setData({
			number: options.number
		});
		this.timer = setInterval(() => {
			this.setData({
				s: this.data.s + 1
			});
			if(this.data.s >= 59) {
				if(this.data.m + 1 >= 60) {
					setTimeout(() => {
						this.setData({
							h: this.data.h + 1,
							m: 0,
							s: 0
						})
					},1000);
				}else {
					setTimeout(() => {
						this.setData({
							m: this.data.m + 1,
							s: 0
						});
					},1000);
				}
			}
		},1000);
	},
	endRide() {
		clearInterval(this.timer);
		this.setData({
			disabled: true,
			actionText: "本次骑行时间"
		});
	},
	// 回到地图有两个逻辑，第一个是正在骑行的时候回到地图，应该把这个计费页面挂载到后台去运行，计费页面不能停止。
	// 第二个是如果你点击了结束骑行，我们再回到地图就是真的跳转到首页了，计费页面就销毁了。
	// 栈
	navigateToIndex() {
		// 没有结束骑行
		if(!this.data.disabled) {
			wx.navigateTo({
				url: "/pages/index/index?ride="+ !this.data.ride
			});
		}else { //结束骑行
			wx.redirectTo({
				url: "/pages/index/index"
			});
		}
	}
	
	
});