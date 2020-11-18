<template>
	<view>
		<view :class="['novel-details', backgroundClass]" ref="novelDetails">
			<view class="novel-title">
				{{ chapterData.title }}
			</view>
			<view :class="['novel-content', fontClass]" @click="changeMenuStatus()" ref="novelContent" v-html="chapterData.content">
			</view>
			<view class="novel-footer" v-show="controlStatus">
				<span @click="chapterHandle(-1)">上一章</span>
				<span @click="chapterHandle(1)">下一章</span>
			</view>
		</view>
		<view>
			<view :class="['ctrl-top',{'active':menuStatus}]" ref="ctrlTop">
				<view class="back-prev" @click="backPage">
					<span  class="iconfont icon-fanhui_xia"></span>
				</view>
			</view>
			<view :class="['ctrl-bottom',{'active':menuStatus}]" ref="ctrlBottom">
				<view class="select-content">
					<view class="chapter-ctrl" v-if="ctrlBottomIndex === 3">
						<span @click="chapterHandle(-1)">上一章</span>
						<span @click="chapterHandle(1)">下一章</span>
					</view>
					<view class="setting" v-if="ctrlBottomIndex === 4">
						<view>
							<span class="title">字号</span> <p><span @click="changeFontSize(-6)">A-</span><span class="font-fize">{{fontSize}}</span><span @click="changeFontSize(6)">A+</span></p>
						</view>
						<view class="background">
							<span class="title">背景</span> 
							<p>
								<view v-for="(item,index) in backgroudColor" :key="index" :class="activeColor === index ? 'active': ''">
									<span :style="'background-color: '+item + ';'" @click="changebackground(index)"></span>
								</view>
							</p>
						</view>
					</view>
				</view>
				<view class="ctrl-menu">
					<view @click="showChapter()">
						<span class="iconfont icon-mulu"></span>
						<div>目录</div>
					</view>
					<view @click="changeDayNight()">
						<span :class="dayOrNight?'iconfont icon-rijian':'iconfont icon-yejian'"></span>
						<div>{{dayOrNight?'日间':'夜间'}}</div>
					</view>
					<view @click="ctrlBottomIndex = 3">
						<span class="iconfont icon-jindu1"></span>
						<div>进度</div>
					</view>
					<view @click="ctrlBottomIndex = 4">
						<span class="iconfont icon-xitongshezhi"></span>
						<div>设置</div>
					</view>
				</view>
			</view>
		</view>
		<chapter-list v-show="chapterStatus" :chapterListData="chapterListData" :bookData="bookData" :chapterShow="chapterListShow" ref="chapterList"></chapter-list >
	</view>
</template>

