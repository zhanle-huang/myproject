(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/register"],{"1b7c":function(e,t,r){},"58f4":function(e,t,r){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=n(r("7f90"));function n(e){return e&&e.__esModule?e:{default:e}}var i={data:function(){return{info:{userId:"",pwd:"",repwd:"",phone:""},rules:{userId:[{required:!0,message:"请输入账号"}],pwd:[{required:!0,message:"请输入密码"}],repwd:[{required:!0,message:"请输入确认密码"}],phone:[{required:!0,message:"请输入手机号"}]},regs:{userId:{reg:/^(?:\d|\w)+$/g},phone:{reg:/^1[3456789]\d{9}$/g}},popValue:""}},methods:{submitFrom:function(){return this.info.userId&&!this.regs.userId.reg.test(this.info.userId)?(console.log(e("账号非法"," at pages\\register\\register.vue:72")),this.popValue="账号非法",void this.$refs.pop.show()):this.info.pwd!==this.info.repwd?(console.log(e("两次输入的密码不对"," at pages\\register\\register.vue:78")),this.popValue="两次输入的密码不对",void this.$refs.pop.show("两次输入的密码不对")):this.regs.phone.reg.test(this.info.phone)?(console.log(e(this.info," at pages\\register\\register.vue:89")),void s.default.post("/reader/register",this.info,function(t){t.data?(console.log(e(t.data," at pages\\register\\register.vue:92")),o.navigateTo({url:"/pages/login/login"})):o.showToast({title:"注册失败",duration:100})})):(console.log(e("手机号不对"," at pages\\register\\register.vue:84")),this.popValue="手机号不对",void this.$refs.pop.show("手机号不对"))}},mounted:function(){}};t.default=i}).call(this,r("0de9")["default"],r("6e42")["default"])},"645f":function(e,t,r){"use strict";r.r(t);var o=r("d4ff"),s=r("b131");for(var n in s)"default"!==n&&function(e){r.d(t,e,function(){return s[e]})}(n);r("91d4");var i=r("2877"),u=Object(i["a"])(s["default"],o["a"],o["b"],!1,null,null,null);t["default"]=u.exports},"91d4":function(e,t,r){"use strict";var o=r("1b7c"),s=r.n(o);s.a},b131:function(e,t,r){"use strict";r.r(t);var o=r("58f4"),s=r.n(o);for(var n in o)"default"!==n&&function(e){r.d(t,e,function(){return o[e]})}(n);t["default"]=s.a},be95:function(e,t,r){"use strict";(function(e){r("b9b0"),r("921b");o(r("66fd"));var t=o(r("645f"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("6e42")["createPage"])},d4ff:function(e,t,r){"use strict";var o=function(){var e=this,t=e.$createElement,r=(e._self._c,{fontSize:"35rpx",color:"#808080",paddingLeft:"20rpx"});e.$mp.data=Object.assign({},{$root:{a0:r}})},s=[];r.d(t,"a",function(){return o}),r.d(t,"b",function(){return s})}},[["be95","common/runtime","common/vendor"]]]);