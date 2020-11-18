<template>
	<view class="win-swiper">
		<view class="my-swiper" ref="swiper" @touchmove="slideItem" @touchstart="slideStart" @touchend="slideEnd">
			<view class="swiper-item">
				ss
				<!-- <slot></slot> -->
			</view>
			<view class="swiper-item">
				ssaa
				<!-- <slot></slot> -->
			</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageX: 0,
				offsetLeft: 0,
				offsetWidth: 0,
				screenWidth: 0,
				timer: null,
				swiper: null,
			};
		},
		methods: {
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
					// this.swiper.style.left = this.offsetLeft - this.screenWidth + "px";
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
					clearInterval(this.timer);
					this.timer = setInterval((l) => {
						console.log(l, "ss")
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
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.swiper = this.$refs.swiper.$el;
			})
		}
	}
</script>

<style lang="less">
	.win-swiper {
		position: relative;
		.my-swiper {
			width: 1500rpx;
				display: flex;
				justify-content: start;
				position: absolute;
				left: 0;
				top: 0;
			.swiper-item {
				width: 750rpx;
				// height: 200px;
				background-color: #4CD964;
			}
		}
	}
</style>
