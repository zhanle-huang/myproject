(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/boy-novel/boy-novel"],{"0193":function(t,n,a){"use strict";a.r(n);var e=a("a58a"),o=a.n(e);for(var u in e)"default"!==u&&function(t){a.d(n,t,(function(){return e[t]}))}(u);n["default"]=o.a},"151b":function(t,n,a){"use strict";a.r(n);var e=a("8b58"),o=a("0193");for(var u in o)"default"!==u&&function(t){a.d(n,t,(function(){return o[t]}))}(u);var i,r=a("f0c5"),l=Object(r["a"])(o["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],i);n["default"]=l.exports},"8b58":function(t,n,a){"use strict";var e;a.d(n,"b",(function(){return o})),a.d(n,"c",(function(){return u})),a.d(n,"a",(function(){return e}));var o=function(){var t=this,n=t.$createElement;t._self._c},u=[]},a58a:function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={props:{sexSwiperData:{type:Array,default:function(){return[]}},hotTitle:{type:String,default:""},tips:{type:String,default:""},tipIcon:{type:String,default:""},sexTipHandle:{type:Function,default:null},sexHotData:{type:Array,default:function(){return[]}}},data:function(){return{indicatorDots:!0,autoplay:!0,interval:2500,duration:500}},methods:{changeIndicatorDots:function(t){this.indicatorDots=!this.indicatorDots},changeAutoplay:function(t){this.autoplay=!this.autoplay},intervalChange:function(t){this.interval=t.target.value},durationChange:function(t){this.duration=t.target.value},boyTipHandle:function(){console.log("男生热门")}},onLoad:function(){console.log(this.boySwiperData)}};n.default=e}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/boy-novel/boy-novel-create-component',
    {
        'components/boy-novel/boy-novel-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("151b"))
        })
    },
    [['components/boy-novel/boy-novel-create-component']]
]);
