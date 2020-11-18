<template>
	<view class="container">
		<navigator hover-class="navigator-hover" :url="'/pages/book/book?id='+item.id"  v-for="item in nameListData" :key="item.id">
			<view class="content">
				<view class="left">
					<img :src="item.imgSrc" alt="">
					<span class=""></span>
				</view>
				<view class="info">
					<h5>{{ item.name }}</h5>
					<p>{{ item.readNum }}人气</p>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		props: {
			nameListData: {
				String: [],
				default() {
					return [];
				}
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
	.container {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 26rpx;
		.content {
			width: 330rpx;
			display: flex;
			justify-content: flex-start;
			// margin-bottom: 30rpx;
			padding: 10rpx;
			.left {
				margin-right: 24rpx;
				img {
					width: 140rpx;
					height: 189rpx;
					border-radius: 10rpx;
				}
			}
			.info {
				// position: relative;
				h5 {
					font-weight: 400;
					font-size: 30rpx;
					margin-top: 16rpx;
				}
				p {
					width: 140rpx;
					color: #F76139;
					font-size: 22rpx;
					font-weight: 500;
					// position: absolute;
					margin-top: 80rpx;
				}
			}
		}
		.content:hover {
			transform: scale(0.9, 0.9);
		}
	}
</style>
