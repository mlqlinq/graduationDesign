import serviceAxios from "@/http/index";

export const downloadNationalschosForm = () => {
	return serviceAxios({
		url: "/api/Scholarship/downloadNationalschosForm",
		method: "get"
	});
};

export const getNationalschosData = (query: any) => {
	return serviceAxios({
		url: "/api/Scholarship/Nationalschos",
		method: "get",
		params: query
	});
};
export const getAllnationalschosData = () => {
	return serviceAxios({
		url: "/api/Scholarship/Allnationalschos",
		method: "get"
	});
};
export const postSubmitNationalschos = (data) => {
	return serviceAxios({
		url: "/api/Scholarship/SubmitNationalschos",
		method: "post",
		data
	});
};
