Page({
	data: {
		userInfo: {
			userUrl:"",
			nickName: "未登录"
		},
		actionText: "登录",
		btnType: "primary"
	},
	onLoad() {
		// var value = wx.getStorageSync("userInfo");
		// if(value) {
		// 	this.setData({
		// 		userInfo: {
		// 			userUrl: value.userInfo.userUrl,
		// 			nickName: value.userInfo.nickName
		// 		},
		// 		actionText: value.actionText,
		// 		btnType: value.btnType
		// 	});
		// }
		wx.getStorage({
			key: "userInfo",
			success: (res) => {
				this.setData({
					userInfo: {
						userUrl: res.data.userInfo.userUrl,
						nickName: res.data.userInfo.nickName
					},
					actionText: res.data.actionText,
					btnType: res.data.btnType
				});
			}
		});
	},
	login() {
		if(this.data.actionText === "登录") {
			// 未登录的状态，需要获取信息。
			// 获取登录凭证
			wx.login({
				success:(res) => {
					if(res.code) { //获取登录凭证，然后可以通过wx.getUserInfo获取用户信息。
						wx.getUserInfo({
							success:(res) => {
								console.log(res.userInfo);
								let avatarUrl = res.userInfo.avatarUrl;
								let nickName = res.userInfo.nickName;
								this.setData({
									userInfo: {
										userUrl:avatarUrl,
										nickName: nickName
									},
									actionText: "退出登录",
									btnType: "warn"
								});
								// 这个信息应该存储起来，下一次登录的时候检测一下，有没有这个信息，有的话，就直接登录了。
								// 存储信息
								// 登录的时候检测一下，如果有storage，说明登录过了。把相应的信息填里面去就可以了
								wx.setStorage({
									key: "userInfo",
									data: {
										userInfo: {
											userUrl:avatarUrl,
											nickName: nickName
										},
										actionText: "退出登录",
										btnType: "warn"
									},
									success() {

									}
								});
							}
						});
					}else {
						console.log("登录失败！" + res.errMsg);
					}
				}
			});
		}else {
			// 退出登录，把数据给替换回来，并且把storage给删了，因为退出登录，下次再进就不让他再登录。
			// 退出登录了，下次就不让他再登录了。所以删除storage
			this.setData({
				userInfo: {
					userUrl:"",
					nickName: "未登录"
				},
				actionText: "登录",
				btnType: "primary"
			});
			wx.removeStorage({
				key: "userInfo"
			});
		}
	},
	moveToWallet() {
		wx.navigateTo({
			url: "../wallet/index"
		})
	}
});