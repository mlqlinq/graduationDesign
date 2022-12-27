import serviceAxios from "@/http/index";

export const getUserList = () => {
    return serviceAxios({
        url: "/api/getUserList",
        method: "get",
    });
};
