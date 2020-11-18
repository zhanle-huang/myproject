<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item >
								<navigator :url="'/pages/book/book?id='+sexSwiperData[0].id" hover-class="navigator-hover">
									<image style="width: 750rpx" :src="sexSwiperData[0].imgSrc" mode="scaleToFill"></image>
								</navigator>
						</swiper-item>
						<swiper-item >
								<navigator :url="'/pages/book/book?id='+sexSwiperData[1].id" hover-class="navigator-hover">
									<image style="width: 750rpx" :src="sexSwiperData[1].imgSrc" mode="scaleToFill"></image>
								</navigator>
						</swiper-item>
						<swiper-item>
								<navigator :url="'/pages/book/book?id='+sexSwiperData[2].id" hover-class="navigator-hover">
									<image style="width: 750rpx" :src="sexSwiperData[2].imgSrc" mode="scaleToFill"></image>
								</navigator>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view>
			<cardBox :title="hotTitle" :tip="tips" :icon="tipIcon" :tipsFlag="true"
				:tipHandle="sexTipHandle">
				<bookList :bookListData="sexHotData"></bookList>
			</cardBox>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			sexSwiperData: {  //轮播图
				type: Array,
				default() {
					return [];
				}
			},
			hotTitle: {   //标题
				type: String,
				default: ''
			},
			tips: {   //提示
				type: String,
				default: ''
			},
			tipIcon: {  //提示图标
				type: String,
				default: ''
			},
			sexTipHandle: {   //提示点击函数
				type: Function,
				default: null
			},
			sexHotData: {   //数据
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2500,
				duration: 500,
				
			}
		},
		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			//boytip点击
			boyTipHandle() {
				console.log("男生热门")
				
			}
		},
		onLoad() {
			console.log(this.boySwiperData)
		}
	}
</script>

<style lang="less">

</style>
