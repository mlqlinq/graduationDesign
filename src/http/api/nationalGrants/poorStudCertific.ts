import serviceAxios from "@/http/index";

/**
 * 学生个人查询
 * @param idCardNum
 * @returns
 */
export const getMyPoorData = (idCardNum) => {
	return serviceAxios({
		url: "/api/nationalGrants/getgStudentPoorCertificData",
		method: "get",
		params: idCardNum
	});
};

/**
 * 学生提交申请
 * @param data
 * @returns
 */
export const submitMyPoorData = (data) => {
	return serviceAxios({
		url: "/api/nationalGrants/submitStudentPoorData",
		method: "post",
		data
	});
};

/**
 * 审核账号查询所有申请
 * @param idCardNum
 * @returns
 */
export const getAllPoorData = (schoolName) => {
	return serviceAxios({
		url: "/api/nationalGrants/getAllPoorCertificData",
		method: "get",
		params: schoolName
	});
};

/**
 * 民主评议
 * @param data
 * @returns
 */
export const PoorStudCertificClassExamine = (data) => {
	return serviceAxios({
		url: "/api/nationalGrants/putPoorStudCertificClassExamine",
		method: "put",
		data
	});
};

/**
 * 学校评审
 * @param data
 * @returns
 */
export const PoorStudCertificSchoolExamine = (data) => {
	return serviceAxios({
		url: "/api/nationalGrants/putPoorStudCertificSchoolExamine",
		method: "put",
		data
	});
};

/**
 * 院系评审
 * @param data
 * @returns
 */
export const PoorStudCertificDepartmentExamine = (data) => {
	return serviceAxios({
		url: "/api/nationalGrants/putPoorStudCertificDepartmentExamine",
		method: "put",
		data
	});
};
