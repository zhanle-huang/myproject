(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/lz-navBar/navBar"],{"10b7":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(e.bind(null,"dab4"))},u={name:"NavBar",components:{uniIcons:a},data:function(){return{navBar:{top:0,height:0}}},props:{background:{type:String,default:"#fff"},color:{type:String,default:"#333"},title:{type:String,default:""},backBtn:{type:Boolean,default:!0}},mounted:function(){this.navBar.top=n.getSystemInfoSync()["statusBarHeight"],this.navBar.height=40},methods:{back:function(){n.navigateBack({delta:1})}}};t.default=u}).call(this,e("6e42")["default"])},"3f74":function(n,t,e){"use strict";var a=e("a65d"),u=e.n(a);u.a},7695:function(n,t,e){"use strict";e.r(t);var a=e("7dd6"),u=e("9644");for(var o in u)"default"!==o&&function(n){e.d(t,n,function(){return u[n]})}(o);e("3f74");var r=e("2877"),i=Object(r["a"])(u["default"],a["a"],a["b"],!1,null,null,null);t["default"]=i.exports},"7dd6":function(n,t,e){"use strict";var a=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"a",function(){return a}),e.d(t,"b",function(){return u})},9644:function(n,t,e){"use strict";e.r(t);var a=e("10b7"),u=e.n(a);for(var o in a)"default"!==o&&function(n){e.d(t,n,function(){return a[n]})}(o);t["default"]=u.a},a65d:function(n,t,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/lz-navBar/navBar-create-component',
    {
        'components/lz-navBar/navBar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("7695"))
        })
    },
    [['components/lz-navBar/navBar-create-component']]
]);                
