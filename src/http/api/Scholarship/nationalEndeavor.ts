import serviceAxios from "@/http/index";

export const downloadNationalendeavor = () => {
	return serviceAxios({
		url: "/api/Scholarship/downloadNationalendeavor",
		method: "get"
	});
};

export const getNationalendeavorData = (query: any) => {
	return serviceAxios({
		url: "/api/Scholarship/NationalendeavorData",
		method: "get",
		params: query
	});
};
export const getAllnationalendeavorData = () => {
	return serviceAxios({
		url: "/api/Scholarship/AllnationalendeavorData",
		method: "get"
	});
};
