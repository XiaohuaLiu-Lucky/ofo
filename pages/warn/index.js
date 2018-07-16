// 报障页面，让用户去选择一些信息，假如选择了轮胎坏了，车锁坏了。选择了几张照片，而且写了一些车牌号的信息，还写了一些备注的信息，点击提交之后应该把这些信息都传送给后台，所以我们应该把这些故障类型，图片，车牌号，备注都保存下来。提交的时候给提交到后台。
// checkboxValues最开始是一个空数组，如果用户选择了故障类型，就会向这个数组里面添加信息，然后发送给后台。
Page({
	data: {
		itemsValue: [
			{
				value: "私锁私用",
				checked: false,
				color: "#b9dd08"
			},
			{
				value: "车牌缺陷",
				checked: false,
				color: "#b9dd08"
			},
			{
				value: "轮胎坏了",
				checked: false,
				color: "#b9dd08"
			},
			{
				value: "车锁坏了",
				checked: false,
				color: "#b9dd08"
			},
			{
				value: "违规乱停",
				checked: false,
				color: "#b9dd08"
			},
			{
				value: "密码不对",
				checked: false,
				color: "#b9dd08"
			},
			{
				value: "刹车坏了",
				checked: false,
				color: "#b9dd08"
			},
			{
				value: "其他故障",
				checked: false,
				color: "#b9dd08"
			}
		],
		picUrls:[],
		checkboxValues:[],
		btnColor: "#f2f2f2",
		disabled: true,
		actionText: "拍摄/相册",
		fontSize: "26rpx",
		inputValue: {
			number: 0,
			desc: ""
		},
		finalTroubleType: null
	},
	onLoad() {

	},
	bindChangeCheckbox(e) {
		let _value = e.detail.value;
		console.log(_value);
		if(_value.length === 0) {
			// 等于0则提交按钮置成灰色，不等于0则是选了一些信息则置成有绿色。
			this.setData({
				btnColor: "#f2f2f2",
				checkboxValues: []
			});
		}else {
			this.setData({
				disabled: false,
				btnColor: "#b9dd08",
				checkboxValues: _value
			});
		}
	},
	// 点击照相
	clickPhoto() {
		// 微信选择图片的接口
		wx.chooseImage({
			success:(res) => {
				let _tfs = res.tempFilePaths;
				let _picUrls = this.data.picUrls;
				// for/of是ES6的语法
				for(let temp of _tfs) {
					_picUrls.push(temp);
				}
				// 拍摄照片如果有照片的话，让他变成一个加号，就不是一个拍摄/相册了。
				this.setData({
					picUrls: _picUrls,
					fontSize: "60rpx",
					actionText: "+"
				});
			}
		});
	},
	// 删除图片
	bindDelPic(e) {
		let index = e.target.dataset.index;
		let _picUrls = this.data.picUrls;
		// 数组的方法index是剪切的起始位置，长度为1就是指减1位，改变原数组。
		// 数组的截取方法：从index开始截取一个。
		_picUrls.splice(index,1);
		if(_picUrls.length === 0) {
			this.setData({
				picUrls: _picUrls,
				fontSize: "26rpx",
				actionText: "拍摄/相册"
			});
		}else {
			this.setData({
				picUrls: _picUrls
			});
		}
		
	},
	changeInput(e) {
		var _info = e.target.dataset.info;
		let _value = e.detail.value;
		if(_info === "number") {
			this.setData({
				"inputValue.number": _value
			});
		}else if(_info === "desc") {
			this.setData({
				"inputValue.desc": _value
			});
		}
		
		console.log(this.data.inputValue);
	},
	// changeDesc(e) {
	// 	let _value = e.detail.value;
	// 	this.setData({
	// 		"inputValue.desc": _value
	// 	})
	// 	console.log(e);
	// },
	// 判断一下：故障类型和照片是必须要有的，有这两个信息才方便师傅去维修小车，故障类型可以知道要带什么工具。
	submit() {
		if(this.data.checkboxValues.length > 0 && this.data.picUrls.length > 0 ) {//说明用户选完了，可以发送ajax请求，把这些数据传送给后台。
			// 只有一个信息：提交成功，模拟的接口，它无法处理你这些数据，所以就写了一个假数据，告诉他提交成功就可以了。
			wx.request({
				url: "https://www.easy-mock.com/mock/5ad8235cc889836064a0626b/ofo/submitSuccess",
				// 正常的话应该一些东西，POST请求。然后传一些数据到后台，后台解析成功才会返回给我们提交成功，但是这里没有一个后台的处理能力，所以这里就不写了，直接一个get请求去发送一个假接口的数据就可以了。
				// method: "POST",
				// data: { //传送数据
				// 	checkboxValues:this.data.checkboxValues,
				// 	picUrls: this.data.picUrls,
				// 	inputValue:this.data.inputValue,
				// }
				success:(res) => {
					// 告诉用户提交成功了，用微信的提示框。
					console.log(res.data.data.msg);
					wx.showToast({
						title: "提交成功",
						icon: "success",
						duration: 2000
					});
				}
			});
		}else { //用户信息填的不完全。给一些用户的提示。模拟弹窗有一个确定和取消
			wx.showModal({
				title: "请填写完整的反馈信息",
				content: "你瞅啥，快去填",
				cancelText: "劳资不填",
				confirmText: "认怂我填",
				success:(res) => {
					console.log(res);
					if(res.confirm) { //'用户点击确定'
						console.log('我填')
					}else if(res.cancel) { //'用户点击取消'
						console.log("劳资不填");
						// 不想填，回到首页
						wx.navigateBack({
							detail: 1
						});
					}
				}
			});
		}
	}
});