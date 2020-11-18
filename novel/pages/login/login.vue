<template>
	<view>
		<view class="login-item">
			<view class="item-title">账号：</view>
			<input class="login-input" type="text" v-model="loginInfo.userId"/>
		</view>
		<view class="login-item">
			<view class="item-title">密码：</view>
			<input class="login-input" password  type="text" v-model="loginInfo.pwd"/>
		</view>
		<view class="loginCrtol">
			<view class="login-box">
				<button class="btn" size="mini" type="primary" @click="loginIn">登录</button>
			</view>
			<navigator url="../register/register">
				<button class="btn" size="mini" type="primary">注册</button>
			</navigator>
		</view>
	</view>
</template>

<script>
	import Req from '../../common/req.js';
	export default {
		data() {
			return {
				loginInfo: {
					userId: '',
					pwd: ''
				}
			};
		},
		methods: {
			loginIn() {
				console.log(this.loginInfo)
				Req.post('/reader/login',this.loginInfo, res => {
					console.log(res.data)
					uni.setStorage({
						key: 'userId',
						data: res.data.userId
					})
					uni.setStorage({
						key: 'token',
						data: res.data.token
					})
					uni.setStorage({
						key: 'userName',
						data: res.data.name
					})
					if(res.data) {
						uni.switchTab({
							url: '/pages/index/index'
						})
					} else {
						uni.showToast({
							title: '账号或密码错误',
							duration: 800
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #fff;
		padding-top: 30rpx;
	}
	.login-item {
		padding: 15rpx 30rpx;
	}
	.item-title {
		font-size: 32rpx;
		color: #555555;
	}
	.login-input {
		border: 1px solid #C0C0C0;
		padding: 20rpx 10rpx;
		border-radius: 12rpx;
		margin-top: 10rpx;
		color: #808080;
		font-size: 35rpx;
		font-weight: 400;
	}
	.loginCrtol {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
		.login-box {
			margin-right: 130rpx;
		}
		.btn {
			background-color: #FFDE00;
		}
	}
</style>
