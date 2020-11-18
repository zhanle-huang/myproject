import Vue from 'vue'
import App from './App'
import NavBar from '@/components/lz-navBar/navBar.vue'
import sTabs from '@/components/s-tabs/index.vue';
import sTab from '@/components/s-tab/index.vue';
import bookList from '@/components/book-list/book-list.vue';
import cardBox from '@/components/card-box/card-box.vue';
import nameList from '@/components/name-list/name-list.vue';
import briefBook from '@/components/brief-book/brief-book.vue';
import categoryList from '@/components/sideCategoryList/category-list.vue';
import categoryCard from '@/components/category-card/category-card.vue';
import listCard from '@/components/list-card/list-card.vue';
import leftCategory from '@/components/left-category/left-category.vue';
import swiperTab from '@/components/swiper-tab/swiper-tab.vue';
import titleList from '@/components/title-list/title-list.vue';
import vTabs from '@/components/v-tabs/v-tabs.vue';
import boyNovel from '@/components/boy-novel/boy-novel.vue';
import evanForm from '@/components/evan-form/evan-form.vue';
import evanFormItem from '@/components/evan-form-item/evan-form-item.vue';
import mingPop from '@/components/ming-pop/ming-pop.vue';


Vue.config.productionTip = false
Vue.component("NavBar", NavBar);
Vue.component("sTab", sTab);
Vue.component("sTabs", sTabs);
Vue.component("bookList", bookList);
Vue.component('cardBox', cardBox);
Vue.component('nameList', nameList); 
Vue.component('briefBook', briefBook);
Vue.component('categoryList', categoryList);
Vue.component('categoryCard', categoryCard);
Vue.component('listCard', listCard);
Vue.component('leftCategory', leftCategory);
Vue.component('swiperTab', swiperTab);
Vue.component('titleList', titleList);
Vue.component('vTabs', vTabs);
Vue.component('boyNovel', boyNovel);
Vue.component('evanForm', evanForm);
Vue.component('evanFormItem', evanFormItem);
Vue.component('mingPop', mingPop);


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
Vue.filter('formatNumber', function(msg) {
	return msg.toFixed(2);
})


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
