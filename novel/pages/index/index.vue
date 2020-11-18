<template>
	<view>
		<view>
			<div class="article">
				<s-tabs slot-title :nav-per-view="5" v-model="activeTab" :lineHeight="7" :lineScale="0.2" :lineColor="'#FFDE00'"
				 @change="changeNav" class="navFixed" :activeColor="'#F0AD4E'">
					<s-tab v-for="item of tabList" :key="item">
						{{item}}</s-tab>
				</s-tabs>
				<navigator class="search" url="/pages/search/search">
					<view class="iconfont icon-soushuo">
				
					</view>
				</navigator>
			</div>
			
		</view>
		<view class="win-swiper">
			<view :class="['my-swiper', {'swiperStyle1':swiperStyle1 }, {'swiperStyle2':swiperStyle2 }]" ref="swiper" >
				<view class="swiper-item">
					 <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-index">
					<view class="content" ref="item1">
						<view class="navCardTop">
							<navigator hover-class="navigator-hover" :url="item.url" v-for="item in navCardTop" :key="item.id">
								<view class="topNav">
									<view class="left">
										<h3>{{ item.title }}</h3>
										<p><span>{{ item.tips }}</span></p>
									</view>
									<view class="right">
										<img :src="item.imgUrl" alt="">
									</view>
								</view>
					
							</navigator>
						</view>
						<view class="navCardBottom">
							<navigator :url="item.url" hover-class="navigator-hover" v-for="item in navCardBottom" :key="item.id">
								<view class="navC">
									<h3>{{ item.title }}</h3>
									<p><span>{{ item.tips }}</span></p>
								</view>
							</navigator>
						</view>
						<cardBox :title="'热门推荐'" :tip="'换一换'" :icon="'iconfont icon-huanyihuan'" :tipsFlag="true" :tipHandle="hotTipHandle">
							<view>
								<view class="cardTop">
									<bookList :bookListData="hotRecommendTop"></bookList>
								</view>
								<view class="cardBottom">
									<briefBook :briefListData="hotRecommendbottom"></briefBook>
								</view>
							</view>
						</cardBox>
						<cardBox :title="'完爆完本'" :tip="'全部'" :icon="'iconfont icon-quanbu1'" :tipsFlag="true" :tipHandle="allTipHandle">
							<bookList :bookListData="bombFinal"></bookList>
						</cardBox>
						<cardBox>
							<nameList :nameListData="readerRec"></nameList>
						</cardBox>
					</view>
					</scroll-view>
				</view>
				<view class="swiper-item">
					<boy-novel :sexSwiperData="boySwiper" :hotTitle="'男生热门'" :tips="'全部'" :tipIcon="'iconfont icon-quanbu1'"
					 :sexTipHandle="boyTipHandle" :sexHotData="boyHotData" ref="item2" class="swiperItem2">
					</boy-novel>
				</view>
				<view class="swiper-item">
					<boy-novel :sexSwiperData="girlSwiper" :hotTitle="'女生热门'" :tips="'全部'" :tipIcon="'iconfont icon-quanbu1'"
					 :sexTipHandle="girlTipHandle" :sexHotData="girlHotData" ref="item3" class="swiperItem3">
					</boy-novel>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Req from '../../common/req.js';
	export default {
		data() {
			return {
				tabList: ["精选", "男生", "女生"],
				swiperStyle1: false, //选中第二个
				swiperStyle2: false, //选中第三个
				activeTab: 0,
				scrollTop: 0,
				duration: 500, //滑动动画持续事件
				swiperCurrent: 0, //滑动的index
				pageX: 0,
				offsetLeft: 0,
				offsetWidth: 0,
				screenWidth: 0,
				timer: null,
				swiper: null,
				hotRecPage: 1, //热门页数 
				navCardTop: [ //顶部的卡片上部
					{
						id: 0,
						url: "/pages/novelKind/novelKind?categoryId=7",
						title: "都市",
						tips: "都市异能",
						imgUrl: "http://static.zongheng.com/upload/cover/96/5c/965c1b4e6f9b334a965f30f943d92472.jpeg"
					},
					{
						id: 1,
						url: "/pages/novelKind/novelKind?categoryId=3",
						title: "玄幻",
						tips: "转世重生",
						imgUrl: "http://static.zongheng.com/upload/cover/be/da/bedaf2cb89c7fd93602aaee84e65f448.jpeg"
					}
				],
				navCardBottom: [ //顶部的卡片下部部
					{
						id: 0,
						url: "/pages/novelKind/novelKind?categoryId=5",
						title: "推理悬念",
						tips: "一次看到爽",
					},
					{
						id: 1,
						url: "/pages/novelKind/novelKind?categoryId=6",
						title: "青春校园",
						tips: "年轻不后悔",
					},
					{
						id: 2,
						url: "/pages/novelKind/novelKind?categoryId=2",
						title: "精品",
						tips: "异世大陆",
					}
				],
				hotRecommendTop: [{ //热门推荐的顶部
					imgUrl: "/static/images/mingren.jpg",
					name: "九转帝尊",
					score: "9.4",
					brief: "他是神道中的帝王，亦是武道中的至尊。",
					info: "爽文 · 热血 · 连载 · 636万字",
					url: "/pages/book/book"
				}],
				hotRecommendbottom: [ //热门推荐的底部
					{
						id: 0,
						imgUrl: "/static/images/mingren.jpg",
						name: "我的贴身校花",
						url: "/pages/book/book"
					},
					{
						id: 1,
						imgUrl: "/static/images/mingren.jpg",
						name: "乡村神医",
						url: "/pages/book/book"
					},
					{
						id: 2,
						imgUrl: "/static/images/mingren.jpg",
						name: "护花兵王",
						url: "/pages/book/book"
					},
					{
						id: 3,
						imgUrl: "/static/images/mingren.jpg",
						name: "龙王归来",
						url: "/pages/book/book"
					}
				],
				bombFinal: [ //完爆完本
					
				],
				readerRec: [
				],
				boySwiper: [{
						id: 0,
						url: '/pages/book/book',
						imgUrl: '../../static/images/mingren.jpg'
					},
					{
						id: 1,
						url: '/pages/book/book',
						imgUrl: '../../static/images/mingren.jpg'
					},
					{
						id: 2,
						url: '/pages/book/book',
						imgUrl: '../../static/images/mingren.jpg'
					}
				],
				boyHotData: [ //男生热门
					
				],
				girlSwiper: [{
						id: 0,
						url: '/pages/book/book',
						imgUrl: '../../static/images/mingren.jpg'
					},
					{
						id: 1,
						url: '/pages/book/book',
						imgUrl: '../../static/images/mingren.jpg'
					},
					{
						id: 2,
						url: '/pages/book/book',
						imgUrl: '../../static/images/mingren.jpg'
					}
				],
				girlHotData: [ //女生热门
					
				],
			}
		},
		onLoad() {

		},
		methods: {
			changeNav(index) {
				this.swiperCurrent = index;
				// this.swiper.style.left = - (index*this.screenWidth)+"px";
				switch(index) {
					case 0:
						this.swiperStyle1 = false;
						this.swiperStyle2 = false;
						break;
					case 1: 
						this.swiperStyle1 = true;
						this.swiperStyle2 = false;
						break;
					case 2:
						this.swiperStyle2 = true;
						this.swiperStyle1 = false;
						break;
				}
			},
			durationChange(e) { //滑块延迟时间
				this.duration = e.target.value
			},
			getBoySwiper() { //加载男生数据
				//获取轮播图
				Req.get('/book', {
					categoryId: 1,
					pageNum: 5,
					pageSize: 3
				}, res => {
					console.log(res.data)
					this.boySwiper = res.data;
				})
				Req.get('/book', {
					categoryId: 1,
					pageNum: 6,
					pageSize: 5
				}, res => {
					this.boyHotData = res.data;
				})
			},
			getGirlSwiper() { //加载女生数据
				//获取轮播图
				Req.get('/book', {
					categoryId: 1,
					pageNum: 3,
					pageSize: 3
				}, res => {
					this.girlSwiper = res.data;
				})
				Req.get('/book', {
					categoryId: 1,
					pageNum: 6,
					pageSize: 5
				}, res => {
					this.girlHotData = res.data;
				})
			},
			//热门tip点击函数
			hotTipHandle() {
				console.log("热门tip点击")
				this.reqBook(1, this.hotRecPage, 5, res => {
					console.log(res)
					if (res.data.status === 1) {
						//重新开始
						this.hotRecPage = 1;
						return;
					}
					this.hotRecommendTop = res.data.slice(0, 1);
					this.hotRecommendbottom = res.data.slice(1);
					this.hotRecPage++;
				})
			},
			//完爆tip点击函数
			allTipHandle() {
				uni.navigateTo({
					url: '/pages/novelKind/novelKind?categoryId=1'
				})
			},
			//男生tip点击函数
			boyTipHandle() {
				console.log("男生点击函数")
				uni.navigateTo({
					url: '/pages/novelKind/novelKind?categoryId=1'
				})
			},
			//女生tip点击函数
			girlTipHandle() {
				console.log("女生点击函数")
				uni.navigateTo({
					url: '/pages/novelKind/novelKind?categoryId=1'
				})
			},
			reqBook(categoryId, pageNum, pageSize, callback) {
				Req.get('/book', {
					categoryId: categoryId,
					pageNum: pageNum,
					pageSize: pageSize
				}, res => {
					callback && callback(res);
				})
			},
			slideStart(event) {
				
				this.pageX = event.changedTouches[0].pageX;
				this.screenWidth = uni.getSystemInfoSync().screenWidth;
				console.log(this.pageX)
				this.offsetLeft = this.swiper.offsetLeft;
				this.offsetWidth = this.swiper.offsetWidth - this.screenWidth;
			},
			slideItem(event) { //滑动
				var l = event.changedTouches[0].pageX - this.pageX;
				console.log(l)
				//先移动
				this.swiper.style.left = this.offsetLeft + l + "px";
			
			
			},
			slideEnd(event) {
				console.log(event)
				var l = event.changedTouches[0].pageX - this.pageX;
				console.log("Jieshu")
				if (this.offsetLeft + l > 0) {
					this.swiper.style.left = '0px';
					return;
				}
				if (this.offsetLeft + l < -this.offsetWidth) {
					this.swiper.style.left = -this.offsetWidth + "px";
			
					return;
				}
				if (l < -120) {
					this.swiperCurrent++;
					this.activeTab = this.swiperCurrent;
					this.swiper.style.left = this.offsetLeft - this.screenWidth + "px";
					// clearInterval(this.timer);
					// this.timer = setInterval((l) => {
					// 	console.log(l, "ss")
					// 	this.swiper.style.left = this.swiper.offsetLeft - l / 30 + "px";
					// 	if (this.swiper.offsetLeft <= this.offsetLeft - l) {
					// 		this.swiper.style.left = this.offsetLeft - l + "px";
					// 		clearInterval(this.timer)
					// 		return;
					// 	}
					// }, 15, this.screenWidth)
					return;
				}
				if (l > 120) {
					this.swiperCurrent--;
					this.activeTab = this.swiperCurrent;
					this.swiper.style.left = this.offsetLeft + this.screenWidth + "px";
					// clearInterval(this.timer);
					// this.timer = setInterval((l) => {
					// 	console.log(l, "ss")
					// 	this.swiper.style.left = this.swiper.offsetLeft + l / 30 + "px";
					// 	if (this.swiper.offsetLeft >= this.offsetLeft + l) {
					// 		this.swiper.style.left = this.offsetLeft + l + "px";
					// 		clearInterval(this.timer)
					// 		return;
					// 	}
					// }, 15, this.screenWidth)
					return;
				}
				this.swiper.style.left = this.offsetLeft + "px";
			},
			selectSwiper() {	//点击切换
				console.log("ss")
				this.timer = setInterval((l) => {
					if(this.swiper.offsetLeft>l) {
						this.swiper.style.left = this.swiper.offsetLeft - 30 + "px";
						if (this.swiper.offsetLeft <= l) {
							this.swiper.style.left = l + "px";
							clearInterval(this.timer)
							return;
						}
					} else if(this.swiper.offsetLeft<l) {
						this.swiper.style.left = this.swiper.offsetLeft + 30 + "px";
						if (this.swiper.offsetLeft >= l) {
							this.swiper.style.left = l + "px";
							clearInterval(this.timer)
							return;
						}
					}
					
					
				}, 15, -this.swiperCurrent*this.screenWidth)
				return;
			}
		},
		onLoad() {

			//热门推荐
			this.reqBook(1, this.hotRecPage, 5, res => {
				this.hotRecommendTop = res.data.slice(0, 1);
				this.hotRecommendbottom = res.data.slice(1);
				this.hotRecPage++;
			})
			//完爆完本的数据请求
			Req.get('/book', {
				categoryId: 1,
				pageNum: 2,
				pageSize: 5
			}, (res) => {
				console.log(res.data);
				this.bombFinal = res.data;
			})

			//书推
			Req.get('/book', {
				categoryId: 1,
				pageNum: 4,
				pageSize: 5
			}, res => {
				this.readerRec = res.data;
				// this.item1_h = this.getSwiperItemH(this.$refs.item1.$el)
			})
			this.getBoySwiper();
			this.getGirlSwiper();

		},
		onPullDownRefresh() {
			console.log("下拉刷新")
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 10000)
			this.reqBook(1, this.hotRecPage, 5, res => {
				this.hotRecommendTop = res.data.slice(0, 1);
				this.hotRecommendbottom = res.data.slice(1);
				this.hotRecPage++;
			})
			//完爆完本的数据请求
			Req.get('/book', {
				categoryId: 1,
				pageNum: 2,
				pageSize: 5
			}, (res) => {
				console.log(res.data);
				this.bombFinal = res.data;
			})

			//书推
			Req.get('/book', {
				categoryId: 1,
				pageNum: 4,
				pageSize: 5
			}, res => {
				this.readerRec = res.data;
				// this.item1_h = this.getSwiperItemH(this.$refs.item1.$el)
				uni.stopPullDownRefresh();
			})
			this.getBoySwiper();
			this.getGirlSwiper();

		},
		onReady() {
			this.screenWidth = uni.getSystemInfoSync().screenWidth;
			const query = uni.createSelectorQuery().in(this);
			this.swiper = query.select('.my-swiper')._selectorQuery._page.$refs.swiper.$el;
			console.log(this.swiper)
			// this.$nextTick(() => {
			// 	this.swiper = this.$refs.swiper.$el;
			// 	console.log(this.swiper)
			// })
		}
	}
