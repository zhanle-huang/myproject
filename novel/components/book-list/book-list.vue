<template>
	<view class="container" >
		<navigator :url="'/pages/book/book?id='+item.id" hover-class="navigator-hover" v-for="item in bookListData" :key="item.id">
			<view class="bookList">
				<view class="left">
					<img :src="item.imgSrc" alt="">
				</view>
				<view class="right">
					<view class="top">
						<h5 class="bl-title">{{ item.name }}</h5>
						<p><span class="score">{{ item.score }}</span><span class="score1">分</span></p>
					</view>
					<view class="middle">
						<p>{{ item.bookDesc }}</p>
					</view> 
					<view class="bottom">
						<p>爽文 · {{ item.categoryName }} · {{ statusToText(item.status)}} · {{ item.total/10000 | formatNumber }}万字</p>
					</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		name: 'bookList',
		props: {
			bookListData: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		data() {
			return {
			};
		},
		methods: {
			statusToText(status) {
				switch(status) {
					case 0: 
						return '完结';
					case 1:
						return '连载中';
					case 2:
						return '停更';
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	h3 {
		font-family: inherit;
	}
	.container {
		// width: 100%;
		padding: 30rpx 0rpx;
		padding-bottom: 20rpx;
		// uni-navigator {
		// 	margin-bottom: 30rpx;
			
		// }
	}
	.bookList {
		display: flex;
		justify-content: flex-start;
		padding: 26rpx;
		.left {
			margin-right: 30rpx;
			img {
				width: 150rpx;
				height: 194rpx;
				border-radius: 10rpx;
			}
		}
		.right {
			width: 450rpx;
			.top {
				display: flex;
				justify-content: space-between;
				margin-bottom: 18rpx;
				h5 {
					font-weight: normal;
				}
				p {
					display: flex;
					justify-content: flex-start;
					line-height: 34rpx;
					
					span.score {
						font-size: 34rpx;
						font-weight: 600;
						color: #F86B45;
						margin-right: 12rpx;
					}
					span.score1 {
						font-size: 24rpx;
						color: #F86B45;
					}
					
					
				}
			}
			.middle {
				margin-bottom: 18rpx;
				p {
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					padding-right: 8rpx;
					letter-spacing: 2rpx;
					font-size: 28rpx;
					line-height: 40rpx;
					color: #999999;
				}
			}
			.bottom {
				p {
					font-size: 24rpx;
					color: #999999;
					
				}
			}
		}
	}

	.bookList:active {
		// background-color: #007AFF;
		transform: scale(.9, .9);
	}

</style>
