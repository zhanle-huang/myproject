<template>
	<view>
		<view class="top">
			<view class="t_left">
				<h3>Hello! {{ myData.userName }}</h3>
				<p>欢迎使用jojo小说</p>
			</view>
			<!-- <view class="t_right">
				<span class="iconfont icon--"></span>
				<span class="iconfont icon-shouji3"></span>
			</view> -->
		</view>
		<view class="info">
			<view class="info_left">
				<span class="num">{{ myData.coin }}</span>
				<span>我的金币</span>
			</view>
			<view class="info_right">
				<span class="num">{{ myData.readTime }} 分钟</span>
				<span>今日阅读</span>
			</view>
		</view>
		<view class="menu">
			
			<view class="vip">
				<navigator url="/pages/vip/vip" hover-class="navigator-hover">
				<span class="iconfont icon-VIP1"></span>
				<span class="desc">VIP</span>
				</navigator>
			</view>
			
			
			<view class="r_card">
				<navigator url="/pages/readcard/readcard" hover-class="navigator-hover">
				<span class="iconfont icon-shijian1"></span>
				<span class="desc">阅读记录</span>
				</navigator>
			</view>
			
			
			<view class="like">  
				<navigator url="/pages/likeread/likeread" hover-class="navigator-hover">
				<span class="iconfont icon-shoucang-copy"></span>
				<span class="desc">阅读口味</span>
				</navigator>
			</view>
			
			
			<view class="setting">
				<navigator url="/pages/setting/setting" hover-class="navigator-hover">
				<span class="iconfont icon--shezhi"></span>
				<span class="desc">设置</span>
					</navigator>
			</view>
		
		</view>
		<view class="footer_list">
			<!-- <view>
				<navigator class="n_link" url="#" hover-class="navigator-hover">
					
					<span><view class="line"></view>意见反馈</span><span class="iconfont icon-xiangyou1"></span>
				</navigator>
			</view> -->
			<!-- <view>
				<navigator class="n_link" url="#" hover-class="navigator-hover">
					
					<span><view class="line"></view>检查更新</span><span class="iconfont icon-xiangyou1"></span>
				</navigator>
			</view> -->
			<view v-if="myData.userName === ''">
				<navigator class="n_link" url="../login/login" hover-class="navigator-hover">
					
					<span><view class="line"></view>登录</span><span class="iconfont icon-xiangyou1"></span>
				</navigator>
				<navigator class="n_link" url="../register/register" hover-class="navigator-hover">
					
					<span><view class="line"></view>注册</span><span class="iconfont icon-xiangyou1"></span>
				</navigator>
			</view>
			<view v-else>	
				<view class="n_link" @click="exitLogin">
					<span><view class="line"></view>退出</span><span class="iconfont icon-xiangyou1"></span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myData: {
					coin: '0',
					userName: '',
					readTime: '0'
				}
			}
		},
		methods: {
			getUserName() {
				var _this = this;
				uni.getStorage({
					key: 'userName',
					success: res => {
						console.log(res.data)
						_this.myData.userName = res.data;
					},
					fail: res => {
						_this.myData.userName = '';
					}
				})
			},
			exitLogin() {
				uni.removeStorage({
					key: 'userId'
				})
				uni.removeStorage({
					key: 'userName',
					success: res => {
						this.getUserName();
					}
				})
				uni.removeStorage({
					key: 'token'
				})
				this.getUserName();
			}
		},
		onShow() {
			this.getUserName();
			console.log("s")
		},
		mounted() {
		}
	}
</script>

<style scoped lang="less">
	page {
		padding: 20rpx 30rpx;
		letter-spacing: 2rpx;
		word-spacing: 2rpx;
		background-color: #F7F7F7;
	}
	.top {
		display: flex;
		justify-content: space-between;
		.t_left {
			padding: 20rpx;
			h3 {
				font-size: 36rpx;
			}
			p {
				font-size: 34rpx;
				
				font-weight: 500;
			}
		}
		.t_right {
			line-height: 130rpx;
			span {
				background-color: #fff;
				padding: 18rpx;
				font-size: 52rpx;
				border-radius: 50%;
				margin-right: 40rpx;
			}
			.icon-- {
				color: #4CD964;
			}
			.icon-shouji3 {
				color: #FFA829;
			}
		}
	}
	.info {
		padding: 50rpx 110rpx;
		display: flex;
		justify-content: space-between;
		.info_left ,
		.info_right {
			text-align: center;
			span {
				display: block;
				font-size: 28rpx;
				color: #999999;
				padding: 10rpx 0;
			}
			.num {
				// font-size: 34rpx;
				color: #333333;
				font-weight: 700;
				letter-spacing: -4rpx;
				line-height: 40rpx;
			}
		}
		.info_right {
			.num {
				
			}
		}
	}
	.menu {
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		border-radius: 20rpx;
		padding: 20rpx ;
		margin: 30rpx 0;
		>view {
			width: 150rpx;
			span {
				display: block;
				padding: 10rpx 0;
				text-align: center;
			}
			.iconfont {
				font-size: 50rpx;
				color: #FFD014;
			}
			.desc {
				font-size: 24rpx;
				color: #999999;
			}
		}
	}
	.footer_list {
		border-radius: 20rpx;
		overflow: hidden;
		margin: 30rpx 0;
		>view {
			background-color: #fff;
			margin-bottom: 1px;
			.n_link {
				padding: 26rpx 14rpx 26rpx 30rpx;
				display: flex;
				justify-content: space-between;
				span {
					display: flex;
					justify-content: space-between;
					font-size: 32rpx;
					// padding: 0 20rpx;
					// border-left: 2px solid #FFD014;
					.line {
						height: 24rpx;
						width: 0;
						border-left: 7rpx solid #FFD014;
						margin-top: 10rpx;
						margin-right: 22rpx;
					}
				}
				.iconfont {
					color: #999999;
					border: none;
				}
			}
		}
		
	}
</style>
