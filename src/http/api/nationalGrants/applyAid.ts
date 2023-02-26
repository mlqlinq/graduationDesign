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

export const submitMyVerification = (data) => {
	return serviceAxios({
		url: "/api/nationalGrants/StudentVerification",
		method: "post",
		data
	});
};

/**
 * 审核账号查询所有申请
 * @param idCardNum
 * @returns
 */
export const getAllApplyAidData = (schoolName) => {
	return serviceAxios({
		url: "/api/nationalGrants/getAllApplyAidData",
		method: "get",
		params: schoolName
	});
};

/**
 * 民主评议
 * @param data
 * @returns
 */
export const PoorApplyAidClassExamine = (data) => {
	return serviceAxios({
		url: "/api/nationalGrants/putApplyAidClassExamine",
		method: "put",
		data
	});
};

/**
 * 学校评审
 * @param data
 * @returns
 */
export const PoorApplyAidSchoolExamine = (data) => {
	return serviceAxios({
		url: "/api/nationalGrants/putApplyAidSchoolExamine",
		method: "put",
		data
	});
};

/**
 * 院系评审
 * @param data
 * @returns
 */
export const PoorApplyAidDepartmentExamine = (data) => {
	return serviceAxios({
		url: "/api/nationalGrants/putApplyAidDepartmentExamine",
		method: "put",
		data
	});
};
