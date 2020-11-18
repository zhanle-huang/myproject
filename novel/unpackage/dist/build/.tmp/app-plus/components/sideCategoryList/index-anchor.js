(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/sideCategoryList/index-anchor"],{1941:function(t,e,n){"use strict";n.r(e);var u=n("c637"),c=n("5f00");for(var a in c)"default"!==a&&function(t){n.d(e,t,function(){return c[t]})}(a);n("c1de");var r=n("2877"),o=Object(r["a"])(c["default"],u["a"],u["b"],!1,null,"c14a39ba",null);e["default"]=o.exports},"361c":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"u-index-anchor",props:{useSlot:{type:Boolean,default:!1},index:{type:String,default:""},customStyle:{type:Object,default:function(){return{}}}},data:function(){return{active:!1,wrapperStyle:{},anchorStyle:{}}},inject:["UIndexList"],mounted:function(){this.UIndexList.children.push(this),this.UIndexList.updateData()},computed:{customAnchorStyle:function(){return Object.assign(this.anchorStyle,this.customStyle)}}};e.default=u},"5f00":function(t,e,n){"use strict";n.r(e);var u=n("361c"),c=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,function(){return u[t]})}(a);e["default"]=c.a},c1de:function(t,e,n){"use strict";var u=n("e2ff"),c=n.n(u);c.a},c637:function(t,e,n){"use strict";var u=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__get_style([t.wrapperStyle])),u=t.__get_style([t.customAnchorStyle]);t.$mp.data=Object.assign({},{$root:{s0:n,s1:u}})},c=[];n.d(e,"a",function(){return u}),n.d(e,"b",function(){return c})},e2ff:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/sideCategoryList/index-anchor-create-component',
    {
        'components/sideCategoryList/index-anchor-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("1941"))
        })
    },
    [['components/sideCategoryList/index-anchor-create-component']]
]);                