</script>

<style lang="scss">
	uni-page-head .uni-page-head,
	.uni-page-head {
		// display: none;
		// height: 78px;
	}
	page {
		margin-top: 78rpx;
		/*#ifdef MP-WEIXIN*/
		padding-top: 78rpx;
		/*#endif*/
	}
	h3 {
		font-family: "楷体", "楷体_GB2312", sans-serif;
	}

	/deep/.navFixed {
		position: fixed;
		width: 750rpx;
		background-color: #F5F5F5;
		// top: 70rpx;
		top: 0rpx;
		z-index: 999;
	}

	.content {
		padding: 20rpx;

		.navCardBottom,
		.navCardTop {
			display: flex;
			justify-content: space-between;

			.topNav {
				// color: #007AFF;
				width: 296rpx;
				padding: 16rpx;
				text-align: left;
				display: flex;
				justify-content: space-between;
				background-color: #DDE8F4;
				border-radius: 10rpx;
				padding-left: 26rpx;
				margin-bottom: 12rpx;

				img {
					width: 130rpx;
					height: 120rpx;
					margin-right: 8rpx;
				}
			}

			h3 {
				font-size: 38rpx;
				font-weight: 600;
				line-height: 60rpx;
				margin-top: 10rpx;
			}

			p {
				font-size: 26rpx;
				color: #3F536E;
				// line-height: 26rpx;
			}
			
			uni-navigator:nth-child(1) .topNav {
				background-color: #DDE8F4;
			}

			uni-navigator:nth-child(2) .topNav {
				background-color: #E5E9F5;
			}

			.navC {
				width: 180rpx;
				background-color: #F0F1E9;
				border-radius: 10rpx;
				padding: 20rpx 20rpx;
				margin-bottom: 12rpx;

				h3,
				p {
					margin-left: 10rpx;
					line-height: 40rpx;
				}

			}
		}

		.cardBottom {}
	}

	.search {
		position: fixed;
		top: 20rpx;
		/*#ifdef APP-PLUS*/
		top: 100rpx;	
		/*#endif*/
		right: 100rpx;
		z-index: 1000;
		color: #F0AD4E;
	}
	.win-swiper {
		position: relative;
		top: 0;
		bottom: 0;
		width: 750rpx;
		overflow-x: hidden;
		height: 2000rpx;
		.my-swiper {
			width: 2250rpx;
			display: flex;
			justify-content: start;
			position: absolute;
			left: 0;
			top: 0;
			transition: all .2s;
			.scroll-index {
				height: 2000rpx;
				width: 750rpx;
				position: absolute;
				top: 0;
				bottom: 0;
			}
			// background-color: #55aaff;
			.swiper-item {
				width: 750rpx;
			}
		}
		.my-swiper.swiperStyle1 {
			left: -750rpx;
		}
		.my-swiper.swiperStyle2 {
			left: -1500rpx;
		}
	}
</style>
