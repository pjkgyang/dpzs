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
import pannel8 from './pages/pannel8/pannel8.vue';

import ryreport from './pages/report/ry-report.vue';
import yswgreport from './pages/report/yswg-report.vue';
import wgpannel from './pages/report/wgPannel.vue';
import yspannel from './pages/report/ysPannel.vue';
import gcpannel from './pages/report/gcReport.vue';
import ekpannel from './pages/report/ekReport.vue';
import kbpannel from './pages/report/kbReport.vue';

import NotFoundComponent from './pages/errorPage/errorPage.vue';


export default new Router({
    mode: 'history',
    base:'dp',
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/wtgz',
            name: 'Wtgz',
            component: pannel,
            meta: {
                title: '问题跟踪分析'
            }
        },
        {
            path: '/gcys',
            component: pannel2,
            meta: {
                title: '工程验收分析'
            }
        },
        {
            path: '/gcwg',
            component: pannel3,
            meta: {
                title: '工程完工分析'
            }
        },
        {
            path: '/pannel4',
            component: pannel4,
            meta: {
                title: '问题跟踪分析'
            }
        },
        {
            path: '/gcry',
            component: pannel5,
            meta: {
                title: '工程人员概况'
            }
        },
        {
            path: '/gccb',
            component: pannel6,
            meta: {
                title: '工程成本分析'
            }
        },
        {
            path: '/gczh',
            component: pannel7,
            meta: {
                title: '工程综合概况'
            }
        },
        {
            path: '/fwt',
            name: 'Fwt',
            component: pannel8,
            meta: {
                title: '服务台'
            }
        },
        {
            path: '/ryreport',
            name: 'ryReport',
            component: ryreport,
            meta: {
                title: '人员挣值报表'
            }
        },
        {
            path: '/wgreport',
            name: 'wgReport',
            component: yswgreport,
            meta: {
                title: '完工统计报表'
            }
        },
        {
            path: '/ysreport',
            name: 'ysReport',
            component: yswgreport,
            meta: {
                title: '验收统计报表'
            }
        },
        {
            path: '/wg',
            name: 'Wg',
            component: wgpannel,
            meta: {
                title: '完工报表'
            }
        },
        {
            path: '/ys',
            name: 'Ys',
            component: yspannel,
            meta: {
                title: '验收报表'
            }
        },
        {
            path: '/ek',
            name: 'Ek',
            component: ekpannel,
            meta: {
                title: '二开报表'
            }
        },
        {
            path: '/kb',
            name: 'Kb',
            component: kbpannel,
            meta: {
                title: '可变报表'
            }
        },
        {
            path: '/gcrl',
            name: 'Gcrl',
            component: gcpannel,
            meta: {
                title: '工程报表'
            }
        },
        {
            path: "/404",
            name: "notFound",
            component: NotFoundComponent,
            meta: {
                title: '404'
            }
        },
        {
            path: "*",
            redirect: "/404"
        }
    ]
});