import serviceAxios from "@/http/index";

export const getMyPoorData = (idCardNum) => {
	return serviceAxios({
		url: "/api/nationalGrants/getgStudentPoorCertificData",
		method: "get",
		params: idCardNum
	});
};

export const submitMyPoorData = (data) => {
	return serviceAxios({
		url: "/api/nationalGrants/submitStudentPoorData",
		method: "post",
		data
	});
};
