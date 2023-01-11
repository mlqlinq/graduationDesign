import serviceAxios from "@/http/index";

export const modifyUser = (data) => {
	return serviceAxios({
		url: "/api/user/information/saveInformation",
		method: "post",
		data
	});
};
