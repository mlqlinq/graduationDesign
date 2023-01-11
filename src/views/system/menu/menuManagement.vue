<template>
	<div class="menuM">
		<el-card>
			<el-button icon="Plus" plain style="margin-bottom: 10px" type="primary" @click="addMeun($event)"> 新增</el-button>
			<el-table v-loading="loading" :data="menuList" :header-cell-style="{ background: '#e4e8e9', borderColor: '#cfcfcf' }" border element-loading-text="加载中..." row-key="menu_id">
				<el-table-column align="left" label="菜单名称" prop="meta.title" />
				<el-table-column align="center" label="图标" min-width="70px">
					<template #default="scope">
						<SvgIcon v-if="el.indexOf(scope.row.meta.icon) !== -1" :icon-name="scope.row.meta.icon" :size="18" />
						<div v-else-if="scope.row.meta.icon === ''"></div>
						<el-icon v-else :size="20" color="#000">
							<component :is="scope.row.meta.icon"></component>
						</el-icon>
					</template>
				</el-table-column>
				<el-table-column align="center" label="排序" min-width="70px" prop="orderNum" sortable />
				<el-table-column align="center" label="路由地址" prop="path" />
				<el-table-column align="center" label="组件路径" prop="component" />
				<el-table-column align="center" label="状态" min-width="40px">
					<template #default="scope">
						<el-tag v-if="scope.row.status === '0'" size="large" type="success"> 正常</el-tag>
						<el-tag v-else class="mx-1" size="large" type="info">停用</el-tag>
					</template>
				</el-table-column>
				<el-table-column align="center" label="显示状态" min-width="40px">
					<template #default="scope">
						<el-tag v-if="scope.row.alwaysShow === '0'" size="large" type="success"> 显示</el-tag>
						<el-tag v-else class="mx-1" size="large" type="info">隐藏</el-tag>
					</template>
				</el-table-column>
				<el-table-column align="center" label="创建时间" prop="updateTime" />
				<el-table-column align="center" label="操作" min-width="100px">
					<template #default="scope">
						<el-tooltip v-if="scope.row.menuType !== 'C'" content="添加" placement="bottom">
							<el-button circle icon="CirclePlus" type="success" @click="addMeun(scope.row)" />
						</el-tooltip>
						<el-tooltip content="修改" placement="bottom">
							<el-button circle icon="Edit" type="primary" @click="editMenu(scope.row)" />
						</el-tooltip>
						<el-tooltip content="删除" placement="bottom">
							<el-button circle icon="Delete" type="danger" @click.prevent="delMenu(scope.row.menu_id)" />
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
		</el-card>

		<!-- 操作菜单  对话框 -->
		<el-dialog v-model="dialogMenuFormVisible" :close-on-click-modal="false" :title="diaTitle" style="width: 600px" @close="handleClose(ruleFormRef)">
			<el-form ref="ruleFormRef" :model="Menuform" :rules="MenuformRules" label-width="120px">
				<el-form-item label="上级菜单" prop="parentMenu">
					<el-tree-select
						v-model="Menuform.parentMenu"
						:current-node-key="Menuform.parentMenu"
						:data="data"
						:default-checked-keys="[Menuform.parentMenu]"
						:prop="data"
						:render-after-expand="false"
						check-strictly
						clearable
						default-expand-all
						empty-text="加载中..."
						filterable
						highlight-current
						node-key="value"
						placeholder="请选择上级菜单"
						style="width: 100%"
					/>
				</el-form-item>
				<el-form-item label="菜单类型" prop="menuType">
					<el-radio-group v-model="Menuform.menuType">
						<el-radio border label="M">目录</el-radio>
						<el-radio border label="C">菜单</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="菜单图标">
					<el-popover :teleported="false" :visible="visibleIcons" placement="bottom-start" trigger="click">
						<template #reference>
							<el-input v-model="Menuform.icon" clearable placeholder="点击选择图标" @blur="visibleIconList" @focus="visibleIconList">
								<template #prefix>
									<el-icon v-if="Menuform.icon === ''" style="height: 32px; width: 16px">
										<search />
									</el-icon>
									<SvgIcon v-else-if="el.indexOf(Menuform.icon) !== -1" :icon-name="Menuform.icon" :size="18" />
									<div v-else style="width: 20px; height: 20px">
										<component :is="Menuform.icon" />
									</div>
								</template>
							</el-input>
						</template>
						<div v-for="(item, index) in Object.keys(ElIcons)" :key="index" class="bs-wrapper__container__item" @click="getIcon(item)">
							<div style="width: 24px; height: 24px" @click="getIcon(item)">
								<component :is="item" />
							</div>
							<div class="bs-wrapper__container__item__title" @click="getIcon(item)">
								{{ item }}
							</div>
						</div>
					</el-popover>
				</el-form-item>
				<el-row>
					<el-col :span="12">
						<el-form-item label="菜单名称" prop="menuName">
							<el-input v-model="Menuform.menuName" clearable maxlength="8" placeholder="请输入菜单名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="显示排序" prop="orderNum">
							<el-input-number v-model="Menuform.orderNum" :max="20" :min="0" controls-position="right" placeholder="请选择排序" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="路由地址" prop="path">
					<el-input v-model="Menuform.path" clearable placeholder="请输入路由地址"></el-input>
				</el-form-item>
				<el-row class="menu_allow">
					<el-col :span="1">
						<el-tooltip class="box-item" content="选择'隐藏'则路由将不会出现在侧边栏，但仍然可以访问" effect="dark" placement="top-end">
							<el-icon>
								<QuestionFilled />
							</el-icon>
						</el-tooltip>
					</el-col>
					<el-col :span="11">
						<el-form-item class="menu_show" label="显示状态" prop="alwaysShow">
							<el-radio-group v-model="Menuform.alwaysShow">
								<el-radio label="0">显示</el-radio>
								<el-radio label="1">隐藏</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="1">
						<el-tooltip class="box-item" content="选择'停用'则路由将不会出现在侧边栏，也不能被访问" effect="dark" placement="top-start">
							<el-icon>
								<QuestionFilled />
							</el-icon>
						</el-tooltip>
					</el-col>
					<el-col :span="11">
						<el-form-item class="menu_show" label="菜单状态" prop="status">
							<el-radio-group v-model="Menuform.status">
								<el-radio label="0">正常</el-radio>
								<el-radio label="1">停用</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row v-if="Menuform.menuType === 'C'" class="menu_allow">
					<el-col :span="1">
						<el-tooltip class="box-item" content="访问的组件路径，如：`system/user/index`，默认在`views`目录下" effect="dark" placement="top-end">
							<el-icon>
								<QuestionFilled />
							</el-icon>
						</el-tooltip>
					</el-col>
					<el-col :span="11">
						<el-form-item class="menu_show" label="组件路径" prop="component">
							<el-input v-model="Menuform.component" clearable placeholder="请输入组件路径" style="width: 90%"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="1">
						<el-tooltip class="box-item" content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致" effect="dark" placement="top-start">
							<el-icon>
								<QuestionFilled />
							</el-icon>
						</el-tooltip>
					</el-col>
					<el-col :span="11">
						<el-form-item class="menu_show" label="是否缓存" prop="isCache">
							<el-radio-group v-model="Menuform.isCache">
								<el-radio :label="0">缓存</el-radio>
								<el-radio :label="1">不缓存</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>

				<el-form-item class="btns">
					<el-button type="primary" @click="submitForm(ruleFormRef)"> 提交</el-button>
					<el-button @click="handleClose(ruleFormRef)">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import * as ElIcons from "@element-plus/icons-vue";
