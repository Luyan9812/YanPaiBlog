
import axios, { type AxiosInstance } from 'axios';
import { ElMessage } from 'element-plus';
import { baseURL, tokenStr } from '@/utils/constant';
import { tokenMgr } from '@/utils/token';

 
// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 50000
});
 
// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		// 请求头里添加 token
        if (tokenMgr.hasToken()) {
			config.headers[tokenStr] = tokenMgr.getToken();
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
 
// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		const res = response.data;
 
		if (res.code !== 0) {
            ElMessage.error(res.message);
            if (res.code === 10) {  // 未登录或登录过期
                tokenMgr.removeToken();
                window.location.href = '/';
                return null;
            }
			return Promise.reject(response);
		}
        return res.data
	},
	(error) => {  // 响应错误处理
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			if (error.response.data) ElMessage.error(error.response.statusText);
			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);
 
// 导出 axios 实例
export default service;