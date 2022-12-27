import serviceAxios from "@/http/index";

// 获取菜单列表
export const getMenu = () => {
    return serviceAxios({
        url: "/api/menu/getmenu",
        method: "get",
    });
};

export const getAllMenu = () => {
    return serviceAxios({
        url: "/api/menu/getAllmenu",
        method: "get",
    });
};