<script>
	import chapterList from '../../components/chapter-list/chapter-list';
	import Req from '../../common/req.js';
	import Util from '../../common/util.js';
	export default {
		components: {
			chapterList
		},
		data() {
			return {
				menuStatus: false,   //菜单状态
				dayOrNight: true,   //true是白天，false是夜间
				backgroudColor: [   //北京色
					'#E6DFBD',
					'#4EEE94',
					'#FFF0F5',
					'#40E0D0',
					'#EED8AE'
				],
				backgroundClass: 'background0',	//背景颜色类名
				fontSize: 40,  //字体大小
				fontClass: 'font40',	//字体类名
				activeColor: 0,   //选中的颜色
				ctrlBottomIndex: -1,
				bookData: {
					id: 1,
					name: '九星霸体诀',
					authorName: '平凡的魔术师',
					status: 0,
					imgSrc: '../../static/images/mingren.jpg'
				},
				addBookShelf: false,  //加入书架的状态
				chapterStatus: false,
				screenWidth: 0,
				chapterTotal: 100000, //章节总数
				backNum: 0, //回退数
				chapterData: {}, //本章内容
				chapterListData: []   ,//章节列表数据
				controlStatus: false,	//隐藏上下章节按钮
				chapterListShow: false,	//章节面板状态
			};
		},
		methods: {
			changeMenuStatus() {  //改变菜单状态
				this.ctrlBottomIndex = -1;
				this.menuStatus = !this.menuStatus;
			},
			chapterHandle(num) { //某个章节
				this.getChapterReq(this.bookData.id, this.chapterData.chapterNum+num);
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100
				})
			},
			selectChapter(obj) {
				this.getChapterReq(this.bookData.id, obj.num);
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100
				})
			},
			changeDayNight() {  //切换白天和夜间
				this.ctrlBottomIndex = 2;
				this.dayOrNight = !this.dayOrNight;
				if(this.dayOrNight) {
					this.backgroundClass = uni.getStorageSync('backgroundColor');
					uni.setStorage({
						key: 'dayOrNight',
						data: true
					})
				} else {
					this.backgroundClass = 'night';
					uni.setStorage({
						key: 'dayOrNight',
						data: false
					})
				}
			},
			colorActive(index) {   //选中背景色
				return this.activeColor === index ? 'active': '';
			},
			changeFontSize(num) {    //改变字体大小
				this.fontSize += num;
				if(this.fontSize <= 28 || this.fontSize >= 70) {
					this.fontSize -= num;
					return;
				}
				uni.setStorage({
					key: 'fontSize',
					data: this.fontSize
				})
				this.fontClass = 'font' + this.fontSize;
			},
			showChapter() {	//显示章节
				this.ctrlBottomIndex = 1;
				this.chapterStatus = true;
				this.chapterListShow = true;
				this.menuStatus = false;
				// this.changeMenuStatus();
				//获取章节列表
				Req.getChapter({id: this.bookData.id}, res => {
					this.chapterListData = res.data;
				})
				
				
				
			},
			handleShadow() {  //点击遮罩层
				this.ctrlBottomIndex = -1;
				this.chapterListShow = false;
			},
			changebackground(index) {  //更换背景
				this.activeColor = index;
				this.backgroundClass = 'background'+index;
				uni.setStorage({
					key: 'backgroundColor',
					data: 'background'+index
				})
			},
			backPage() {  //返回上一个页面
				uni.navigateBack({
				    delta: 1,
				    animationType: 'pop-out',
				    animationDuration: 200
				});
			},
			getChapterReq(bookId, num, callback) {  //获取某章内容			
				if(num<0) {
					uni.showToast({
						title: '已是第一章',
						position: 'bottom'
					})
					return;
				} else if(num>this.chapterTotal) {
					uni.showToast({
						title: '已是最后一章',
						position: 'bottom'
					})
					return;
				}
				//获取某章
				uni.showLoading({
				    title: '加载中'
				});
				this.controlStatus = false;
				Req.getRecChapter({
					bookId: bookId,
					num: num
				}, (res) => {
					this.chapterData = res.data[0];
					console.log(this.chapterData)
					// this.chapterData.content = Util.pToView(this.chapterData.content, 'data-v-1b0037f2');
					uni.hideLoading();
					this.$nextTick(function(){
						console.log(this.$refs)
						// this.$refs.novelContent.$el.innerHTML = this.chapterData.content;
						console.log(this.chapterData.chapterNum)
						callback && callback();
						if(this.addBookShelf) {
							this.updateBookShelf(this.bookData.id, this.chapterData.chapterNum);
						}	
					}) 
				})
			},
			isBookShelfed(bookId) {  //是否被加入书架
				const userId = uni.getStorageSync('userId');
				Req.get('/bookshelf/exits', {
					userId: userId,
					bookId: bookId
				}, res => {
					if(res.data) {
						this.addBookShelf = true;
					}
				})
			},
			hasReadCard(bookId, callback) {
				const userId = uni.getStorageSync('userId');
				Req.get('/readcard/exits', {	//判断是否有历史记录
					userId: userId,
					bookId: bookId
				}, res => {
					callback && callback(res);
				})
			},
			addToReadCard(bookId, callback) { ///加入历史记录
				const userId = uni.getStorageSync('userId');
				Req.post('/readcard', {
					userId: userId,
					bookId: bookId
				}, res => {
					callback && callback(res);
				})
			},
			updateReadCard(bookId, callback) {	//更新历史记录
				const userId = uni.getStorageSync('userId');
				Req.put('/readcard', {
					userId: userId,
					bookId: bookId
				}, res => {
					callback && callback(res);
				})
			},
			updateBookShelf(bookId, chapterNum) {  //更新书架
				const userId = uni.getStorageSync('userId');
				Req.put('/bookshelf', {
					userId: userId,
					bookId: bookId,
					chapterNum: chapterNum
				})
			},
			leaveDetail() {	//离开页面
				const userId = uni.getStorageSync('userId');
				console.log("离开页面，询问是否加入书架")
			}
		},
		onLoad(option) {
			uni.showLoading({
			    title: '加载中'
			});
			console.log(option)
			//获取书籍
			Req.getBook({id: option.bookId}, res => {
				console.log(res.data)
				this.bookData = res.data.data[0];
				this.chapterTotal = res.data.chapterTotal;
				console.log(this.chapterTotal,"llls")
			})
			//获取某章
			this.getChapterReq(option.bookId, option.chapterNum, () => {
				this.controlStatus = true;
			});
			uni.$on('clickShadow',this.handleShadow);
			uni.$on('selectChapter',this.selectChapter);
			
			//获取字体大小
			uni.getStorage({
				key: 'fontSize',
				success: res => {
					this.fontSize = res.data
					this.fontClass = 'font'+this.fontSize;
				},
				fail: () => {
					uni.setStorage({
						key: 'fontSize',
						data: 40
					})
				}
			})
			//获取背景色
			uni.getStorage({
				key: 'backgroundColor',
				success: res => {
					this.backgroundClass = res.data;
					this.activeColor = parseInt(this.backgroundClass.substring(10));
					console.log(this.activeColor,this.backgroundClass.substring(10), "llk")
				},
				fail: () => {
					uni.setStorage({
						key: 'backgroundColor',
						data: 'background0'
					})
				}
			})
			//获取状态背景
			// uni.getStorage({
			// 	key: 'dayOrNight',
			// 	success: res => {
			// 		this.dayOrNight = !res.data;
			// 		console.log(res.data,this.dayOrNight)
			// 		this.$nextTick(function(){
			// 			this.changeDayNight();
			// 		})
			// 	},
			// 	fail: () => {
			// 		uni.setStorage({
			// 			key: 'dayOrNight',
			// 			data: true
			// 		})
			// 	}
			// })
			uni.getStorage({
				key: 'token',
				success: res => {
					var token = res.data;
					this.isBookShelfed(option.bookId);
					this.hasReadCard(option.bookId, res => {
						console.log(res)
						if(res.data) {
							this.updateReadCard(option.bookId);
						} else {
							this.addToReadCard(option.bookId);
						}
					})
				}
			})
			
		},
		mounted() {
			var _this = this;
			this.screenWidth = uni.getSystemInfoSync().windowWidth
		}
	}
