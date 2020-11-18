<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		props: {
			currentTab: {  //tab的默认选项
				type: Number,
				default: 0
			},
			tabs: {   //tab的选项
				type: Array,
				default() {
					return [];
				}
			},
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="less">
	
</style>
