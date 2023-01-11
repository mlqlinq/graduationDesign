import serviceAxios from "@/http/index";

export const getUserList = () => {
	return serviceAxios({
		url: "/api/getUserList",
		method: "get"
	});
};

export const getMyinformation = (query) => {
	return serviceAxios({
		url: "/api/user/getMyinformation",
		method: "get",
		params: query
	});
};
