<template>
	<view>
		<view class="search-container">
			<input class="search" v-model="searchStr" placeholder="请输入搜索内容" type="text">
			<span class="search-btn" size="mini" @click="searchBook">搜索</span>
		</view>
		<view>
			<bookList :bookListData="searchBooks"></bookList>
		</view>
	</view>
</template>

<script>
	import Req from '../../common/req.js';
	export default {
		data() {
			return {
				searchStr: '', //查询数据
				searchBooks: [ //完爆完本

				],
				pageNum: 1, //页码
				isLoading: false, //加载中
				searchTimer: null
			};
		},
		methods: {
			reqSearchBook(pageNum, pageSize) { //获取查询的书籍
				Req.get('/book/search', {
					searchStr: this.searchStr,
					pageNum: pageNum,
					pageSize: pageSize
				}, res => {
					console.log(res)
					uni.hideLoading();
					if (res.data.status != 1) {
						
						this.searchBooks = [...this.searchBooks, ...res.data];
						console.log("wa",this.searchBooks)
						this.pageNum++;
						this.isLoading = false;
						clearTimeout(this.searchTimer);
					} else {
						clearTimeout(this.searchTimer);
						uni.showToast({
							title: '没有更多数据啦',
							position: 'top',
						})
					}
				})
				// clearTimeout(this.searchTimer);
				this.searchTimer = setTimeout(() => {
					if (this.isLoading === true) {
						this.isLoading = false;
						uni.showToast({
							title: '请求超时',
							position: 'top',
							icon: 'none'
						})
					}
				}, 6000)
			},
			searchBook() { //点击搜索
			console.log(this.searchStr)
				this.searchBooks =[];
				this.pageNum = 1;
				if (this.searchStr === '') {
					uni.showToast({
						title: '搜索内容不能为空',
						position: 'top',
						icon: 'none'
					})
					return;
				}
				if (!this.isLoading) {
					uni.showLoading({
						title: '搜索中',
						mask: true
					})
					this.isLoading = true;
					this.reqSearchBook(this.pageNum, 10);
				}

			},
		},
		onReachBottom() {
			if(this.searchStr === '') {
				this.searchBooks = [];
				return;
			}
			console.log("ss",this.pageNum)
			this.reqSearchBook(this.pageNum, 10);
		}
	}
</script>

<style lang="less">
	.search-container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
		.search {
			width: 500rpx;
			border: 1px solid #FFDE00;
			padding: 15rpx 20rpx;
			border-radius: 10rpx;
			color: #808080;
			margin-right: 15rpx;
		}

		.search-btn {
			padding: 16rpx 15rpx;
			border-radius: 6rpx;
			background-color: #FFDE00;
			color: #fff;
		}
	}
</style>
