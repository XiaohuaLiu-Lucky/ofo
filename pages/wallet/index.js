Page({
	data: {
		money: 0,
		ticket: 0
	},
	onShow() {
		wx.getStorage({
			key: "overage",
			success:(res) => {
				this.setData({
					money: res.data
				});
			}
		});
	},
	moveToCharge() {
		wx.navigateTo({
			url: "../charge/index"
		});
	}
});