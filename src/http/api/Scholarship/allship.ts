import serviceAxios from "@/http/index";

export const getShipData = (query: any) => {
	return serviceAxios({
		url: "/api/Scholarship/getAllShip",
		method: "get",
		params: query
	});
};

export const getShipSutData = (id: any) => {
	return serviceAxios({
		url: "/api/Scholarship/getShipSData",
		method: "get",
		params: { id }
	});
};

/** 校级奖学金审核 */
export const UniverClassExamine = (data) => {
	return serviceAxios({
		url: "/api/Scholarship/putUniverClassExamine",
		method: "put",
		data
	});
};

export const UniverSchoolExamine = (data) => {
	return serviceAxios({
		url: "/api/Scholarship/putUniverSchoolExamine",
		method: "put",
		data
	});
};

export const UniverDepartmentExamine = (data) => {
	return serviceAxios({
		url: "/api/Scholarship/putUniverDepartmentExamine",
		method: "put",
		data
	});
};

/** 国家奖学金审核 */
export const nationalschosClassExamine = (data) => {
	return serviceAxios({
		url: "/api/Scholarship/putNationalschosClassExamine",
		method: "put",
		data
	});
};

export const nationalschosSchoolExamine = (data) => {
	return serviceAxios({
		url: "/api/Scholarship/putNationalschosSchoolExamine",
		method: "put",
		data
	});
};

export const nationalschosDepartmentExamine = (data) => {
	return serviceAxios({
		url: "/api/Scholarship/putNationalschosDepartmentExamine",
		method: "put",
		data
	});
};

/** 区政府奖 */
export const districtschosSchoolExamine = (data) => {
	return serviceAxios({
		url: "/api/Scholarship/putDistrictschosSchoolExamine",
		method: "put",
		data
	});
};

export const districtschosDepartmentExamine = (data) => {
	return serviceAxios({
		url: "/api/Scholarship/putDistrictschosDepartmentExamine",
		method: "put",
		data
	});
};

/** 国励 */
export const nationalendeavorSchoolExamine = (data) => {
	return serviceAxios({
		url: "/api/Scholarship/putNationalendeavorSchoolExamine",
		method: "put",
		data
	});
};

export const nationalendeavorDepartmentExamine = (data) => {
	return serviceAxios({
		url: "/api/Scholarship/putNationalendeavorDepartmentExamine",
		method: "put",
		data
	});
};
