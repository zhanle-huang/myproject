<template>
	<view :class="['chapter-container', {'active': chapterShow}]" ref="chapterContainer">
		<view class="chapter-list">
			<navigator :url="'../../pages/book/book?id='+bookData.id">
				<view class="chapter-list-top">
					<image class="img" :src="bookData.imgSrc"></image>
					<view>
						<view class="name">{{ bookData.name }}</view>
						<view class="author">{{ bookData.authorName }}</view>
					</view>
				</view>
			</navigator>
			<view class="chapter-list-middle">
				<p class="left">
					<span>{{ bookStatus() }}</span> <span class="fenge">|</span>
					<span>共3598章</span>
				</p>
				<p class="right" @click="orderChange()">
					<span :class="orderDesc?'iconfont icon-shunxu-copy':'iconfont icon-shunxu'"></span>
					<span>{{ orderDesc?'顺序':'倒序' }}</span>
				</p>
			</view>
			<view class="chapter-list-footer"> 
				 <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" ref="scrollView">
				<view v-for="item in chapterDataTemp.length<=0?chapterListData:chapterDataTemp" :key="item.id" @click="selectChapter(item.chapterNum)">
					{{ item.title }}
				</view>
				
				</scroll-view>
			</view>
			 
		</view>
		<view class="shadow-box" @click="shadowBoxClick"></view>
	</view>
</template>

<script>
	export default {
		props: {
			bookData: {  //书本数据
				type: Object,
				default: null
			},
			chapterListData: { //章节数据
				type: Array,
				default() {
					return [];
				}
			},
			chapterShow: {  //是否显示章节面包板
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scrollTop: 0,
				orderDesc: true    ,//是否降序
				chapterDataTemp: []
			};
		},
		methods: {
			bookStatus() {
				switch (this.bookData.status) {
					case 0:
						return '连载中';
					case 1:
						return '完结';
					case 2:
						return '停更';
				}
			},
			shadowBoxClick() {  //点击了遮罩层
				uni.$emit('clickShadow', {});
			},
			selectChapter(num) { //选择章节
				uni.$emit('clickShadow', {});
				uni.$emit('selectChapter', {num: num});
			},
			orderChange() {   //调转章节顺序
				this.orderDesc = !this.orderDesc;
				if(this.chapterDataTemp.length <=0 ) {
					this.chapterDataTemp = this.chapterListData.reverse();
				} else {
					this.chapterDataTemp = this.chapterDataTemp.reverse();
				}
				
			}
		},
		mounted() {
			var _this = this;
			
			uni.getSystemInfo({
				success: function(res) {
					_this.$nextTick(function() {
						_this.$refs.scrollView.$el.style.height = res.windowHeight + 'px';
					})
				}
			});
		}
	}
</script>

<style lang="less">
	.scroll-Y {
		height: 700rpx;
	}
	.chapter-container {
		width: 750rpx;
		display: flex;
		justify-content: flex-start;
		position: fixed;
		top: 0;
		bottom: 0;
		left: -500px;
		transition: all .5s;
		&.active {
			left: 0;
		}
	}

	.shadow-box {
		// width: 750rpx;
		flex: 1 0;
		background-color: #333;
		opacity: 0.5;
	}

	.chapter-list {
		flex: 0 0 75%;
		background-color: #FEFEFE;
		padding: 30rpx;

		.chapter-list-top {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.img {
				width: 120rpx;
				height: 170rpx;
				border-radius: 6rpx;
				margin-right: 20rpx;
			}

			.name {
				color: #333333;
			}

			.author {
				font-size: 30rpx;
				color: #555555;
				margin-top: 20rpx;
			}
		}

		.chapter-list-middle {
			display: flex;
			justify-content: space-between;
			margin: 30rpx 0;

			.left {
				color: #999999;
				font-size: 26rpx;

				.fenge {
					color: #C0C0C0;
					font-size: 20rpx;
					line-height: 20rpx;
					padding: 0 8rpx;
				}
			}

			.right {
				font-size: 26rpx;

				span {
					margin-right: 14rpx;
				}
			}
		}

		.chapter-list-footer {
			font-size: 28rpx;

			view {
				border-top: 1rpx solid #F5F5F5;
				margin-right: 12rpx;
				padding: 20rpx 0;
			}
		}
	}
</style>
