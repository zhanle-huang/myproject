<template>
	<view class="content_card">
		<view class="top">
			<view class="top_tip">
				{{ tip1 }}
			</view>
			<view class="top_content">
				<view class="content_active" v-for="item in categoryTop" :key="item.categoryId">
					<navigator :url="'/pages/novelKind/novelKind?categoryId='+item.categoryId" hover-class="navigator-hover">
						<span>{{ item.name }}</span>
						<!-- <img :src="item.imgSrc" alt=""> -->
					</navigator>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="top_tip">
				{{ tip2 }}
			</view>
			<view class="bottom_content">
				<view class="content_active" v-for="item in categoryBottom" :key="item.categoryId">
					<navigator :url="'/pages/novelKind/novelKind?categoryId='+item.categoryId" hover-class="navigator-hover">
						<span>{{ item.name }}</span>
						<!-- <img :src="item.imgSrc" alt=""> -->
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			categoryTop: {
				type: Array,
				default() {
					return [];
				}
			},
			categoryBottom: {
				type: Array,
				default() {
					return [];
				}
			},
			tip1: {
				type: String,
				default: ''
			},
			tip2: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				categoryData: {
					categoryTop: [],
					categoryBottom: [],
				}
			}
		},
		methods: {
			
		},
		mounted() {
			// setTimeout(()=>{
			// 	console.log(this.categoryList,"接收")
			// 	this.categoryData.categoryTop = this.categoryList.slice(0,2);
			// 	this.categoryData.categoryBottom = this.categoryList.slice(2);
			// }, 1000)
			
			// console.log(this.categoryData)
		}
	}
</script>

<style scoped lang="less">
	.content_card {
		// padding: 30rpx;
		width: 100%;
		.top {
			.top_content {
				margin: 40rpx 0;
				display: flex;
				justify-content: space-between;
				view {
					background-color: #fff;
					width: 240rpx;
					text-align: center;
					border-radius: 10rpx;
					padding-bottom: 28rpx;
					span {
						display: block;
						width: 100%;
						padding: 20rpx 0;
						font-size: 33rpx;
					}
					img {
						width: 170rpx;
						height: 120rpx;
					}
				}
			}

		}
		.bottom {
			
			.bottom_content {
				margin: 40rpx 0;
				display: flex;
				justify-content: space-between;
				flex-direction: row;
				flex-wrap: wrap;
				view {
					width: 150rpx;
					// margin-right: 14rpx;
					text-align: center;
					background-color: #fff;
					border-radius: 10rpx;
					padding-bottom: 28rpx;
					margin-bottom: 28rpx;
					// margin-right: 23rpx;
					span {
						display: block;
						width: 100%;
						padding: 20rpx 0;
						font-size: 30rpx;
					}
					img {
						width: 106rpx;
						height: 76rpx;
					}
				}
				.more {
					text-align: center;
					padding-top: 40rpx;
					span {
						display: inline-block;
						width: 70rpx;
						font-size: 30rpx;
					}
				}
			}
			
		}
	}
	.top_tip {
		display: inline;
		padding: 14rpx 24rpx;
		font-size: 32rpx;
		background-color: #FFD700;
		border-radius: 30rpx 0 30rpx 0;
	}
	.content_active:hover {
		transform: scale(0.9, 0.9);
	}
</style>
