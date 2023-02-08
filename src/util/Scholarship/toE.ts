import {
	UniverClassExamine,
	UniverSchoolExamine,
	UniverDepartmentExamine,
	nationalschosClassExamine,
	nationalschosSchoolExamine,
	nationalschosDepartmentExamine,
	districtschosSchoolExamine,
	districtschosDepartmentExamine,
	nationalendeavorDepartmentExamine,
	nationalendeavorSchoolExamine
} from "@/http/api/Scholarship/allship";
import { PoorStudCertificClassExamine, PoorStudCertificSchoolExamine, PoorStudCertificDepartmentExamine } from "@/http/api/nationalGrants/poorStudCertific";

export default () => {
	/** 校级 */
	const postUniverClassExamine = async (params) => {
		await UniverClassExamine(params)
			.then((res) => {
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const postUniverDepartmentExamine = async (params) => {
		await UniverDepartmentExamine(params)
			.then((res) => {
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const postUniverSchoolExamine = async (params) => {
		await UniverSchoolExamine(params)
			.then((res) => {
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	/** 国家奖学金 */
	const postNationalschosClassExamine = async (params) => {
		await nationalschosClassExamine(params)
			.then((res) => {
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const postNationalschosDepartmentExamine = async (params) => {
		await nationalschosDepartmentExamine(params)
			.then((res) => {
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const postNationalschosSchoolExamine = async (params) => {
		await nationalschosSchoolExamine(params)
			.then((res) => {
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	/** 区政府 */
	const postDistrictschosDepartmentExamine = async (params) => {
		await districtschosDepartmentExamine(params)
			.then((res) => {
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const postDistrictschosSchoolExamine = async (params) => {
		await districtschosSchoolExamine(params)
			.then((res) => {
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	/** 国励 */
	const postNationalendeavorDepartmentExamine = async (params) => {
		await nationalendeavorDepartmentExamine(params)
			.then((res) => {
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const postNationalendeavorSchoolExamine = async (params) => {
		await nationalendeavorSchoolExamine(params)
			.then((res) => {
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	/** 贫困生审核 民主评议陈述理由 */
	const postPoorStudCertificClassExamine = async (params) => {
		await PoorStudCertificClassExamine(params)
			.then((res) => {
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	/** 贫困生审核 院系审核意见 */
	const postPoorStudCertificDepartmentExamine = async (params) => {
		await PoorStudCertificDepartmentExamine(params)
			.then((res) => {
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	/** 贫困生审核 学校审核意见 */
	const postPoorStudCertificSchoolExamine = async (params) => {
		await PoorStudCertificSchoolExamine(params)
			.then((res) => {
				ElNotification({
					title: "温馨提示",
					message: res.msg,
					type: "success"
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return {
		postUniverClassExamine,
		postUniverDepartmentExamine,
		postUniverSchoolExamine,
		postNationalschosClassExamine,
		postNationalschosDepartmentExamine,
		postNationalschosSchoolExamine,
		postDistrictschosDepartmentExamine,
		postDistrictschosSchoolExamine,
		postNationalendeavorDepartmentExamine,
		postNationalendeavorSchoolExamine,
		postPoorStudCertificClassExamine,
		postPoorStudCertificDepartmentExamine,
		postPoorStudCertificSchoolExamine
	};
};
