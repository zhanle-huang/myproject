<template>
	<view class="book_content">
		<view class="head">
			<view class="left">
				<h3>{{ bookData.name }}</h3>
				<p>{{ bookData.author}}</p>
				<p class="info">{{ bookData.categoryName }} · 完结 · {{ bookData.total/10000 | formatNumber }}万字</p>
			</view>
			<view class="right">
				<image class="img" mode="scaleToFill" :src="bookData.imgSrc"></image>
			</view>
		</view>
		<view class="tips">
			<view class="top">
				<view class="left">
					<span class="score">{{ bookData.score}}</span><span>评分</span>
					<p class="iconfont icon-shijian1"></p>
				</view>
				<view class="right">
					<span class="num">{{ bookData.readNum }}</span><span>人</span>
					<p>正在阅读</p>
				</view>
			</view>
			<!-- <view class="bottom">
				<p><span class="iconfont icon-shijian1"></span><span>当前男生完结排行榜第<span class="rank">5</span>名</span></p>
				<span class="iconfont icon-xiangyou"></span>
			</view> -->
		</view>
		<!-- 选项卡 -->
		<v-tabs v-model="currentTab" :tabs="tabs" @change="changeNav" :fontSize="'34rpx'" :lineScale="0.3" :lineHeight="'8rpx'"
		 :lineColor="'#FFD014'" :color="'#808080'" :activeColor="'#333333'">
		</v-tabs>
			<swiper class="swiper" :duration="duration" @change="slideChange" ref="swiper" :current="swiperCurrent">
				<swiper-item>
					<view class="chapter-title">{{ recChapterData.title}}</view>
					 <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-book" ref="scrollViewBook">
					<view class="item_content" ref="item1" v-html="recChapterData.content">
					
					</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<view class="item_list" ref="item2">
						<title-list :titleListData="titleListData" :bookData="bookData"></title-list>
					</view>
				</swiper-item>
			</swiper>
		<view class="footer">
			<view>
				<p class="add_to_shelf" v-if="!addBookShelf" @click="addToShelf"><span class="iconfont icon-shijian"></span><span>加入书架</span></p>
				<p class="add_to_shelf" v-else ><span class="iconfont icon-shijian"></span><span>已加入</span></p>
			</view>
			<navigator :url="'/pages/details/details?bookId='+bookData.id+'&chapterNum=1'">
				<p class="read" @click="readHandle(bookData.id)">免费阅读</p>
			</navigator>
		</view>
	</view>
</template>

<script>
	import Util from '../../common/util.js';
	import Req from '../../common/req.js';
	export default {
		data() {
			return {
				scrollTop: 0,
				currentTab: 0,
				tabs: [
					'详情',
					'目录'
				],
				//切换动画时间
				duration: 500,
				addBookShelf: false,   //是否已经加入书架
				swiperCurrent: 0, //滑块吗，默认选中
				item1_h: 0, //获取得切换高度
				item2_h: 1,
				tabStatus1: false,  //目录选择项的状态
				bookData: {},
				recChapterData: {},
				titleListData: []
			}
		},
		methods: {
			//选项卡函数
			changeNav(index) {
				var _this = this;
				this.swiperCurrent = -1;
				if(!this.tabStatus1 && index === 1) {
					this.tabStatus1 = true;
					this.firstShow(this.bookData.id);
				}
				//解决滑动后点击无效问题
				setTimeout(function() {
					_this.swiperCurrent = index;
				}, 0);
			},
			slideChange(e) { //滑块切换时间
				// console.log(e.detail, "sas")
				this.currentTab = e.detail.current
				if(!this.tabStatus1 && e.detail.current === 1) {
					this.tabStatus1 = true;
					this.firstShow(this.bookData.id);
				}
			},
			getSwiperItemH(item) {
				var swiper_h = item.offsetHeight + 50;
				if (swiper_h < 300) {
					swiper_h = 300;
				}
				this.$refs.swiper.$el.style.height = swiper_h + "px";
				return swiper_h;
			},
			addToShelf() {  //加入书架
				const userId = uni.getStorageSync('userId');
				if(!userId) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				Req.addToShelf({
					userId: userId,
					num: 1,
					bookId: this.bookData.id
				}, (res) => {
					console.log(res)
					if(res) {
						this.isBookShelfed(this.bookData.id)
						uni.showToast({
							title: '加入书架成功',
							position: 'bottom'
						})
					} else {
						uni.showToast({
							title: '加入书架失败',
							position: 'bottom'
						})
					}
				})
			},
			firstShow(id) {   //首次加载其他选项
				Req.getChapter({id: id}, res => {
					this.titleListData = res.data;
				})
			},
			isBookShelfed(bookId) {  //是否被加入书架
				let userId = '';
				uni.getStorage({
					key: 'userId',
					success: res => {
						userId = res.data;
						
						Req.get('/bookshelf/exits', {
							userId: userId,
							bookId: bookId
						}, res => {
							console.log(res.data)
							if(res.data) {
								this.addBookShelf = true;
							}
						})
					}
				})
				
			},
			readHandle(bookId) {
				Req.put('/common/read', {
					bookId
				});
			}
		},
		onLoad(option) {
			console.log(option.id)
			//获取书本数据
			uni.showLoading({
			    title: '加载中'
			});
			setTimeout(() => {
				uni.hideLoading();
			}, 10000)
			Req.getBook({
				id: option.id
			}, (res) => {
				console.log(res)
				this.bookData = res.data.data[0];
			});
			Req.getRecChapter({
				bookId: option.id,
				num: 1
			}, (res) => {
				console.log("jinlai")
				this.recChapterData = res.data[0];
				// this.recChapterData.content = Util.pToView(this.recChapterData.content, 'data-v-1f22b4e8');
				// this.$refs.item1.$el.innerHTML = this.recChapterData.content;
				uni.hideLoading();
				this.getSwiperItemH(this.$refs.item1.$el)
				
			})
			
			uni.getStorage({
				key: 'token',
				success: res => {
					var token = res.data;
					console.log("sssaf")
					this.isBookShelfed(option.id)
				}
			})
			
			
		},
		onReady() {
			console.log("red")
			const query = uni.createSelectorQuery().in(this);
			console.log(query.select('.item_content')._component.$refs.item1.$el)
		},
		mounted() {
			console.log("mounted")
			var aa = 'adas1a';
			aa = parseInt(aa);
			console.log(aa)
			if(aa) {
				console.log("jinlai")
			}
		}
	}
