(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/book-list/book-list"],{"2b38":function(t,n,a){"use strict";var e;a.d(n,"b",(function(){return r})),a.d(n,"c",(function(){return u})),a.d(n,"a",(function(){return e}));var r=function(){var t=this,n=t.$createElement,a=(t._self._c,t.__map(t.bookListData,(function(n,a){var e=t.__get_orig(n),r=t.statusToText(n.status),u=t._f("formatNumber")(n.total/1e4);return{$orig:e,m0:r,f0:u}})));t.$mp.data=Object.assign({},{$root:{l0:a}})},u=[]},"7d25":function(t,n,a){"use strict";var e=a("bda9"),r=a.n(e);r.a},8036:function(t,n,a){"use strict";a.r(n);var e=a("2b38"),r=a("a13e");for(var u in r)"default"!==u&&function(t){a.d(n,t,(function(){return r[t]}))}(u);a("7d25");var o,c=a("f0c5"),i=Object(c["a"])(r["default"],e["b"],e["c"],!1,null,"46ae575a",null,!1,e["a"],o);n["default"]=i.exports},a13e:function(t,n,a){"use strict";a.r(n);var e=a("d0a9"),r=a.n(e);for(var u in e)"default"!==u&&function(t){a.d(n,t,(function(){return e[t]}))}(u);n["default"]=r.a},bda9:function(t,n,a){},d0a9:function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"bookList",props:{bookListData:{type:Array,default:function(){return[]}}},data:function(){return{}},methods:{statusToText:function(t){switch(t){case 0:return"完结";case 1:return"连载中";case 2:return"停更"}}}};n.default=e}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/book-list/book-list-create-component',
    {
        'components/book-list/book-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8036"))
        })
    },
    [['components/book-list/book-list-create-component']]
]);
