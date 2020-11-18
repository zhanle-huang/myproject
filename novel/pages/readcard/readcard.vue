<template>
	<view>
		<view class="edit-nav">
			<view>
				<button v-if="editStatus" @click="editHandle" class="btn-edit" type="default" size="mini">编辑</button>
				<button v-else @click="successHandle" class="btn-success" type="primary" size="mini">完成</button>
			</view>
		</view>
		<view class="bookShelf" v-if="bookShelfData.length > 0">
			<checkbox-group>
				<view class="book" v-for="(item, index) in bookShelfData" :key="item.readCardId">
					<navigator :url="'/pages/book/book?id='+item.bookId" class="e-navigator">
						<image class="img" :src="item.imgSrc"></image>
						<view class="info">
							<span class="name">{{ item.name }}</span>
							<span class="author">{{ item.author }}</span>
							<span class="status">{{ bookStatus(item.status) }}</span>
						</view>
					</navigator>
					<view v-if="!editStatus" class="del-checkbox" @click="checkBoxHandle(index)">
						<checkbox class="del-btn" :checked="item.checkBox" />
					</view>
				</view>
			</checkbox-group>
		</view>
		<view v-else>暂无数据，请去阅读吧</view>
	</view>
</template>

<script>
	import Req from '../../common/req.js';
	export default {
		data() {
			return {
				editStatus: true,
				bookShelfData: [ //历史的书籍
					
				]
			}
		}, 
		methods: {
			bookStatus(status) { //状态
				switch (status) {
					case 0:
						return '已完结';
					case 1:
						return '待更新';
					case 2:
						return '停更';
				}
			},
			editHandle() { //编辑
				this.editStatus = false;
				console.log(this.editStatus)
			},
			successHandle() { //完成
				this.editStatus = true;
				var arrId = [];
				for (var i = 0; i < this.bookShelfData.length; i++) {
					if (this.bookShelfData[i].checkBox === true) {
						console.log(i)
						arrId.push(this.bookShelfData[i].readCardId);
					}
				}
				this.delBookShelf(arrId);
			},
			checkBoxHandle(index) { //选中事件
				console.log(index)
				this.bookShelfData[index].checkBox = !this.bookShelfData[index].checkBox;
			},
			reqBookShelf() { //请求历史书籍
				const userId = uni.getStorageSync('userId');
				
				Req.get('/readcard', {
					userId: userId
				}, res => {
					console.log(res.data)
					this.bookShelfData = res.data;
				})
			},
			delBookShelf(arr) { //删除历史请求
				const userId = uni.getStorageSync('userId');
				const token = uni.getStorageSync('token');
				Req.post('/readcard/delete', {
					userId: userId,
					token: token,
					id: arr
				}, res => {
					if (res) {
						this.reqBookShelf();
					}
				})
			}
		},
		onLoad() {
			//获取书架
		},
		onShow() {
			uni.getStorage({
				key: 'token',
				success: res => {
					this.reqBookShelf();
				},
				fail: res => {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			})	
		}
	}
</script>

<style scoped lang="less">
	page {
		background-color: #fff;
	}

	.edit-nav {
		margin: 20rpx;
		display: flex;
		justify-content: flex-end;
		position: fixed;
		top: 0rpx;
		right: 20rpx;
		z-index: 1000;

		.btn-edit,
		.btn-success {
			// background-color: #FFDE00;
			// position: absolute;
			// top: 0;
			// right: 20rpx;
		}
	}

	.bookShelf {
		padding: 20rpx 30rpx;

		.book {
			position: relative;

			.del-checkbox {
				width: 750rpx;
				height: 100%;
				position: absolute;
				top: 0;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				z-index: 56;

				.del-btn {
					margin-right: 100rpx;
				}
			}

			.e-navigator {
				display: flex;
				justify-content: flex-start;
				border-bottom: 1px solid #F5F5F5;
				padding: 30rpx 0;

				.img {
					width: 147rpx;
					height: 200rpx;
					margin-right: 20rpx;
					border-radius: 6rpx;
				}

				span {
					display: block;
					letter-spacing: 1rpx;
				}

				.name {
					font-size: 42rpx;
				}

				.author {
					font-size: 27rpx;
					color: #808080;
					margin-top: 20rpx;
				}

				.status {
					font-size: 30rpx;
					margin-top: 50rpx;
				}
			}
		}
	}
</style>