import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { useAuthStore, useTabsStore, useRouterStore } from "@/stores/index";
import type { FormInstance, FormRules } from "element-plus";
import EditTable from "@/components/EditTable/index.vue";
import AvatarCropper from "@/components/VueCropper/index.vue";
import { studentNationList, politicalOutlookList, collegeList } from "@/util/tool/JsonData";
import { postSubmitNationalendeavor } from "@/http/api/Scholarship/nationalEndeavor";
import { postSubmitDistrictschos } from "@/http/api/Scholarship/districtschos";
import { postSubmitUniversityScho } from "@/http/api/Scholarship/Scholarship";
import { postSubmitNationalschos } from "@/http/api/Scholarship/nationalschos";
import { getShipSutData } from "@/http/api/Scholarship/allship";
import _ from "lodash";
import postExamine from "@/util/Scholarship/toE";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {
	postUniverClassExamine,
	postUniverDepartmentExamine,
	postUniverSchoolExamine,
	postNationalschosClassExamine,
	postNationalschosDepartmentExamine,
	postNationalschosSchoolExamine,
	postDistrictschosDepartmentExamine,
	postDistrictschosSchoolExamine,
	postNationalendeavorDepartmentExamine,
	postNationalendeavorSchoolExamine
} = postExamine();

export default () => {
	const router = useRouter();
	const route = useRoute();
	const storesTabs = useTabsStore();
	const store: any = useRouterStore();
	const useAuths: any = useAuthStore();
	const { userData } = storeToRefs(useAuths);

	const userim = ref(store.getRouterparams.im);

	const formRef = ref<FormInstance>();

	const form = reactive({
		student_name: "",
		student_sex: "",
		imageUrl: "",
		student_birthday: "",
		student_nation: "",
		id_card_number: "",
		contact_number: "",
		university_name: "",
		student_college: "",
		class_name: "",
		political_outlook: "",
		student_no: "",
		student_start_year: "",
		grade: "",
		awards: "",
		reason_for_application: "",
		total_house_p: "",
		total_monthly_house: "",
		per_capita_monthly: "",
		source_of_income: "",
		home_address: "",
		postal_code: "",
		scoreRanking: "",
		total_class_size: "",
		required_quantity: "",
		number_of_passes: "",
		is_comprehensive_survey: "0",
		comprehensive_ranking: "",
		total_number_of_comprehensive: "",
		student_position: "",
		meritorious_deeds: "",
		student_major: "",
		dormitory_performance: "",
		english_level: "",
		computer_level: "",
		average: "",
		minimum_core: "",
		student_class: "",
		educational_system: ""
	});

	const formRules = reactive<FormRules>({
		student_name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
		student_sex: [{ required: true, message: "请选择您的性别", trigger: "change" }],
		student_birthday: [{ required: true, message: "请选择您的出生日期", trigger: "change" }],
		student_nation: [{ required: true, message: "请选择您的民族", trigger: "change" }],
		id_card_number: [{ required: true, message: "请输入您的身份证号", trigger: "blur" }],
		imageUrl: [{ required: true, message: "请上传您的个人照", trigger: "change" }],
		contact_number: [{ required: true, message: "请输入您的联系电话", trigger: "blur" }],
		university_name: [{ required: true, message: "请输入您的学校名称", trigger: "blur" }],
		student_college: [{ required: true, message: "请选择您的所属学院", trigger: "change" }],
		class_name: [{ required: true, message: "请输入您的班级名称", trigger: "blur" }],
		political_outlook: [{ required: true, message: "请选择您的政治面貌", trigger: "change" }],
		student_no: [{ required: true, message: "请输入您的学号", trigger: "blur" }],
		student_start_year: [{ required: true, message: "请选择您的入学年月", trigger: "change" }],
		grade: [{ required: true, message: "请选择您的所属年级", trigger: "blur" }],
		total_house_p: [{ required: true, message: "请输入您的家庭人口总数", trigger: "change" }],
		total_monthly_house: [{ required: true, message: "请输入您的家庭月总收入", trigger: "change" }],
		per_capita_monthly: [{ required: true, message: "请输入您的收入的来源", trigger: "change" }],
		source_of_income: [{ required: true, message: "请输入您的人均月收入", trigger: "change" }],
		home_address: [{ required: true, message: "请输入您的家庭住址", trigger: "change" }],
		postal_code: [{ required: true, message: "请输入邮政编码", trigger: "change" }],
		scoreRanking: [{ required: true, message: "请填写完整", trigger: "change" }],
		total_class_size: [{ required: true, message: "请填写完整", trigger: "change" }],
		required_quantity: [{ required: true, message: "请填写完整", trigger: "change" }],
		number_of_passes: [{ required: true, message: "请填写完整", trigger: "change" }],
		comprehensive_ranking: [{ required: true, message: "请填写完整", trigger: "change" }],
		total_number_of_comprehensive: [{ required: true, message: "请填写完整", trigger: "change" }]
	});

	// 动态表格 设置
	const column = [
		{ name: "dataTime", label: "日期", width: "auto", align: "center" },
		{ name: "awardName", label: "奖项名称", width: "auto", align: "center" },
		{ name: "awardingUnit", label: "颁奖单位", width: "auto", align: "center" }
	];

	const list = ref([{ dataTime: "", awardName: "", awardingUnit: "" }]);
	const editableKeys = ref([{ dataTime: "", awardName: "", awardingUnit: "" }]);
	const blank = ref({ dataTime: "", awardName: "", awardingUnit: "" });

	const add = (arr) => {
		for (let item of arr) {
			for (let attr in item) {
				if (attr.includes("edit")) {
					// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
					delete item[attr];
				}
			}
		}
		form.awards = JSON.stringify(arr); // 序列化
	};
	const onChange = (arr) => {
		list.value = arr;
		for (let item of arr) {
			for (let attr in item) {
				if (attr.includes("edit")) {
					// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
					delete item[attr];
				}
			}
		}
		form.awards = JSON.stringify(arr); // 序列化
	};
	const deleteAction = (row) => {
		for (let item of row) {
			for (let attr in item) {
				if (attr.includes("edit")) {
					// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
					delete item[attr];
				}
			}
		}
		form.awards = JSON.stringify(row); // 序列化
	};

	const dialogVisibles = ref(false);

	const getCropper = () => {
		dialogVisibles.value = true;
	};

	const getUrl = (url) => {
		if (url === "") return;
		form.imageUrl = url;
	};

	const parentChang = (bool) => {
		dialogVisibles.value = bool;
	};

	onMounted(() => {
		getData();
	});

	const studentDa: any = ref();

	const getShipSutdentData = async (id) => {
		await getShipSutData(id)
			.then((result) => {
				studentDa.value = result.data[0];
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const disabled = ref(false);

	const toexamineDia: any = ref(null);
	const Visible = ref<Boolean | undefined>(false);

	const news = ref("");
	if (route.query.Num === "1") {
		if (userData.value.userIdentity === "1") {
			news.value = "";
		} else if (userData.value.userIdentity === "2") {
			news.value = "评议为 特/一/二/三 等奖学金。";
		} else if (userData.value.userIdentity === "3") {
			news.value = "** 同学符合 特/一/二/三等 奖学金条件,表现优秀，推荐其参评20xx-20xx学年度 特/一/二/三等 奖学金。";
		}
	} else if (route.query.Num === "3") {
		if (userData.value.userIdentity === "1") {
			news.value = "经评审，并在校内公示  xx  个工作日，无异议，现报请批准该同学获得国家奖学金。";
		} else if (userData.value.userIdentity === "2") {
			news.value = "同意。";
		} else if (userData.value.userIdentity === "3") {
			news.value = "";
		}
	} else if (route.query.Num === "2") {
		news.value = "同意。";
	}

	const getData = async () => {
		if (router.currentRoute.value.meta.data) {
			const data: any = _.cloneDeep(router.currentRoute.value.meta.data);
			store.handleParams({ im: parseInt(data.type) });
			userim.value = store.getRouterparams.im;
			disabled.value = true;

			await getShipSutdentData(data.id_card_number);

			for (const key in form) {
				if (Object.prototype.hasOwnProperty.call(form, key)) {
					for (const s in studentDa.value) {
						if (Object.prototype.hasOwnProperty.call(studentDa.value, s)) {
							if (key === s) {
								form[key] = studentDa.value[s];
							}
						}
					}
					for (const s in data) {
						if (Object.prototype.hasOwnProperty.call(data, s)) {
							if (key === s) {
								form[key] = data[s];
							}
							if (s === "awards" && data[s] !== undefined && userim.value === 3) {
								list.value = JSON.parse(data[s]);
							}
						}
					}
				}
			}
		} else {
			for (const key in form) {
				if (Object.prototype.hasOwnProperty.call(form, key)) {
					for (const s in userData.value) {
						if (Object.prototype.hasOwnProperty.call(userData.value, s)) {
							if (key === s) {
								form[key] = userData.value[s];
							}
						}
					}
				}
			}
		}
	};

	/** 提交审核 */
	const submitForReview = () => {
		const data: any = JSON.parse(JSON.stringify(toexamineDia.value.ruleForm));
		const idNum = route.query.Num;

		if (idNum === "1") {
			if (userData.value.userIdentity === "1") {
				postUniverSchoolExamine({ ...data, ...route.query });
			} else if (userData.value.userIdentity === "2") {
				postUniverDepartmentExamine({ ...data, ...route.query });
			} else if (userData.value.userIdentity === "3") {
				postUniverClassExamine({ ...data, ...route.query });
			}
		} else if (idNum === "3") {
			if (userData.value.userIdentity === "1") {
				postNationalschosSchoolExamine({ ...data, ...route.query });
			} else if (userData.value.userIdentity === "2") {
				postNationalschosDepartmentExamine({ ...data, ...route.query });
			} else if (userData.value.userIdentity === "3") {
				postNationalschosClassExamine({ ...data, ...route.query });
			}
		} else if (idNum === "2") {
			if (userData.value.userIdentity === "1") {
				postDistrictschosSchoolExamine({ ...data, ...route.query });
			} else if (userData.value.userIdentity === "2") {
				postDistrictschosDepartmentExamine({ ...data, ...route.query });
			}
		} else if (idNum === "4") {
			if (userData.value.userIdentity === "1") {
				postNationalendeavorSchoolExamine({ ...data, ...route.query });
			} else if (userData.value.userIdentity === "2") {
				postNationalendeavorDepartmentExamine({ ...data, ...route.query });
			}
		}

		Visible.value = false;
	};

	/** 审核弹窗关闭 */
	const DaiVisi = (val) => {
		Visible.value = val;
	};

	/* 提交申请 */
	const submit = async (data) => {
		// eslint-disable-next-line eqeqeq
		if (store.getRouterparams.im == 1) {
			await postSubmitUniversityScho(data)
				.then((res) => {
					ElNotification({
						title: "温馨提示",
						message: res.msg,
						type: "success"
					});
					// 关闭当前页面
					const index = storesTabs.getTansList.findIndex((item) => item.path === "/fillInTheApplication");
					storesTabs.handleClose(index);
					// 返回上一页面
					router.go(-1);
				})
				.catch((err) => {
					console.log(err);
				});
			// eslint-disable-next-line eqeqeq
		} else if (store.getRouterparams.im == 2) {
			await postSubmitDistrictschos(data)
				.then((res) => {
					ElNotification({
						title: "温馨提示",
						message: res.msg,
						type: "success"
					});
					// 关闭当前页面
					const index = storesTabs.getTansList.findIndex((item) => item.path === "/fillInTheApplication");
					storesTabs.handleClose(index);

					// 返回上一页面
					router.go(-1);
				})
				.catch((err) => {
					console.log(err);
				});
			// eslint-disable-next-line eqeqeq
		} else if (store.getRouterparams.im == 3) {
			await postSubmitNationalschos(data)
				.then((res) => {
					ElNotification({
						title: "温馨提示",
						message: res.msg,
						type: "success"
					});
					// 关闭当前页面
					const index = storesTabs.getTansList.findIndex((item) => item.path === "/fillInTheApplication");
					storesTabs.handleClose(index);

					// 返回上一页面
					router.go(-1);
				})
				.catch((err) => {
					console.log(err);
				});
			// eslint-disable-next-line eqeqeq
		} else if (store.getRouterparams.im == 4) {
			await postSubmitNationalendeavor(data)
				.then((res) => {
					ElNotification({
						title: "温馨提示",
						message: res.msg,
						type: "success"
					});
					// 关闭当前页面
					const index = storesTabs.getTansList.findIndex((item) => item.path === "/fillInTheApplication");
					storesTabs.handleClose(index);

					// 返回上一页面
					router.go(-1);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	const submitForm = async (formEl: FormInstance | undefined) => {
		if (!formEl) return;
		await formEl.validate(async (valid, fields) => {
			if (valid) {
				submit(form);
			} else {
				ElNotification({
					title: "温馨提示",
					message: "请填写完整！",
					type: "warning"
				});
			}
		});
	};

	return {
		disabled,
		toexamineDia,
		route,
		zhCn,
		news,
		Visible,
		DaiVisi,
		EditTable,
		AvatarCropper,
		studentNationList,
		politicalOutlookList,
		formRef,
		collegeList,
		userim,
		form,
		formRules,
		column,
		list,
		editableKeys,
		blank,
		add,
		onChange,
		deleteAction,
		dialogVisibles,
		getCropper,
		getUrl,
		parentChang,
		submitForm,
		submitForReview
	};
};
