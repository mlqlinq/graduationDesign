// stores/counter.js  在pinia中，getters和state中不能使用相同的名字，但是vuex中可以使用相同的名字
import { defineStore } from "pinia"

//存储token 和 解析token 的用户
export const useAuthStore = defineStore("userAuth", {
  state: () => {
    //管理俩个状态
    return {
      //  isAuthenticated 判断用户是否登录，默认为false,即未登录，登录之后修改为true
      isAuthenticated: false,
      user: {}, // 解析的token里面所包含的数据
    }
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  getters: {
    //通过getters对状态state进行获取
    getAuthenticated: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
  },
  actions: {
    setAuth(isAuth: boolean) {
      //修改当前登录的状态
      if (isAuth) {
        this.isAuthenticated = isAuth //在pinia中this指代state
      } else {
        this.isAuthenticated = false
      }
    },
    setUser(user: any) {
      //解析的用户
      if (user) {
        this.user = user
      } else {
        this.user = {}
      }
    },
    persist: {
      enabled: true, // 开启数据缓存
    },
  },
})
