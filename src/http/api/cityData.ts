import serviceAxios from "@/http/index";

// 获取城市数据
export const getCityData = () => {
	return serviceAxios({
		url: "/api/cityJsonData",
		method: "get"
	});
};