import useMenu from "@/util/system/menuManagement";
// 获取所有自定义的svg图标的名称
const files = import.meta.glob("../../../assets/icon/svg/*.svg");
// 存储所有自定义的svg图标的名称
const el: any = [];
for (const key in files) {
	if (Object.prototype.hasOwnProperty.call(files, key)) {
		el.push(key.replace("../../../assets/icon/svg/", "").replace(".svg", ""));
	}
}

const { loading, menuList, diaTitle, dialogMenuFormVisible, data, Menuform, visibleIcons, ruleFormRef, MenuformRules, addMeun, editMenu, delMenu, submitForm, visibleIconList, getIcon, handleClose } = useMenu();
</script>
<style lang="scss" scoped>
.menuM {
	width: 97%;
	height: calc(100% - 50px);
	margin: 0 auto;

	.el-card {
		width: 100%;
		height: calc(100% - 10px);
		border-radius: 10px;
	}
}

.btns {
	:deep(.el-form-item__content) {
		justify-content: flex-end;
	}
}

:deep(.el-popper) {
	width: 100% !important;
	height: 200px;
	overflow: overlay;

	.bs-wrapper__container__item {
		display: inline-flex;
		width: 25%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.15rem;
		cursor: pointer;
		font-size: 12px;
		height: 3rem;

		&__title {
			flex: 1; //独占一份
		}
	}
}

.menu_allow {
	display: flex;
	position: relative;
	box-sizing: border-box;
	align-items: baseline;
	padding-left: 18px;
}

.menu_show {
	:deep(.el-form-item__label) {
		width: auto !important;
	}
}
</style>
