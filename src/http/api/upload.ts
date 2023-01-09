import serviceAxios from "@/http/index";

// 上传接口
export const uploads = (data) => {
	return serviceAxios({
		url: "/api/upload/uploads/file",
		method: "post",
		data
	});
};
