<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		}, 
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("./static/ifont/iconfont.css");
	page {
		background-color: #F5F5F5;
		word-spacing: 2rpx;
		letter-spacing: 0rpx;
		::-webkit-scrollbar {display:none}
	}
	uni-page-head .uni-page-head,
	.uni-page-head {
		// display: none;
		// height: 0;
	}
	uni-page-head .uni-page-head~.uni-placeholder {
		height: 90rpx !important;
	}
	uni-navigator {
		margin: 0;
		padding: 0;
	}
	.Tabs-Page {
	  .article {
	    &:not(:first-child) {
	      margin-top: 40rpx;
	    }
	    .title {
		  color: #007AFF;
	      padding: 20rpx;
	      font-size: 28rpx;
	      text-align: center;
	    }
	    .desc {
	      padding: 0 40rpx;
	      font-size: 26rpx;
	    }
	  }
	  /deep/.s-tabs { 
	    .s-tab-panel {
	      padding: 30rpx;
	    }
	  }
	  .custom-tabs {
	    /deep/.s-tab-nav-view {
	      display: flex;
	      justify-content: center;
	      .s-tab-nav {
	        &:not(:first-child) {
	          margin-left: 40rpx;
	        }
	      }
	    }
	  }
	}
	
</style>