</script>

<style lang="less">
	uni-page-head .uni-page-head,
	.uni-page-head {
		// display: none;
		// height: 78px;
	}
	page {
		// margin-top: 78rpx;
		
	}
	.novel-details {
		background-color: #E6DFBD;
		padding: 50rpx 36rpx 50rpx 46rpx;
		&.background0 {
			background-color: #E6DFBD;
		}
		&.background1 {
			background-color: #4EEE94;
		}
		&.background2 {
			background-color: #FFF0F5;
		}
		&.background3 {
			background-color: #40E0D0;
		}
		&.background4 {
			background-color: #EED8AE;
		}
		&.night {
			background-color: #000;
			color: #fff;
		}
		.novel-title {
			margin: 20rpx 0;
			margin-right: 12rpx;
			font-weight: 200;
			font-size: 30rpx;
		}
		.novel-content {
			font-weight: 400;
			letter-spacing: 1rpx;
			font-size: 40rpx;
			// line-height: 50rpx;
			.content-p {
				// line-height: 70rpx;
				text-indent: 2em;
				text-align:justify;
				margin-bottom: 30rpx;
				margin-top: 30rpx;
			}
			&.font34 {
				font-size: 34rpx;
			}
			&.font40 {
				font-size: 40rpx;
			}
			&.font46 {
				font-size: 46rpx;
			}
			&.font52 {
				font-size: 52rpx;
			}
			&.font58 {
				font-size: 58rpx;
			}
			&.font64 {
				font-size: 64rpx;
			}
			
		}
		.novel-footer {
			display: flex;
			justify-content: space-between;
			span {
				padding: 20rpx 30rpx;
			}
		}
	}
	
	.ctrl-top {
		width: 750rpx;
		position: fixed;
		top: -245rpx;
		z-index: 999;
		color: #FFFFFF;
		background-color: #333333;
		transition: all .5s;
		.back-prev {
			padding: 30rpx 50rpx;
		}
		&.active {
			top: 0;
		}
	}
	.ctrl-bottom {
		width: 750rpx;
		position: fixed;
		bottom: -245rpx;
		z-index: 999;
		color: #FFFFFF;
		background-color: #333333;
		transition: all .5s;
		&.active {
			bottom: 0;
		}
		.select-content {
			font-size: 30rpx;
			.chapter-ctrl {
				display: flex;
				justify-content: space-between;
				
				span {
					padding: 30rpx 70rpx;
				}
			}
			.setting {
				view {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding: 20rpx 0;
					padding-left: 70rpx;
					p {
						span {
							border: 2rpx solid #fff;
							padding: 8rpx 40rpx;
							border-radius: 50rpx;
						}
						.font-fize {
							border: none;
							color: #C0C0C0;
						}
					}
				}
				.background {
					p {
						display: flex;
						justify-content: center;
						view {
							padding: 5rpx;
							margin-right: 35rpx;
							border: 2rpx solid #333333;
							border-radius: 50%;
							span {
								display: inline-block;
								padding: 30rpx;

								border-radius: 50%;
							}
						}
						view.active {
							border: 2rpx solid #fff;
						}
					}
				}
			}
			
			.title {
				font-size: 34rpx;
				margin-right: 30rpx;
			}
		}
		
		.ctrl-menu {
			display: flex;
			justify-content: space-between;
			
			view {
				flex: 0 0 25%;
				text-align: center;
				padding: 30rpx 0;
				div {
					font-size: 25rpx;
				}
			}
		}
	}
</style>
