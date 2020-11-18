<template>
	<view class="left_category" ref="leftCategory">
		<view class="left">
			<view class="tab" 
				:class="showIndex === index?'active': ''"
				@click="selectHandle(index)" v-for="(item, index) in listData" :key="index">
				<view>{{ item.name }}</view>
			</view>
		</view>
		<view></view>
		<view class="right">
			<view>
				<listCard v-if="listData[showIndex].type === 'listCard'"
					:bookData="rightData"
					:tips1="listData[showIndex].tips1"></listCard>
				<categoryCard v-else
					:categoryTop="rightData.slice(0,2)"
					:categoryBottom="rightData.slice(2)"
					:tip1="listData[showIndex].tips1"
					:tip2="listData[showIndex].tips2"></categoryCard>
			</view>
		</view>
	</view>
</template>
<script>
	import Req from '../../common/req.js';
	export default {
		props: {
			listData: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {
				showIndex: 0,
				leftMenuStatus: [],
				pageNum: [],			//页码数组
				rightData: [],
				windowHeight: 0,
			}
		},
		methods: {
			selectHandle(index) {
				this.showIndex = index;
				console.log(index)
				if(index === 2) {
					this.rightData = [];
					Req.get(this.listData[index].url, {}, res => {
						console.log(res.data)
						this.rightData = res.data;
						console.log("分类")
					})
				} else {
					console.log(this.listData[index].param)
					this.reqBook(index);
				}
			},
			getHeight() {
				
			},
			reqBook(index) {
				Req.get(this.listData[index].url, {
					categoryId: this.listData[index].param.categoryId,
					pageNum: this.listData[index].param.pageNum,
					pageSize: this.listData[index].param.pageSize
				}, res => {
					this.rightData = res.data;
					console.log(this.rightData)
				})
			}
		},
		onLoad() {
			//初始化菜单状态
			
		},
		onShow() {
			console.log("onshow")
			
		},
		mounted() {
			for(var i = 0; i<this.listData.length; i++) {
				this.leftMenuStatus.push(false);
				this.pageNum.push(1);
			}
			this.leftMenuStatus[this.showIndex] = true;
			this.reqBook(this.showIndex);
			const query = uni.createSelectorQuery().in(this);
			this.windowHeight = uni.getSystemInfoSync().windowHeight -78 ;
			console.log(query.select('left_category')._component.$refs.leftCategory.$el,this.windowHeight,"****")
			query.select('left_category')._component.$refs.leftCategory.$el.style.height = this.windowHeight + "px";
		}
	}
</script>

<style scoped lang="less">
	.left_category {
		// margin-top: 78rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		// position: relative;
		.left {
			height: 667px;
			// height: 100%;
			// position: absolute;
			// top: 0;
			// bottom: 0;
			background-color: #fff;
			// position: fixed;
			// top: 78rpx;
			left: 0;
			.tab {
				padding: 28rpx 0;
				// border: 1px solid red;
				background-color: #fff;
				view {
					padding: 0 38rpx;
					font-size: 32rpx;
					text-align: center;
					
				}
			}
			.tab.active {
				background-color: #F5F5F5;
				
				view {
					font-weight: bold;
					border-left: 10rpx solid #FFD014;
					padding-left: 30rpx;
				}
			}
		}
		.right {
			padding-top: 40rpx;
			width: 516rpx;
			margin-right: 14rpx;
			height: 100%;
			.img {
				width: 200rpx;
			}
		}
	}
</style>
