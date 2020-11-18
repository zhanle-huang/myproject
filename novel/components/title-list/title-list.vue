<template>
	<view class="title_list_box">
		<view class="topTips">
			<p>
				<span class="status">{{ statusText(bookData.status)}}</span>
				<span class="total">共{{ titleListData.length }}章</span>
				<span class="new_novel">{{ getTimeNew() }}更新</span>
			</p>
			<p>
				<span class="iconfont icon-shunxu"></span><span class="order" @click="changeOrder">倒序</span>
			</p>
		</view>
		<view class="title_list_content">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scroll="scroll" ref="scrollView">
				<view v-for="item in titleListData" :key="item.id">
					<navigator :url="'/pages/details/details?bookId='+bookData.id+'&chapterNum='+item.chapterNum">{{ item.title }}</navigator>
				</view>
				
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import Util from '../../common/util.js';
	export default {
		props: {
			bookData: {
				type: Object,
				default: null
			},
			titleListData: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {
				scrollTop: 0,
			};
		},
		methods: {
			scroll() {   //scroll-view的滚动事件
			},
			statusText(status) {  //状态的中文形式
				return Util.statusToText(status)
			},
			changeOrder() {	//改变顺序
				this.titleListData = this.titleListData.reverse();
			},
			getTimeNew() {
				if(this.titleListData.length > 0) {
					return Util.formatDate(this.titleListData[this.titleListData.length-1].time);
				}
				
				
			}
		},
		mounted() {
			
		}
	}
</script>

<style lang="less">
	.title_list_box {
		padding: 30rpx 0;
	}
	.topTips {
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
		span {
			margin-right: 8rpx;
			font-size: 24rpx;
			color: #757474;
			font-weight: 100;
			word-spacing: 1rpx;
			letter-spacing: 1rpx;
			padding: 12rpx 0;
		}
		.order {
			color: #171417;
		}
	}
	.title_list_content {
		view {
			padding: 30rpx;
			margin-right: 8rpx;
			// height: 100%;
			line-height: 30rpx;
			font-size: 30rpx;
		}
		view:hover {
			background-color: #E0E0E0;
		}
	}
	.scroll-Y {
		height: 500rpx;
	}
</style>
