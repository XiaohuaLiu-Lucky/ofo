var data = require("../../data/data.js");
console.log(data);
Page({
	data: {
		ride: false,
		longitude: null,
		latitude: null,
		markers: [{
			id: 1,
			iconPath: "/images/markers.png",
			latitude: 30.5708,
			longitude: 104.0630,
			width: 30,
			height: 30
		},{
			id: 2,
			iconPath: "/images/markers.png",
			latitude: 30.5700,
			longitude: 104.0640,
			width: 30,
			height: 30
		},{
			id: 3,
			iconPath: "/images/markers.png",
			latitude: 30.56837,
			longitude: 104.06042555,
			width: 30,
			height: 30
		},{
			id: 4,
			iconPath: "/images/markers.png",
			latitude: 30.573266834507674,
			longitude: 104.0646312539673,
			width: 30,
			height: 30
		},{
			id: 5,
			iconPath: "/images/markers.png",
			latitude: 30.570384751811627,
			longitude: 104.06660535980227,
			width: 30,
			height: 30
		},{
			id: 6,
			iconPath: "/images/markers.png",
			latitude: 30.56757648629863,
			longitude: 104.06448105026247 ,
			width: 30,
			height: 30
		},{
			id: 7,
			iconPath: "/images/markers.png",
			latitude: 30.566708124585322,
			longitude: 104.06124094177248,
			width: 30,
			height: 30
		}]
	},
	createMarkers() {
		let markers = [];
		for(let i = 8; i < 10 ; i++) {
			markers.push({
				id: i,
				iconPath: "/images/markers.png",
				latitude: 30.5 + Math.random() / 10,
				longitude: 104.06 + Math.random() / 100,
				width: 30,
				height: 30
			});
		}
		console.log(markers);
		this.data.markers.push(...markers);
		this.setData({
			markers: this.data.markers
		});
		console.log(this.data.markers);
	},
	onLoad(options) {
		this.getMyLocation();
		this.getMySystemInfo();
		if(options.ride) {
			this.setData({
				ride: options.ride
			});
		}
	},
	getMyLocation() {
		wx.getLocation({
			type: "gcj02",
			success:(res)=> {
				this.setData({
					longitude:res.longitude,
					latitude:res.latitude
				});
				console.log(res);
			},
			fail() {
				console.log("获取地理位置失败");
			}
		});
	},
	getMySystemInfo() {
		wx.getSystemInfo({
			success:(res) => {
				let screenW = res.windowWidth;
				let	screenH =  res.windowHeight;
				this.setData({
					controls: [{
						id: 1,
						iconPath: "/images/location.png",
						clickable: true,
						position: {
							left: 20,
							top: screenH - 80,
							width: 50,
							height: 50
						}
					},{
						id: 2,
						iconPath: "/images/use.png",
						clickable: true,
						position: {
							left: screenW / 2 - 45,
							top: screenH - 100,
							width: 90,
							height: 90
						}
					},{
						id: 3,
						iconPath: "/images/warn.png",
						clickable: true,
						position: {
							left: screenW - 70,
							top: screenH - 80,
							width: 50,
							height: 50
						}
					},{
						id: 4,
						iconPath: "/images/avatar.png",
						clickable: true,
						position: {
							left: screenW - 70,
							top: screenH - 160,
							width: 50,
							height: 50
						}
					},{
						id: 5,
						iconPath: "/images/marker.png",
						position: {
							left: screenW / 2 - 15.5,
							top: screenH / 2 - 48,
							width: 31,
							height: 48
						}
					}],	
				});
				console.log(this);
			},
			fail() {
				console.log("获取系统信息失败");
			}
		});
	},
	bindControlTap(res) {
		console.log(res.controlId);
		switch(res.controlId) {
			case 1 : 
				this.moveToCenter();
				// this.mapCtx.getCenterLocation({
				// 	success(res) {
				// 		console.log(res.longitude,res.latitude);
				// 	}
				// });
			break;
			// 点击立即用车出现扫码的功能
			// 读取二维码的信息，然后往后台去发送一些数据，获取一个密码就可以了。
			case 2 : 
				if(this.data.ride) {
					wx.navigateBack({
						delta: 1
					});
				}else {
					wx.scanCode({
						onlyFromCamera: false,
						success:(res) => {
							wx.showLoading({
								title: "正在获取密码"
							});
							wx.request({
								url: "https://www.easy-mock.com/mock/5ad8235cc889836064a0626b/ofo/password",
								method: "GET",
								header: {
									"content-type": "application/json"
								},
								success(res) {
									// 获取密码成功就要跳转页面了，告诉密码是多少，多少秒之后开始计时。
									let password = res.data.password;
									let number = res.data.number;
									wx.hideLoading();
									wx.redirectTo({
										url: "/pages/scanResult/index?password=" + password + "&number=" + number,
										success() {
											wx.showToast({
												title: "获取密码成功",
												icon: "success",
												duration: 2000,
												mask: true
											});
										},
										fail() {
											console.log("页面跳转失败");
										}
									});
								}
							});
						},
						fail() {
							consle.log("扫码失败");
						}
					});
				}
			break;
			// 点击报障
			case 3: 
				wx.navigateTo({
					url: "/pages/warn/index"
				});
			break;
			// 点击跳转到个人中心
			case 4: 
				wx.navigateTo({
					url: "../my/index"
				});
			break;
		}
	},
	onShow() {
		this.mapCtx = wx.createMapContext('ofo-map');
		this.moveToCenter();
		console.log('onShow');
	},
	// 回到当前的位置
	moveToCenter() {
		this.mapCtx.moveToLocation();
	},
	onReady() {
		console.log('onReady');
	},
	onHide() {
		console.log('onHide');
	},
	onUnload() {
		console.log('onUnload');
	}
});