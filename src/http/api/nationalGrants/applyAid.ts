import serviceAxios from "@/http/index";

export const getMyapplyData = (idCardNum) => {
	return serviceAxios({
		url: "/api/nationalGrants/getgStudentApplyData",
		method: "get",
		params: idCardNum
	});
};
