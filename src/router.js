import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import index from './pages/index/index.vue';
import pannel from './pages/pannel/pannel.vue';
import pannel2 from './pages/pannel2/pannel2.vue';
import pannel3 from './pages/pannel3/pannel3.vue';
import pannel4 from './pages/pannel4/pannel4.vue';
import pannel5 from './pages/pannel5/pannel5.vue';
import pannel6 from './pages/pannel6/pannel6.vue';
import pannel7 from './pages/pannel7/pannel7.vue';
import NotFoundComponent from './pages/errorPage/errorPage.vue';


export default new Router ({
    mode:'history',
    // base:'dp',
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/wtgz',
            name:'Wtgz',
            component: pannel,
            meta:{
                title:'问题跟踪分析'
            }
        },
        {
            path: '/gcys',
            component: pannel2,
            meta:{
                title:'工程验收分析'
            }
        },
        {
            path: '/gcwg',
            component: pannel3,
            meta:{
                title:'工程完工分析'
            }
        },
        {
            path: '/pannel4',
            component: pannel4,
            meta:{
                title:'问题跟踪分析'
            }
        },
        {
            path: '/gcry',
            component: pannel5,
            meta:{
                title:'工程人员概况'
            }
        },
        {
            path: '/gccb',
            component: pannel6,
            meta:{
                title:'工程成本分析'
            }
        },
        {
            path: '/gczh',
            component: pannel7,
            meta:{
                title:'工程综合概况'
            }
        },
        {
            path: "/404",
            name: "notFound",
            component: NotFoundComponent,
            meta:{
                title:'404'
            }
        },
        {
            path: "*", // 此处需特别注意置于最底部
            redirect: "/404"
        }
    ]
});