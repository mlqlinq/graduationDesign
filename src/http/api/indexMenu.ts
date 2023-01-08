import serviceAxios from "@/http/index";

// 获取菜单列表
export const getMenu = () => {
	return serviceAxios({
		url: "/api/menu/getmenu",
		method: "get"
	});
};

// 获取原始菜单数据
export const getAllMenus = () => {
	return serviceAxios({
		url: "/api/menu/getAllmenu",
		method: "get"
	});
};

// 添加菜单
export const addMenu = (data) => {
	return serviceAxios({
		url: "/api/menu/addMenu",
		method: "post",
		data
	});
};

// 修改菜单
export const editMenuw = (data) => {
	return serviceAxios({
		url: "/api/menu/editMenu",
		method: "put",
		data
	});
};

// 删除菜单
export const delMenuw = (id) => {
	return serviceAxios({
		url: `/api/menu/delMenu/${id}`,
		method: "delete"
	});
};
