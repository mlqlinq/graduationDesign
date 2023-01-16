import serviceAxios from "@/http/index";

export const getMyPoorData = (idCardNum) => {
	return serviceAxios({
		url: "/api/nationalGrants/getgStudentPoorCertificData",
		method: "get",
		params: idCardNum
	});
};
