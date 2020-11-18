<template>
	<view class="cardBox">
		<view class="cardContent">
			<view class="top">
				<h3>{{ title }}</h3>
				<p v-if="tipsFlag" @click="tipHandle()"><span>{{ tip }}</span><span :class="icon"></span></p>
			</view>
			<view class="bottom">
				<!-- 插入需要放置的内容 -->
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			tip: {
				type: String,
				default: ''
			},
			icon: {
				type: String,
				default: ''
			},
			tipsFlag: {
				type: Boolean,
				default: false
			},
			tipHandle: {  //tips方法
				type: Function,
				default: null
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.cardBox {
		width: 100%;
		background-color: #F8F8FF;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 1rpx #C8C7CC;
		margin-bottom: 34rpx;
		margin-top: 20rpx;
		.cardContent {
			padding: 36rpx 0;
			padding-bottom: 0;
			.top {
				display: flex;
				justify-content: space-between;
				margin-bottom: 18rpx;
				padding: 0 26rpx;
				h3 {
					font-family: "楷体","楷体_GB2312",sans-serif;
					font-size: 42rpx;
				}
				p {
					span:nth-child(1) {
						font-size: 26rpx;
						margin-right: 12rpx;
					}
					span:nth-child(2) {
						font-size: 22rpx;
					}
				}
			}
			.bottom {
				
			}
		}
	}
</style>