</script>

<style scoped lang="less">
	.book_content {
		width: 748rpx;
		letter-spacing: 4rpx;
	.swiper,
	.uni-swiper-item{
		height: 600rpx;
	}

		.head {
			display: flex;
			justify-content: space-between;
			background-color: #8C4E49;
			color: #FFFFFF;
			padding: 40rpx 30rpx;

			.left {
				h3 {
					font-size: 40rpx;
					font-weight: 500;
					margin-bottom: 30rpx;
				}

				p {
					font-size: 30rpx;
					color: #D4D0D0;
					margin-bottom: 30rpx;
					letter-spacing: 1rpx;
				}

				.info {
					margin-top: 130rpx;
					margin-bottom: 0;
				}
			}

			.right {
				.img {
					width: 210rpx;
					height: 290rpx;
					border-radius: 10rpx;
				}
			}
		}

		.tips {
			padding: 30rpx 0 0 0;
			background-color: #fff;
			margin-bottom: 24rpx;

			.top {
				text-align: center;
				display: flex;
				justify-content: space-between;
				padding: 20rpx 110rpx;
				border-bottom: 1px solid #EBEEF5;

				p {
					font-size: 32rpx;
					margin-top: 16rpx;
					margin-bottom: 16rpx;
				}

				span {
					font-size: 32rpx;
					color: #808080;
					// margin-bottom: 50rpx;
				}

				.left {
					.score {
						font-size: 46rpx;
						font-weight: 700;
						color: #333333;
						margin-right: 8rpx;
					}
				}

				.right {
					p {
						color: #808080;
						line-height: 40rpx;

					}

					.num {
						font-size: 46rpx;
						font-weight: 700;
						color: #333333;
						margin-right: 8rpx;
					}
				}
			}

			.bottom {
				display: flex;
				justify-content: space-between;

				p {
					// vertical-align: middle;
					// height: 100%;
					font-size: 32rpx;
					padding: 40rpx 14rpx;
				}

				.rank {
					color: #DD524D;
					font-weight: 600;
					font-size: 36rpx;
				}

				.iconfont {
					font-size: 28rpx;
					margin-right: 30rpx;
					line-height: 44rpx;
					padding: 40rpx 14rpx;
					color: #C0C0C0;
				}
			}
		}
		.scroll-book {
			height: 800rpx;
		}
		.chapter-title, 
		.item_content {
			padding: 30rpx;
			background-color: #fff;
			line-height: 50rpx;
			.content-p {
				// text-indent: 2em;
				margin-top: 30rpx;
				margin-bottom: 30rpx;
			}
		}

		.item_list {
			background-color: #fff;
		}

		.footer {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 20rpx 0;
			position: fixed;
			bottom: 0rpx;
			background-color: #fff;

			p {
				padding: 20rpx 60rpx;
				font-size: 34rpx;
				margin: 0 30rpx;
			}

			.add_to_shelf {
				// margin-right: 130rpx;
				line-height: 40rpx;
				display: flex;
				justify-content: flex-start;
				padding: 20rpx 30rpx;
				border: 1px solid #C0C0C0;
				border-radius: 50rpx;
				.iconfont {
					margin-right: 14rpx;
				}
			}

			.read {
				border-radius: 50rpx;
				background-color: #FFD014;
			}
		}
	}

	.v-tabs {
		border-bottom: 1rpx solid #E6E6E6;
	}
</style>
