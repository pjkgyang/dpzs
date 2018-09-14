
import axios from 'axios'
// import iView from 'iview';

function startLoading() {
    iView.Spin.show({
        render: (h) => {
            return h('div', [
                h('Icon', {
                    'class': 'demo-spin-icon-load',
                    props: {
                        type: 'ios-loading',
                        size: 24
                    }
                }),
                h('div', '加载中~')
            ])
        }
    });
}
function endLoading() {
    iView.Spin.hide();
}
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
let overtimeRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}
axios.defaults.timeout = 30000

axios.interceptors.request.use(config => {
    // showFullScreenLoading();
    return config;
}, error => {
    // iView.$Message.error({
    //     content:'请求超时 ~',
    //     duration: 10,
    //     closable: true
    // });
    // tryHideFullScreenLoading();
    return Promise.reject(error)
})


// http响应拦截器
axios.interceptors.response.use(
    response => {
        // tryHideFullScreenLoading();
        return response;
    },
    error => {
        // iView.Message.error({
        //     content:'请求超时 ~',
        //     duration: 10,
        //     closable: true
        // });
        // tryHideFullScreenLoading();
        return Promise.reject(error);
    })
export default axios
