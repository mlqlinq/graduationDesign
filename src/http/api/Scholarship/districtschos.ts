import serviceAxios from "@/http/index";

export const downloadDistrictsch = () => {
	return serviceAxios({
		url: "/api/Scholarship/downloadDistrictschos",
		method: "get"
	});
};

export const getDistrictschosData = (query: any) => {
	return serviceAxios({
		url: "/api/Scholarship/DistrictschosData",
		method: "get",
		params: query
	});
};
export const getAllDistrictschosData = () => {
	return serviceAxios({
		url: "/api/Scholarship/AllDistrictschosData",
		method: "get"
	});
};
