const serverConfig = {
	baseURL: import.meta.env.VITE_APP_BASE_API, // 请求基础地址,可根据环境自定义
	timeout: 10000, // 请求超时设置 10秒
	useTokenAuthorization: true // 是否开启 token 认证
};

export default serverConfig;
