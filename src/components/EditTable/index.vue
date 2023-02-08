<template>
	<div class="m-edit-table">
		<el-table :data="transData" style="width: 100%" row-key="id" :header-cell-style="{ background: '#e4e8e9', borderColor: '#cfcfcf' }" border>
			<template v-for="item in props.columns">
				<el-table-column v-if="item.type" :type="item.type" :width="item.width" :align="item.align" :fixed="item.fixed" :label="item.label" />

				<el-table-column v-else :prop="item.name" :width="item.width" :align="item.align" :label="item.label">
					<template #default="scope">
						<template v-if="!item.slot">
							<template v-if="item.readonly">
								{{ scope.row[item.name] }}
							</template>
							<template v-else-if="item.valueType === 'select'">
								<el-select clearable :placeholder="`请选择`" v-model="scope.row[item.name]" v-if="scope.row.edit">
									<el-option v-for="ite in item.options" :key="ite.id" :label="ite.value" :value="ite.value" />
								</el-select>

								<span v-else>{{ filterOption(item, scope) }}</span>
							</template>

							<template v-else-if="item.valueType === 'date'">
								<el-date-picker v-model="scope.row[item.name]" type="date" clearable placeholder="请选择" v-if="scope.row.edit" />
								<span v-else>{{ scope.row[item.name] || "--" }}</span>
							</template>
							<template v-else>
								<el-input clearable placeholder="请输入" v-model="scope.row[item.name]" v-if="scope.row.edit"></el-input>
								<span v-else>{{ scope.row[item.name] || "--" }}</span>
							</template>
						</template>
						<slot v-else :name="item.name" :item="item" :row="scope.row"></slot>
					</template>
				</el-table-column>
			</template>
			<el-table-column prop="operator" label="操作" width="250px" fixed="right" align="center">
				<template #default="scope">
					<el-button v-if="scope.row.edit" type="success" size="small" icon="CircleCheckFilled" @click="confirmEdit(scope.row)"> 保存 </el-button>
					<el-button v-else type="primary" size="small" icon="Edit" @click="scope.row.edit = !scope.row.edit"> 编辑 </el-button>
					<el-button icon="Delete" type="danger" size="small" @click="deleteAction(scope.row, scope.$index)">删除</el-button>
					<el-button v-if="scope.row.edit" type="primary" size="small" icon="Edit" @click="cancelEdit(scope.row)"> 取消 </el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 15px">
			<el-button plain type="primary" style="width: 100%" @click="add">
				<el-icon style="margin-right: 4px"><plus /></el-icon> 添加一行数据
			</el-button>
		</div>
	</div>
</template>
<script lang="ts" setup>
import _ from "lodash";
const emit = defineEmits(["del", "add", "onChange"]);
let transData: any = ref([]);

let props: any = defineProps({
	columns: {
		type: Array,
		default: () => []
	},
	data: {
		type: Array,
		default: () => []
	},
	editableKeys: {
		type: Array,
		default: () => []
	},
	blank: {
		type: Object,
		default: () => {}
	}
});
const getData = () => {
	let arr = _.cloneDeep(transData.value);
	for (let item of arr) {
		for (let attr in item) {
			if (attr.includes("te__mp")) {
				delete item[attr];
			}
		}
	}
	emit("onChange", arr);
};

let obj = {};
for (let item of props.columns) {
	props.data.forEach((it) => {
		if (!obj[item.name]) {
			obj[item.name] = null;
		}
	});
}

const reset = () => {
	transData.value = props.data;
	getData();
};

onMounted(() => {
	watch(
		() => props.data,
		(val) => {
			// 转换数据
			transData.value = _.cloneDeep(val);
			// 存储一个临时变量
			for (let item of transData.value) {
				for (let attr in item) {
					let temp = `${attr}te__mp`;
					item[temp] = item[attr];
				}
			}
		},
		{
			immediate: true,
			deep: true
		}
	);
});

// 保存
const confirmEdit = (row) => {
	row.edit = false;
	for (let attr in row) {
		if (attr.includes("te__mp")) {
			row[attr] = row[attr.replace("te__mp", "")];
		}
	}
	getData();
};

// 取消
const cancelEdit = (row) => {
	row.edit = !row.edit;
	for (let attr in row) {
		if (!attr.includes("te__mp")) {
			row[attr] = row[attr + "te__mp"];
		}
	}
};

const deleteAction = (row, ind) => {
	row.visible = false;
	transData.value.splice(ind, 1);
	emit("del", transData.value);
};

const add = () => {
	let id = ~~(Math.random() * 1000000).toFixed(0);
	let obj1 = Object.assign({}, obj, {
		id: id,
		edit: true,
		visible: false
	});

	for (let attr in obj1) {
		let temp = `${attr}te__mp`;
		obj1[temp] = obj1[attr];
	}
	transData.value.push(props.blank);
	emit("add", transData.value);
};

const filterOption = (item, scope) => {
	if ("options" in item || "row" in scope) {
		let obj = item.options.find((ite) => {
			return ite.value === scope.row[item.name];
		});
		if (obj) {
			return obj.value;
		}
	}

	return "--";
};

defineExpose({
	reset
});
</script>
<style lang="scss" scoped>
.edit-input {
	padding-right: 100px;
}
.cancel-btn {
	position: absolute;
	right: 15px;
	top: 10px;
}
.inline-edit-table {
	width: 100%;
}
</style>
