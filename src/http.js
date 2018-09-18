
import axios from 'axios'
import { Loading, Message, MessageBox } from 'element-ui'




let loading        //定义loading变量

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {
    loading.close()
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
    showFullScreenLoading();
    return config;
}, error => {
        MessageBox.alert('请求超时...', '提示', {
            type: 'error',
            confirmButtonText: '确定',
        });
    
    tryHideFullScreenLoading();
    return Promise.reject(error)
})


// http响应拦截器
axios.interceptors.response.use(
    response => {
        tryHideFullScreenLoading();
        return response;

    },
    error => {
        if (error.response) {
            console.log(error.response)
        }
           MessageBox.alert('请求超时...', '提示', {
             type: 'error',
             confirmButtonText: '确定',
          });
        tryHideFullScreenLoading();
        return Promise.reject(error);
    })

export default axios
