<template>
	<view>
		<view class="kind">
			<span :class="activeCategory===-1?'active':''" @click="clickAllHandle">全部</span>
			<span :class="activeCategory===index?'active':''" v-for="(item,index) in kindData" :key="item.categoryId" @click="kindHandle(item.categoryId, index)">{{ item.name }}</span>
		</view>
		<view>
			<bookList :bookListData="bombFinal"></bookList>
		</view>
	</view>
</template>

<script>
	import Req from '../../common/req.js';
	export default {
		data() {
			return {
				activeCategory: -1,
				bookParam: {
					pageNum: 1,		//页码
					categoryId: 1
				},
				kindData: [
					
				],
				bombFinal: [ //完爆完本
					
				]
			}
		},
		methods: {
			clickAllHandle() {	//点击全部
				this.bombFinal = [];
				console.log("全部")
				this.activeCategory = -1;
				uni.showLoading({
				    title: '加载中'
				});
				this.reqAllBook(this.bookParam.pageNum, 20);
			},
			kindHandle(categoryId,index) {  //获取某个分类小说
				this.bombFinal = [];
				this.bookParam.pageNum = 1;
				console.log('获取分类id为'+categoryId)
				this.activeCategory = index;
				this.bookParam.categoryId = categoryId;
				uni.showLoading({
				    title: '加载中'
				});
				this.reqBookByCategory(this.bookParam.categoryId, this.bookParam.pageNum, 20, () => {
					uni.hideLoading()
				});
			},
			reqCategory() {	//获取分类
				Req.get('/category', {}, res => {
					this.kindData = res.data;
				})
			},
			//请求书籍数据
			reqBookByCategory(categoryId, pageNum, pageSize, callback) {
				Req.get('/book', {
					categoryId: categoryId,
					pageNum: pageNum,
					pageSize: pageSize
				}, res => {
					callback && callback();
					if(res.data.status === 1) {
						uni.showToast({
							title: '已无更多内容',
							position: 'bottom'
						})
						return;
					}
					this.bombFinal = [...this.bombFinal, ...res.data];
					
					this.bookParam.pageNum++;
				})
			},
			reqAllBook(pageNum, pageSize) {	//请求全部数据
				Req.get('/book/all', {
					pageNum: pageNum,
					pageSize: pageSize
				}, res => {
					uni.hideLoading()
					if(res.data.status === 1) {
						uni.showToast({
							title: '已无更多内容',
							position: 'bottom'
						})
						return;
					} else {
						this.bombFinal = [...this.bombFinal, res.data]
					}
				})
			}
		},
		onLoad(option) {
			// console.log(option)
			//获取分类
			uni.showLoading({
			    title: '加载中'
			});
			this.reqCategory();
			//获取默认加载的书籍
			this.reqBookByCategory(option.categoryId,this.bookParam.pageNum, 20, () => {
				uni.hideLoading();
			});
		},
		onReachBottom() {	//触底加载
			console.log("触底")
			console.log(this.bookParam.pageNum)
			this.reqBookByCategory(this.bookParam.categoryId,this.bookParam.pageNum, 20);
		}
	}
</script>

<style scoped lang="less">
	page {
		background-color: #fff;
	}
	.kind {
		padding: 30rpx;
		border-bottom: 1px solid #EBEEF5;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		span {
			padding: 15rpx 30rpx;
			background-color: #E9C341;
			border-radius: 50rpx;
			margin-right: 15rpx;
			margin-bottom: 15px;
			font-size: 28rpx;
			color: #FFFFFF;
		}
		span.active {
			background-color: #fff;
			color: #E9C341;
		}
	}
</style>
