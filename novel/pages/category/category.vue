<template>
	<view>
		<view>
			<div class="article">
			  <s-tabs slot-title :nav-per-view="5" v-model="activeTab"
				:lineHeight="7"
				:lineScale="0.2" 
				:lineColor="'#FFDE00'"
				:customClass="customClass"
				@change="changeNav"
				class="navFixed"
				>
			    <s-tab v-for="item of tabList" :key="item">
				{{item}}</s-tab> 
			  </s-tabs>
			</div>
			
			<view class="nav-blank"></view>
		</view> 
					<view class="win-swiper">
						<view :class="['my-swiper', {'swiperStyle1': swiperStyle1}]" ref="swiper" >
							<view class="swiper-item">
								<leftCategory
									:listData="boyLeftCategoryList" ref="item1"></leftCategory>
							</view>
							<view class="swiper-item">
								<leftCategory
									:listData="girlLeftCategoryList" ref="item2"></leftCategory>
							</view>
						</view>
					</view>
						
		
	</view>
</template>

<script>

	export default {
		components: {
			
		},
		data() {
			return {
				tabList: ["男生","女生"],
				customClass: 'customClass',
				swiperStyle1: false,	//第二个选中
				activeTab: 0, 
				duration: 500,
				swiperCurrent: 0,
				pageX: 0,
				offsetLeft: 0,
				offsetWidth: 0,
				screenWidth: 0,
				screenHeight: 0,
				timer: null,
				swiper: null,
				//左侧分类数据
				boyLeftCategoryList: [
					{
						name: '东方玄幻',
						url: '/book',  //请求地址
						param: {
							categoryId: 1,
							pageNum: 1,
							pageSize: 20
						},
						type: 'listCard',
						tips1: '热门玄幻',
						tips2: '玄幻'
					},
					{
						name: '奇幻修真',
						url: '/book',
						param: {
							categoryId: 4,
							pageNum: 1,
							pageSize: 20
						},
						type: 'listCard',
						tips1: '热门修真',
						tips2: '修真'
					},
					{
						name: '全部分类',
						url: '/category',
						type: '',
						tips1: '热门分类',
						tips2: '分类'
					},
					{
						name: '热搜周榜',
						url: '/book',
						param: {
							categoryId: 1,
							pageNum: 2,
							pageSize: 20
						},
						type: 'listCard',
						tips1: '热搜周榜'
					},
					{
						name: '追更周榜',
						url: '/book',
						param: {
							categoryId: 1,
							pageNum: 3,
							pageSize: 20
						},
						type: 'listCard',
						tips1: '追更周榜'
					}
				],
				girlLeftCategoryList: [
					{
						name: '青春校园',
						url: '/book',  //请求地址
						param: {
							categoryId: 6,
							pageNum: 1,
							pageSize: 20
						},
						type: 'listCard',
						tips1: '热门青春校园',
						tips2: '推理悬念'
					},
					{
						name: '推理悬念',
						url: '/book',
						param: {
							categoryId: 5,
							pageNum: 1,
							pageSize: 20
						},
						type: 'listCard',
						tips1: '热门推理悬念',
						tips2: '推理悬念'
					},
					{
						name: '全部分类',
						url: '/category',
						type: '',
						tips1: '热门分类',
						tips2: '分类'
					},
					{
						name: '热搜周榜',
						url: '/book',
						param: {
							categoryId: 6,
							pageNum: 2,
							pageSize: 20
						},
						type: 'listCard',
						tips1: '热搜周榜'
					},
					{
						name: '追更周榜',
						url: '/book',
						param: {
							categoryId: 5,
							pageNum: 2,
							pageSize: 20
						},
						type: 'listCard',
						tips1: '追更周榜'
					}
				],
			}
		},
		methods: {
			changeNav(index) {
				this.swiperCurrent = index;
				// this.swiper.style.left = - (index*this.screenWidth)+"px";
				switch(index) {
					case 0:
						this.swiperStyle1 = false;
						break;
					case 1: 
						this.swiperStyle1 = true;
						break;
				}
			},
			durationChange(e) {  //滑块延迟时间
				this.duration = e.target.value
			},
			slideChange(e) {  //滑块切换时间
				this.activeTab = e.detail.current
			},//传入对象，获取高度，并将swiper的高度设置为当前的
			slideStart(event) {
				
				this.pageX = event.changedTouches[0].pageX;
				console.log(this.pageX)
				this.offsetLeft = this.swiper.offsetLeft;
				this.offsetWidth = this.swiper.offsetWidth - this.screenWidth;
			},
			slideItem(event) { //滑动
				var l = event.changedTouches[0].pageX - this.pageX;
				//先移动
				this.swiper.style.left = this.offsetLeft + l + "px";
			
			
			},
			slideEnd(event) {
				var l = event.changedTouches[0].pageX - this.pageX;
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
					clearInterval(this.timer);
					this.timer = setInterval((l) => {
						console.log(l, "ss")
						this.swiper.style.left = this.swiper.offsetLeft - l / 30 + "px";
						if (this.swiper.offsetLeft <= this.offsetLeft - l) {
							this.swiper.style.left = this.offsetLeft - l + "px";
							clearInterval(this.timer)
							return;
						}
					}, 15, this.screenWidth)
					return;
				}
				if (l > 120) {
					// this.swiper.style.left = this.offsetLeft + this.screenWidth + "px";
					this.swiperCurrent--;
					this.activeTab = this.swiperCurrent;
					clearInterval(this.timer);
					this.timer = setInterval((l) => {
						this.swiper.style.left = this.swiper.offsetLeft + l / 30 + "px";
						if (this.swiper.offsetLeft >= this.offsetLeft + l) {
							this.swiper.style.left = this.offsetLeft + l + "px";
							clearInterval(this.timer)
							return;
						}
					}, 15, this.screenWidth)
					return;
				}
				this.swiper.style.left = this.offsetLeft + "px";
			},
			selectSwiper() {
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
		onReady() {
			this.screenWidth = uni.getSystemInfoSync().screenWidth;
			this.screenHeight = uni.getSystemInfoSync().windowHeight-78;
			console.log(this.screenHeight)
		},
		mounted() {
			this.$nextTick(() => {
				this.swiper = this.$refs.swiper.$el;
				this.swiper.style.height = this.screenHeight;
			})
		}
	}
</script>

<style scoped lang="less">
	uni-page-head .uni-page-head,
	.uni-page-head {
		// display: none;
	}
	page {
		margin-top: 78rpx;
	}
	
	.test {
		height: 800px;
	}
	.win-swiper {
		// height: 800rpx;
		/*#ifdef MP-WEIXIN*/
		margin-top: 78rpx;
		/*#endif*/
	}
	/deep/.customClass {
		width: 750rpx;
		position: fixed;
		background-color: #fff;
		top: 0;
		z-index: 888;
		
	}
	.nav-blank {
		// height: 78rpx;
		
	}
	.article {
		text-align: center;
		background-color: #fff;
		position: fixed;
		top: 0;
		z-index: 999;
	}
	.win-swiper {
		position: relative;
		.my-swiper {
			width: 1500rpx;
			display: flex;
			justify-content: start;
			position: absolute;
			left: 0;
			top: 0;
			transition: all .2s;
			.swiper-item {
				width: 750rpx;
			}
		}
		/*#ifndef H5 || MP-WEIXIN*/
		.my-swiper {
			
			top: 78rpx;
		
		}
		/*#endif*/
		.my-swiper.swiperStyle1 {
			left: -750rpx;
		}
	}
	.uni-swiper-slides,
	.uni-swiper-wrapper,
	.uni-swiper-slide-frame,
	#swiperItem
	 {
		height: 1150rpx !important;
	}
</style>
