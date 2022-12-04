import serviceAxios from "../index";

// 获取菜单列表
export const getMenu = () => {
  return serviceAxios({
    url: "/api/getmenu",
    method: "get",
  });
};
