Page({
	data: {
		money: 0,
	},
	input(e) {
		console.log(e.detail.value);
		this.setData({
			money: e.detail.value
		});
	},
	change() {
		if(this.data.money <=0 || isNaN(this.data.money)) {
			wx.showModal({
				title: "充值失败",
				icon: "",
				content: "是不是我还要给你点钱"
			});
		}else {
			let overage = wx.getStorageSync("overage");
			let _data = null;
			if(overage) {
				_data = parseInt(this.data.money) + parseInt(overage);
			}else {
				_data = this.data.money;
			}
			wx.setStorage({
				key: "overage",
				data: _data
			});
			// wx.getStorage({
			// 	key: "overage",
			// 	success: (res) => {
			// 		console.log(res);
			// 		wx.setStorage({
			// 			key: "overage",
			// 			data: parseInt(this.data.money) + parseInt(res.data)
			// 		});
			// 	},
			// 	fail: () => {
			// 		wx.setStorage({
			// 			key: "overage",
			// 			data: this.data.money
			// 		});
			// 	}
			// });
			wx.navigateBack({
				delta: 1
			});
		}
	}
});