<template>
	<view class="content_list">
		<view class="top_tip">
			{{ tips1 }}
		</view>
		<view class="list_content">
			 <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" ref="scrollView">
			<navigator v-for="item in bookData" :key="item.id" :url="'/pages/book/book?id='+item.id" hover-class="navigator-hover">
			<view class="book_card" >
				
					<img :src="item.imgSrc" alt="">
					<view class="right">
						<view class="r_left">
							<h3>{{ item.name }}</h3>
							<p>{{ item.status===1?'完结':'连载' }} · {{item.total/10000 | formatNumber}}万字</p>
						</view>
						<view class="r_right">
							<span class="num">{{ item.searchNum }}次搜索</span>
							<span class="desc">本周搜索</span>
						</view>
					</view>
				
			</view>
			</navigator>
			 </scroll-view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			bookData: {
				type: Array,
				default () {
					return [];
				}
			},
			tips1: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				scrollTop: 0,
				windowHeight: 0,
			}
		},
		methods: {

		},
		onReady() {
			
		},
		mounted() {
			this.windowHeight = uni.getSystemInfoSync().windowHeight;
			console.log(this.windowHeight)
			const query = uni.createSelectorQuery().in(this);
			
			console.log(query.select('.scroll-Y')._component.$refs.scrollView.$el)
			query.select('.scroll-Y')._component.$refs.scrollView.$el.style.height = this.windowHeight + "px";
			query.select('.scroll-Y').boundingClientRect(data => {
			  console.log("得到布局位置信息" + JSON.stringify(data));
			  console.log("节点离页面顶部的距离为" + data.top);
			}).exec();
		}
	}
</script>

<style scoped lang="less">
	.content_list {
		// padding: 30rpx;
		
		width: 100%;

		.list_content {
			
			.scroll-Y {
				height: 667px;
			}
			border-radius: 10rpx;
			margin: 38rpx 0;
			overflow: hidden;
			.book_card {
				display: flex;
				justify-content: space-between;
				// margin-bottom: 32rpx;
				background-color: #fff;
				padding: 20rpx 16rpx 20rpx 16rpx;
				img {
					width: 130rpx;
					/*#ifdef MP-WEIXIN*/
					width: 160rpx;
					/*#endif*/
					
					/*#ifdef APP-PLUS*/
					width: 130rpx; 
					/*#endif*/
					height: 150rpx;
					border-radius: 10rpx;
					margin-right: 16rpx;
				}

				.right {
					// padding-right: 20rpx;
					width: 570rpx;
					display: flex;
					justify-content: space-between;

					.r_left {
						width: 230rpx;

						h3 {
							// width: 170rpx;
							font-weight: 400;
							font-size: 33rpx;
							word-spacing: 3rpx;
							letter-spacing: 4rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin-top: 14rpx;
						}

						p {
							// width: 400px;
							font-size: 22rpx;
							color: #808080;
							margin-top: 38rpx;
						}
					}
					.r_right {
						padding-top: 40rpx;

						.num {
							text-align: right;
							display: block;
							color: #FF5101;
							font-size: 26rpx;
							margin-bottom: 10rpx;
						}

						.desc {
							display: block;
							text-align: right;
							font-size: 24rpx;
							color: #808080;
						}
					}
				}
			}
			.book_card:active {
				transform: scale(0.95,0.95);
			}
		}
	}

	.top_tip {
		display: inline;
		padding: 14rpx 24rpx;
		font-size: 32rpx;
		background-color: #FFD700;
		border-radius: 30rpx 0 30rpx 0;
		margin: 28rpx 0;
	}
</style>
