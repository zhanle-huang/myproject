
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/category/category","pages/bookShelf/bookShelf","pages/my/my","pages/novelKind/novelKind","pages/book/book","pages/login/login","pages/register/register","pages/details/details","pages/setting/setting","pages/search/search","pages/readcard/readcard","pages/vip/vip","pages/likeread/likeread"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"jojo","navigationBarBackgroundColor":"#FFDE00","backgroundColor":"#FFFFFF","enablePullDownRefresh":true},"tabBar":{"color":"#262822","selectedColor":"262822","list":[{"text":"首页","pagePath":"pages/index/index","iconPath":"static/icons/home.png","selectedIconPath":"static/icons/home1.png"},{"text":"分类","pagePath":"pages/category/category","iconPath":"static/icons/category.png","selectedIconPath":"static/icons/categoried.png"},{"text":"书架","pagePath":"pages/bookShelf/bookShelf","iconPath":"static/icons/bookshelf.png","selectedIconPath":"static/icons/bookshelfed.png"},{"text":"我的","pagePath":"pages/my/my","iconPath":"static/icons/my.png","selectedIconPath":"static/icons/myed.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"不想用的程序","compilerVersion":"2.9.3","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarTitleText":"","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#F5F5F5"}},{"path":"/pages/category/category","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#fff","enablePullDownRefresh":false}},{"path":"/pages/bookShelf/bookShelf","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"书架","enablePullDownRefresh":false}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":false}},{"path":"/pages/novelKind/novelKind","meta":{},"window":{"navigationBarTitleText":"小说分类","enablePullDownRefresh":false}},{"path":"/pages/book/book","meta":{},"window":{"navigationBarTitleText":"小说分类","enablePullDownRefresh":false}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"注册","enablePullDownRefresh":false}},{"path":"/pages/details/details","meta":{},"window":{"navigationBarBackgroundColor":"#E6DFBD","enablePullDownRefresh":false,"navigationBarTitleText":"","navigationBarTextStyle":"black"}},{"path":"/pages/setting/setting","meta":{},"window":{"navigationBarTitleText":"系统设置","enablePullDownRefresh":false}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"搜索","enablePullDownRefresh":false}},{"path":"/pages/readcard/readcard","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/vip/vip","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/likeread/likeread","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});