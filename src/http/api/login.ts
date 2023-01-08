import serviceAxios from "@/http/index";

// 获取图形验证码
export const getCaptcha = () => {
	return serviceAxios({
		url: "/api/captcha",
		method: "get"
	});
};

interface ILoginData {
	userIdentity: string | number;
	name: string | number;
	password: string | number;
	verificationCode: string | number;
}

// 登录接口
export const loginAsync = (data: ILoginData) => {
	return serviceAxios({
		url: "/api/user/login",
		method: "post",
		data
	});
};
