Page({
	data: {
		password: 2234,
		time: 9
	},
	onLoad(options) {
		console.log(options);
		this.setData({
			password: options.password
		});
		let time = 9;
		let timer = setInterval(() =>{
			this.setData({
				time: --time
			});
			if(time <= 0) {
				clearInterval(timer);
				wx.redirectTo({
					url: "../billing/index?number=" + options.number
				});
			}
		},1000);
	},
	backToIndex() {
		wx.redirectTo({
			url: "/pages/index/index"
		});
	}
});