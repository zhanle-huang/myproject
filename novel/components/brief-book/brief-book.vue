<template>
	<view class="brief">
			<view class="list" v-for="item in briefListData" :key="item.id">
				<navigator :url="'/pages/book/book?id='+item.id" hover-class="navigator-hover">
					<img :src="item.imgSrc" alt="">
					<p>{{ item.name }}</p>
				</navigator>
			</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			briefListData: {
				type: Array,
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

<style scoped lang="less">
	.brief {
		display: flex;
		justify-content: flex-start;
		padding: 0 26rpx;
		.list {
			width: 150rpx;
			margin-right: 22rpx;
			margin-bottom: 32rpx;
			img {
				width: 100%;
				height: 194rpx;
				border-radius: 10rpx;
			}
			p {
				font-size: 26rpx;
			}
			&:nth-child(4) {
				margin-right: 0;
			}
		}
	}
</style>
