### 版本号
1.0.2

### 描述
侧边栏导航，类似于美团外卖商品列表页，支持右侧滚动时左侧对应到相应锚点，支持右侧滚动时对应锚点吸顶。

### 使用方式
```
<category-list :height="400" :defaultActive="2" :offsetTop="200" :categoryList="categoryList" @categoryMainClick="categoryMainClick"
		 @categorySubClick="categorySubClick"></category-list>
```

### 参数说明
| 属性名 | 说明 | 类型 | 默认值 | 备注
| ------ | ------ | ------ | ------ | ------ |
| height | 当前列表的高度 | Number | 屏幕高度  | 单位：px |
| sticky | 是否开启锚点自动吸顶 | Boolean | true | |
| offsetTop | 锚点自动吸顶时与顶部的距离 | Number | 0 | 单位：px |
| defaultActive | 默认选中的index值 | Number | 0 | |
| zIndex | 锚点吸顶时的层级 | Number | 965 | |
| categoryList | 列表 | Array | [] | 结构为[{name: 'xx', subCategoryList: []}] |
| label | 内容列表中label对应的key名字 | String | 'name' | |
| activeTextColor | 左侧选中时文字颜色 | String | '#2979ff' | |
| activeBackgroundColor | 左侧选中时文字背景色 | String | '#eeeeee' | |
| categoryMainClick | 选中左侧索引时触发 | Function |  | |
| categorySubClick | 选中右侧内容项时触发 | Function |  | |

### 注意事项
1.方法`$getRect`为全局方法，用于查询节点信息，参考了 uView 的 `$uGetRect`，该方法可定义在入口文件。
`getRect` 挂载到`Vue.prototype`上，因为这方法需要使用`in(this)`，所以无法把它独立成一个单独的文件导出。
若项目中已引用uView库，则将该组件里使用的 `$getRect` 方法替换为 uView 对应方法`$uGetRect`即可。

```
// 入口文件 main.js
Vue.prototype.$getRect = function(selector, all) {
	return new Promise(resolve => {
		uni.createSelectorQuery().
		in(this)[all ? 'selectAll' : 'select'](selector)
			.boundingClientRect(rect => {
				if (all && Array.isArray(rect) && rect.length) {
					resolve(rect)
				}
				if (!all && rect) {
					resolve(rect)
				}
			})
			.exec()
	})
}

```
2.`offset`字段中已做了适配浏览器的处理（顶部增加44px）。

