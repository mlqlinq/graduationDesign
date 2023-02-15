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

export const getUniverMan = () => {
	return serviceAxios({
		url: "/api/univerMan/getUniversityManagemento",
		method: "get"
	});
};

export const getUniversityPerData = (id) => {
	return serviceAxios({
		url: "/api/univerMan/getUniversityPerData",
		method: "get",
		params: { id }
	});
};

export const getSecretaryPerData = (id) => {
	return serviceAxios({
		url: "/api/univerMan/getSecretaryPerData",
		method: "get",
		params: { id }
	});
};

export const getGuidePerData = (id) => {
	return serviceAxios({
		url: "/api/univerMan/getGuidePerData",
		method: "get",
		params: { id }
	});
};

export const getStudentsPerData = (id) => {
	return serviceAxios({
		url: "/api/univerMan/getStudentsPerData",
		method: "get",
		params: { id }
	});
};

export const submitInformation = (data) => {
	return serviceAxios({
		url: "/api/univerMan/submitInformation",
		method: "post",
		data
	});
};
