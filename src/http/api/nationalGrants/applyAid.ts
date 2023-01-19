import serviceAxios from "@/http/index";

export const getMyapplyData = (idCardNum) => {
	return serviceAxios({
		url: "/api/nationalGrants/getgStudentApplyData",
		method: "get",
		params: idCardNum
	});
};
export const submitMyApplyData = (data) => {
	return serviceAxios({
		url: "/api/nationalGrants/submitStudentApplyData",
		method: "post",
		data
	});
};
