import index from './pages/index/index.vue';

import pannel from './pages/pannel/pannel.vue';
import pannel2 from './pages/pannel2/pannel2.vue';
import pannel3 from './pages/pannel3/pannel3.vue';
import pannel4 from './pages/pannel4/pannel4.vue';
import pannel5 from './pages/pannel5/pannel5.vue';
import pannel6 from './pages/pannel6/pannel6.vue';
import pannel7 from './pages/pannel7/pannel7.vue';
import NotFoundComponent from './pages/errorPage/errorPage.vue';


export default {
    mode:'history',
    // base:'dp',
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/wtgz',
            component: pannel
        },
        {
            path: '/gcys',
            component: pannel2
        },
        {
            path: '/gcwg',
            component: pannel3
        },
        {
            path: '/pannel4',
            component: pannel4
        },
        {
            path: '/gcry',
            component: pannel5
        },
        {
            path: '/gccb',
            component: pannel6
        },
        {
            path: '/gczh',
            component: pannel7
        },
        {
            path: '*',
            component: NotFoundComponent,
            meta:{
                title:'404'
            }
        }
    ]
};