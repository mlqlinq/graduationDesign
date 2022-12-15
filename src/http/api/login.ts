import serviceAxios from "@/http/index"

// 获取图形验证码
export const getCaptcha = () => {
  return serviceAxios({
    url: "/api/captcha",
    method: "get",
  })
}

// 登录接口
export const loginAsync = (data) => {
  return serviceAxios({
    url: "/api/login",
    method: "post",
    data,
  })
}
