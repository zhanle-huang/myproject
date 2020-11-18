<template>
	<view>
		<view>
			<evan-form :model="info" :label-position="'top'" :label-style="{fontSize: '35rpx',color: '#808080',paddingLeft: '20rpx'}"
			 :rules="rules">
				<evan-form-item :label="'账号:'" prop="userId">
					<input v-model="info.userId" />
				</evan-form-item>
				<evan-form-item :label="'密码:'" prop="pwd">
					<input v-model="info.pwd" password="true"/>
				</evan-form-item>
				<evan-form-item :label="'确认密码:'" prop="repwd">
					<input v-model="info.repwd" password="true"/>
				</evan-form-item>
				<evan-form-item :label="'手机号:'" prop="phone">
					<input v-model="info.phone" />
				</evan-form-item>
			</evan-form>
		</view>
		<view class="submitCtrol">
			<button class="register-btn" type="primary" @click="submitFrom()">注册</button>
		</view>
		
		<mingPop class="mingPop" ref="pop" direction="below" :is_close="true" :is_mask="true" :width="100">{{ popValue }}</mingPop>
	</view>
</template>

<script>
	import Req from '../../common/req.js';
	export default {
		data() {
			return {
				info: {
					userId: '',
					pwd: '',
					repwd: '',
					phone: ''
				},
				rules: {
					userId: [{
						required: true,
						message: '请输入账号'
					}],
					pwd: [{
						required: true,
						message: '请输入密码'
					}],
					repwd: [{
						required: true,
						message: '请输入确认密码'
					}],
					phone: [{
						required: true,
						message: '请输入手机号'
					}]
				},
				regs: {
					userId: {
						reg: /^(?:\w)+$/g
					},
					phone: {
						reg: /^1[3456789]\d{9}$/g
					},
				},
				popValue: ''
			};
		},
		methods: {
			submitFrom() {
				if( !/^(?:\w)+$/g.test(this.info.userId)) {
					this.popValue = "账号非法";
					console.log(this.regs.userId.reg,this.info.userId)
					
					uni.showToast({
						title: '账号非法',
						position: 'bottom'
					})
					return;
				}
				if( this.info.pwd !== this.info.repwd ) {
					this.popValue = "两次输入的密码不对";
					
					uni.showToast({
						title: '两次输入的密码不对',
						position: 'bottom'
					})
					return;
				}
				if( !/^1[3456789]\d{9}$/g.test( this.info.phone ) ) {
					console.log(this.regs.userId.reg,this.info.userId)
					this.popValue = "手机号不对";
					uni.showToast({
						title: '手机号不对',
						position: 'bottom'
					})
					return;
				}
				console.log(this.info)
				Req.post('/reader/register', this.info, res => {
					if(res.data.status === 0) {
						uni.showToast({
							icon: 'none',
							title: res.data.statusInfo.message,
							duration: 1000
						})
						
					} else {
						console.log(res.data)
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
				})
			}
		},
		mounted() {
			
		}
	}
</script>

<style lang="less">
	page {
		background-color: #fff;
		padding-top: 50rpx;
	}

	input {
		padding-left: 30rpx;
		color: #555555;
	}

	.submitCtrol {
		padding: 0 30rpx;
		margin-top: 150rpx;
		.register-btn {
			background-color: #FFDE00;
		}
	}
	.mingPop {
		text-align: center;
		color: #555555;
	}
</style>
