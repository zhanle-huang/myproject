(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-novelKind-novelKind"],{"1f8d":function(t,a,e){"use strict";e.r(a);var o=e("aa4a"),n=e("aa5f");for(var i in n)"default"!==i&&function(t){e.d(a,t,(function(){return n[t]}))}(i);e("f457");var r,u=e("f0c5"),c=Object(u["a"])(n["default"],o["b"],o["c"],!1,null,"96c894bc",null,!1,o["a"],r);a["default"]=c.exports},2909:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=c;var o=u(e("6005")),n=u(e("db90")),i=u(e("06c5")),r=u(e("3427"));function u(t){return t&&t.__esModule?t:{default:t}}function c(t){return(0,o.default)(t)||(0,n.default)(t)||(0,i.default)(t)||(0,r.default)()}},3427:function(t,a,e){"use strict";function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Object.defineProperty(a,"__esModule",{value:!0}),a.default=o},5965:function(t,a,e){var o=e("f9d7");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var n=e("4f06").default;n("eff026de",o,!0,{sourceMap:!1,shadowMode:!1})},6005:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=i;var o=n(e("6b75"));function n(t){return t&&t.__esModule?t:{default:t}}function i(t){if(Array.isArray(t))return(0,o.default)(t)}},aa4a:function(t,a,e){"use strict";var o;e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return o}));var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",[e("v-uni-view",{staticClass:"kind"},[e("span",{class:-1===t.activeCategory?"active":"",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.clickAllHandle.apply(void 0,arguments)}}},[t._v("全部")]),t._l(t.kindData,(function(a,o){return e("span",{key:a.categoryId,class:t.activeCategory===o?"active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.kindHandle(a.categoryId,o)}}},[t._v(t._s(a.name))])}))],2),e("v-uni-view",[e("bookList",{attrs:{bookListData:t.bombFinal}})],1)],1)},i=[]},aa5f:function(t,a,e){"use strict";e.r(a);var o=e("b21d"),n=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(a,t,(function(){return o[t]}))}(i);a["default"]=n.a},b21d:function(t,a,e){"use strict";var o=e("4ea4");e("99af"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=o(e("2909")),i=o(e("7f90")),r={data:function(){return{activeCategory:-1,bookParam:{pageNum:1,categoryId:1},kindData:[],bombFinal:[]}},methods:{clickAllHandle:function(){this.bombFinal=[],console.log("全部"),this.activeCategory=-1,uni.showLoading({title:"加载中"}),this.reqAllBook(this.bookParam.pageNum,20)},kindHandle:function(t,a){this.bombFinal=[],this.bookParam.pageNum=1,console.log("获取分类id为"+t),this.activeCategory=a,this.bookParam.categoryId=t,uni.showLoading({title:"加载中"}),this.reqBookByCategory(this.bookParam.categoryId,this.bookParam.pageNum,20,(function(){uni.hideLoading()}))},reqCategory:function(){var t=this;i.default.get("/category",{},(function(a){t.kindData=a.data}))},reqBookByCategory:function(t,a,e,o){var r=this;i.default.get("/book",{categoryId:t,pageNum:a,pageSize:e},(function(t){o&&o(),1!==t.data.status?(r.bombFinal=[].concat((0,n.default)(r.bombFinal),(0,n.default)(t.data)),r.bookParam.pageNum++):uni.showToast({title:"已无更多内容",position:"bottom"})}))},reqAllBook:function(t,a){var e=this;i.default.get("/book/all",{pageNum:t,pageSize:a},(function(t){uni.hideLoading(),1!==t.data.status?e.bombFinal=[].concat((0,n.default)(e.bombFinal),[t.data]):uni.showToast({title:"已无更多内容",position:"bottom"})}))}},onLoad:function(t){uni.showLoading({title:"加载中"}),this.reqCategory(),this.reqBookByCategory(t.categoryId,this.bookParam.pageNum,20,(function(){uni.hideLoading()}))},onReachBottom:function(){console.log("触底"),console.log(this.bookParam.pageNum),this.reqBookByCategory(this.bookParam.categoryId,this.bookParam.pageNum,20)}};a.default=r},db90:function(t,a,e){"use strict";function o(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}e("a4d3"),e("e01a"),e("d28b"),e("a630"),e("d3b7"),e("3ca3"),e("ddb0"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=o},f457:function(t,a,e){"use strict";var o=e("5965"),n=e.n(o);n.a},f9d7:function(t,a,e){var o=e("24fb");a=o(!1),a.push([t.i,"uni-page-body[data-v-96c894bc]{background-color:#fff}.kind[data-v-96c894bc]{padding:%?30?%;border-bottom:1px solid #ebeef5;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-flex-wrap:wrap;flex-wrap:wrap}.kind span[data-v-96c894bc]{padding:%?15?% %?30?%;background-color:#e9c341;border-radius:%?50?%;margin-right:%?15?%;margin-bottom:15px;font-size:%?28?%;color:#fff}.kind span.active[data-v-96c894bc]{background-color:#fff;color:#e9c341}body.?%PAGE?%[data-v-96c894bc]{background-color:#fff}",""]),t.exports=a}}]);