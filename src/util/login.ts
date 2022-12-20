// import { onMounted, reactive, ref } from "vue"
// import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/modules/userToken"
import { debounce } from "lodash"
import { Base64 } from "js-base64"
import type { FormInstance, FormRules } from "element-plus"
import { getCaptcha, loginAsync } from "@/http/api/login"

export default () => {
  // 图形验证码
  const imgUrl = ref(null)

  // 获取图形验证码
  const getCode = async () => {
    await getCaptcha()
      .then((res) => {
        if (res?.code === 200) {
          imgUrl.value = Base64.decode(res?.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // 验证码防抖
  const getOnCode = debounce(getCode, 700, {
    leading: true,
    trailing: false,
  })

  const router = useRouter()

  const ruleFormRef = ref<FormInstance>()

  // 表单绑定项
  const ruleForm = reactive({
    userIdentity: "",
    name: "admin",
    password: "admin123",
    verificationCode: "",
  })

  // 表单校验
  const rules = reactive<FormRules>({
    userIdentity: [
      {
        required: true,
        message: "请选择您的身份类型",
        trigger: "change",
      },
    ],
    name: [
      { required: true, message: "请输入账号!", trigger: "blur" },
      // { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
    ],
    password: [
      { required: true, message: "请输入密码!", trigger: "blur" },
      // { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
    ],
    verificationCode: [
      { required: true, message: "请输入验证码!", trigger: "blur" },
      // { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
    ],
  })

  // 按钮 loading事件
  const showLoading = ref<boolean>(false)

  // 是否禁用按钮  // 防止用户多次点击
  const isdisabled = ref<boolean>(false)

  // 字符串加密构造函数
  function compileStr(code: string) {
    let c = String.fromCharCode(code.charCodeAt(0) + code.length)
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
    }
    return decodeURIComponent(c)
  }

  // 定时器
  const setTime = () => {
    setTimeout(() => {
      showLoading.value = false
      isdisabled.value = false
    }, 2000)
  }

  // 状态管理
  const store = useAuthStore()

  // 登录按钮
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return alert("验证失败!")
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        showLoading.value = true
        isdisabled.value = true

        const newData: any = {}
        for (let key in ruleForm) {
          if (ruleForm.hasOwnProperty(key)) {
            newData[key] = ruleForm[key]
          }
        }
        // console.log(newData);

        newData.verificationCode = compileStr(
          newData.verificationCode.toLowerCase()
        )

        await loginAsync(newData)
          .then((res) => {
            if (res.type === "error") {
              setTime()
              getOnCode()
              return ElMessage.error(res.message)
            } else {
              setTimeout(() => {
                showLoading.value = false
                isdisabled.value = false
                router.push("/home")
              }, 2000)

              sessionStorage.setItem("token", res.token)

              //存储token解析的内容 以及修改登录的状态
              store.setAuth(!!res.token) //由于decode是对象，所以对他取反再取反，双非就变成了布尔类型
              store.setUser(res.token)
              return ElMessage.success(res.message)
            }
          })
          .catch((error) => {
            setTime()
            console.log(error)
          })
      } else {
        console.log("error submit!", fields)
      }
    })
  }

  getCode()

  return {
    imgUrl,
    getOnCode,
    ruleFormRef,
    ruleForm,
    rules,
    showLoading,
    isdisabled,
    submitForm,
  }
}
