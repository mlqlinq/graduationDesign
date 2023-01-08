import { storeToRefs } from "pinia";
import { useMenuStore } from "@/stores/index";
// import { ref, onMounted, reactive } from "vue"
import { addMenu, delMenuw, editMenuw, getAllMenus } from "@/http/api/indexMenu.js";
import type { FormInstance, FormRules } from "element-plus";

export default () => {
	// 获取 pinia 数据
	const Menus = useMenuStore();
	const { menuAll: menuLists } = storeToRefs(Menus); // 解构

	// loading
	const loading = ref(true);

	// 表格数据
	const menuList: any = ref([]);

	setTimeout(() => {
		menuList.value = menuLists.value;
		loading.value = false;
	}, 500);

	const diaTitle = ref(""); // 对话框 title
	const dialogMenuFormVisible = ref(false); // 对话框控制

	// 定义树形结构
	interface menuTree {
		value: number;
		label: string;
		hasChildren?: boolean;
		children?: menuTree[];
	}

	// 菜单列表
	const data = ref<menuTree[]>([]);

	// 图标列表显示控制
	const visibleIcons = ref<boolean>(false);

	// 表单ref属性绑定
	const ruleFormRef = ref<FormInstance>();

	// 表单各属性绑定对象
	const Menuform = reactive<any>({
		menuid: undefined,
		parentMenu: 0, // 上级菜单
		menuType: "M", // 菜单类型
		icon: "", // 图标
		menuName: "", // 名称
		orderNum: undefined, // 排序
		path: "", // 路由地址
		alwaysShow: "0", // 显示状态
		status: "0", // 菜单状态
		component: "", // 组件路径
		isCache: 0 // 缓存状态
	});

	// 表单验证方法
	const MenuformRules = reactive<FormRules>({
		parentMenu: [
			{
				required: true,
				message: "请选择上级菜单",
				trigger: "change"
			},
			{
				validator(rule, value, callback, source, options) {
					if (value === "") {
						callback(new Error("请选择上级菜单"));
					} else {
						callback();
					}
				}
			}
		],
		menuType: [
			{
				required: true,
				message: "请选择菜单类型",
				trigger: "change"
			}
		],
		menuName: [
			{
				required: true,
				message: "请输入菜单名称",
				trigger: "blur"
			}
		],
		orderNum: [
			{
				required: true,
				message: "请选择排序",
				trigger: "blur"
			},
			{
				validator(rule, value, callback, source, options) {
					if (value < 0) {
						callback(new Error("至少是0"));
					} else if (value > 20) {
						callback(new Error("最大是20"));
					} else {
						callback();
					}
				}
			}
		],
		path: [
			{
				required: true,
				message: "请输入路由地址",
				trigger: "blur"
			},
			{
				validator(rule, value, callback, source, options) {
					// eslint-disable-next-line prefer-regex-literals
					const pattern2 = new RegExp("[A-Za-z]+");
					if (!pattern2.test(value.replaceAll("/", ""))) {
						callback(new Error("请输入正确格式！"));
					} else {
						callback();
					}
				}
			}
		],
		alwaysShow: [
			{
				required: true,
				message: "请选择菜单显示状态",
				trigger: "change"
			}
		],
		status: [
			{
				required: true,
				message: "请选择菜单状态",
				trigger: "blur"
			}
		],
		component: [
			{
				required: true,
				message: "请输入组件路径",
				trigger: "change"
			},
			{
				validator(rule, value, callback, source, options) {
					// eslint-disable-next-line prefer-regex-literals
					const pattern2 = new RegExp("[A-Za-z]+");
					if (!pattern2.test(value.replaceAll("/", ""))) {
						callback(new Error("请输入正确格式！"));
					} else {
						callback();
					}
				}
			}
		],
		isCache: [
			{
				required: true,
				message: "请选择是否缓存",
				trigger: "change"
			}
		]
	});

	// 添加按钮
	const addMeun = (value: any) => {
		diaTitle.value = "添加菜单";
		dialogMenuFormVisible.value = true;
		setmenuTree();
	};

	// 编辑按钮
	const editMenu = (value) => {
		console.log("🚀 ~ file: menuManagement.ts:172 ~ editMenu ~ value", value);
		diaTitle.value = "修改菜单";
		Menuform.menuid = value.menu_id;
		Menuform.alwaysShow = value.alwaysShow;
		Menuform.component = value.component;
		Menuform.icon = value.meta.icon;
		Menuform.isCache = value.meta.noCache;
		Menuform.menuName = value.meta.title;
		Menuform.menuType = value.menuType;
		Menuform.orderNum = value.orderNum;
		Menuform.parentMenu = value.menuType === "C" ? parseInt(value.parent_id) : 0;
		Menuform.path = value.path;
		Menuform.status = value.status;
		dialogMenuFormVisible.value = true;
		setmenuTree();
	};
	// 注入重载页面事件
	const reload: any = inject("reload");

	// 删除按钮
	const delMenu = (val: number) => {
		ElMessageBox.confirm("确定要删除该菜单吗?", "请注意！该操作不可逆！", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		})
			.then(async () => {
				await delMenuw(val)
					.then((res) => {
						ElNotification({
							title: "提示",
							message: res.msg,
							type: "success",
							duration: 1500
						});
						// 重载页面
						setTimeout(() => {
							reload();
						}, 100);
					})
					.catch((err) => {
						ElNotification({
							title: "错误",
							message: err,
							type: "error",
							duration: 3000
						});
					});
			})
			.catch(async () => {
				ElMessage({
					type: "info",
					message: "取消删除"
				});
			});
	};

	// 提交按钮
	const submitForm = async (formEl: FormInstance | undefined) => {
		if (formEl == null) return;
		await formEl.validate(async (valid, fields) => {
			if (valid) {
				Menuform.path = Menuform.path.replaceAll("/", "");
				if (diaTitle.value === "添加菜单") {
					await addMenu(Menuform)
						.then((res) => {
							ElNotification({
								title: "提示",
								message: res.msg,
								type: "success",
								duration: 1500
							});
							dialogMenuFormVisible.value = false;
							// 重载页面
							setTimeout(() => {
								reload();
							}, 100);
						})
						.catch((err) => {
							ElNotification({
								title: "错误",
								message: err,
								type: "error",
								duration: 1500
							});
						});
				} else if (diaTitle.value === "修改菜单") {
					await editMenuw(Menuform)
						.then((res) => {
							ElNotification({
								title: "提示",
								message: res.msg,
								type: "success",
								duration: 1500
							});
							dialogMenuFormVisible.value = false;
							// 重载页面
							setTimeout(() => {
								reload();
							}, 100);
						})
						.catch((err) => {
							ElNotification({
								title: "错误",
								message: err,
								type: "error",
								duration: 1500
							});
						});
				}
			} else {
				ElNotification({
					title: "提示",
					message: "请全部填写！",
					type: "warning",
					duration: 1500
				});
			}
		});
	};

	// 请求 树状菜单数据
	const setmenuTree = () => {
		if (data.value.length !== 0) return;
		getAllMenus()
			.then((res) => {
				const menu: any = { value: 0, label: "主类目" };
				menu.children = JSON.parse(JSON.stringify(res.data));
				data.value.push(menu);
			})
			.catch((err) => {
				ElMessage.error(err.mseesge);
			});
	};

	// 控制图标列表显示
	const visibleIconList = () => {
		visibleIcons.value = !visibleIcons.value;
	};

	// 点击获取设置的图标
	const getIcon = (icon) => {
		Menuform.icon = icon;
	};

	// 弹窗关闭时重置表单
	const handleClose = (formEl: FormInstance | undefined) => {
		dialogMenuFormVisible.value = false;
		if (formEl == null) return;
		Menuform.alwaysShow = "0";
		Menuform.component = "";
		Menuform.icon = "";
		Menuform.isCache = 0;
		Menuform.menuName = "";
		Menuform.menuType = "M";
		Menuform.orderNum = undefined;
		Menuform.parentMenu = undefined;
		Menuform.path = "";
		Menuform.status = "0";
		formEl.resetFields();
	};

	return {
		loading,
		menuList,
		diaTitle,
		dialogMenuFormVisible,
		data,
		Menuform,
		visibleIcons,
		ruleFormRef,
		MenuformRules,
		setmenuTree,
		addMeun,
		editMenu,
		delMenu,
		submitForm,
		visibleIconList,
		getIcon,
		handleClose
	};
};
