<template>
	<view class="setting-container" ref="setting">
		<view class="setting">
			<view class="settint-font">
				<span class="title">字号</span> <p><span @click="changeFontSize(-6)">A-</span><span class="font-fize" ref="fontSize">{{fontSize}}</span><span @click="changeFontSize(6)">A+</span></p>
			</view>
			<view class="background">
				<span class="title">背景</span> 
				<p>
					<view v-for="(item,index) in backgroudColor" :key="index" :class="activeColor === index ? '': 'active'">
						<span :style="'background-color: '+item + ';'" @click="changebackground(index)"></span>
					</view>
				</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backgroudColor: [   //北京色
					'#E6DFBD',
					'#4EEE94',
					'#FFF0F5',
					'#40E0D0',
					'#EED8AE'
				],
				fontSize: 40,  //字体大小
				activeColor: 0,   //选中的颜色下标
			};
		},
		methods: {
			changeFontSize(num) {		//改变字体
				this.fontSize += num;
				if(this.fontSize <= 28 || this.fontSize >= 70) {
					this.fontSize -= num;
					return;
				}
				console.log(this.$refs.fontSize)
				this.$refs.fontSize.style.fontSize = this.fontSize/2 + "px";
				uni.setStorage({
					key: 'fontSize',
					data: this.fontSize
				})
			},
			colorActive(index) {   //选中背景色
				return this.activeColor === index ? '': 'active';
				
			},
			changeDayNight() {  //切换白天和夜间
				
			},
			changebackground(index) {  //更换背景
				this.activeColor = index;
				uni.setStorage({
					key: 'backgroundColor',
					data: this.backgroudColor[index]
				})
			},
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.$nextTick(function(){
						this.$refs.setting.$el.style.height = res.screenHeight + "px";
					})
				}
			})
			//获取字体大小
			uni.getStorage({
				key: 'fontSize',
				success: res => {
					this.fontSize = parseInt(res.data);
					this.$nextTick(function(){
						this.$refs.fontSize.style.fontSize = this.fontSize/2 + "px";
					})
				},
				fail: () => {
					uni.setStorage({
						key: 'fontSize',
						data: '40'
					})
				}
			})
			//获取背景色
			uni.getStorage({
				key: 'backgroundColor',
				success: res => {
					for(var i = 0; i<this.backgroudColor.length; i++) {
						if(this.backgroudColor[i] === res.data) {
							this.activeColor = i;
							break;
						}
					}
				},
				fail: () => {
					uni.setStorage({
						key: 'backgroundColor',
						data: this.backgroudColor[0]
					})
				}
			})
		}
	}
</script>

<style lang="less">
	.setting-container {
		padding-top: 30rpx;
		padding-left: 50rpx;
		background-color: #fff;
		.setting {
			.settint-font {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 20rpx 0;
				height: 120rpx;
				p {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					span {
						height: 100%;
						border: 2rpx solid #fff;
						padding: 8rpx 40rpx;
						border-radius: 50rpx;
					}
					.font-fize {
						width: 130rpx;
						border: none;
						color: #C0C0C0;
					}
				}
			}
			.background {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				p {
					display: flex;
					justify-content: center;
					align-items: center;
					view {
						padding: 6rpx;
						margin-right: 35rpx;
						border: 2rpx solid #333333;
						border-radius: 50%;
						span {
							display: block;
							padding: 30rpx;
		
							border-radius: 50%;
						}
					}
					view.active {
						border: 2rpx solid #fff;
					}
				}
			}
			.title {
				font-size: 34rpx;
				margin-right: 30rpx;
			}
		}
	}
</style>
