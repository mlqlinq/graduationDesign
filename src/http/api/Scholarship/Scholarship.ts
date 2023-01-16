import serviceAxios from "@/http/index";

export const downloadApplicationForm = () => {
	return serviceAxios({
		url: "/api/Scholarship/downloadUniversityApplicationForm",
		method: "get"
	});
};

export const getUniversityScho = (query: any) => {
	return serviceAxios({
		url: "/api/Scholarship/universityScho",
		method: "get",
		params: query
	});
};
export const getAllUniversityScho = () => {
	return serviceAxios({
		url: "/api/Scholarship/AlluniversityScho",
		method: "get"
	});
};
export const postSubmitUniversityScho = (data) => {
	return serviceAxios({
		url: "/api/Scholarship/SubmitUniversityScho",
		method: "post",
		data
	});
};
