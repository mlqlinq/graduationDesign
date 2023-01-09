<template>
	<el-container class="layout-container-demo">
		<!-- 头部 -->
		<el-header class="common-layout">
			<span class="header_title" @click="goIndex">
				<SvgIcon :size="30" icon-name="myLogo" style="margin-right: 20px" />
				<span class="cont">家庭经济困难学生奖助学金综合管理系统</span>
			</span>
			<span class="user_set">
				<!-- 信息 -->
				<span>
					<el-badge class="item" is-dot>
						<el-button class="share-button" icon="Bell" text />
					</el-badge>
				</span>
				<!-- 全屏按钮 -->
				<span class="full_screen mag">
					<SvgIcon :icon-name="full ? 'FullScreen' : 'CancelFullScreen'" :size="25.8" @click="toggleScreen" />
				</span>
				<!-- 刷新 -->
				<span class="Refresh">
					<el-icon size="22" @click="reload"><Refresh /></el-icon>
				</span>
				<!-- 用户 -->
				<span class="full_user mag" @click="handleClick">
					<el-dropdown trigger="click">
						<span class="el-dropdown-link">
							<el-avatar :src="userData.avatar" icon="UserFilled"></el-avatar>
							<span class="usern"> {{ userData.username }}</span>
							<SvgIcon :class="fullSvg ? 'dropdown_svg' : 'dropdown_svgClick'" :size="18" icon-name="DrapDown" />
						</span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item icon="User" @click="personalCenter"> 个人信息 </el-dropdown-item>
								<el-dropdown-item icon="CircleClose" @click="loginOut"> 退出登录 </el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</span>
			</span>
		</el-header>
		<el-container>
			<!-- 菜单区域 -->
			<el-aside :width="isCollapse ? '64px' : '233px'">
				<el-scrollbar>
					<el-menu :collapse="isCollapse" :collapse-transition="false" :default-active="activePath" :router="true" class="el-menu-vertical-demo" unique-opened @select="handleMenu">
						<el-menu-item index="/index" @click="saveNavSate('/index')">
							<SvgIcon :class="!isCollapse ? 'menu_icon' : ' menu_icon_full'" :size="22" icon-name="HomePage" />
							<span>首页</span>
						</el-menu-item>
						<template v-for="item in allMenu" :key="item.menu_id">
							<el-sub-menu v-if="item.children && item.children.length" :index="item.path" popper-class="ziMenu">
								<template #title>
									<SvgIcon v-if="el.indexOf(item.meta.icon) !== -1" :class="!isCollapse ? 'menu_icon' : 'menu_icon_full'" :icon-name="item.meta.icon" :size="22" />
									<span v-else-if="item.meta.icon === ''" :class="!isCollapse ? 'menu_icon' : 'menu_icon_full'"></span>
									<el-icon v-else :class="!isCollapse ? 'menu_icon' : 'menu_icon_full'" :size="22">
										<component :is="item.meta.icon"></component>
									</el-icon>
									<span>{{ item.meta.title }}</span>
								</template>
								<el-menu-item v-for="item2 in item.children" :key="item2.menu_id" :index="item2.path" @click="saveNavSate(item2.path)">
									<SvgIcon v-if="el.indexOf(item2.meta.icon) !== -1" :icon-name="item2.meta.icon" :size="22" class="menu_icon meni" />
									<span v-else-if="item2.meta.icon === ''" :class="!isCollapse ? 'menu_icon' : 'menu_icon_full'"></span>
									<el-icon v-else :class="!isCollapse ? 'menu_icon' : 'menu_icon_full'" :size="22">
										<component :is="item2.meta.icon"></component>
									</el-icon>
									{{ item2.meta.title }}
								</el-menu-item>
							</el-sub-menu>
							<el-menu-item v-else>
								<SvgIcon v-if="el.indexOf(item.meta.icon) !== -1" :class="!isCollapse ? 'menu_icon' : 'menu_icon_full'" :icon-name="item.meta.icon" :size="22" />
								<span v-else-if="item.meta.icon === ''" :class="!isCollapse ? 'menu_icon' : 'menu_icon_full'"></span>
								<el-icon v-else :class="!isCollapse ? 'menu_icon' : 'menu_icon_full'" :size="22">
									<component :is="item.meta.icon"></component>
								</el-icon>
								<span>{{ item.meta.title }}</span>
							</el-menu-item>
						</template>
					</el-menu>
				</el-scrollbar>
			</el-aside>

			<!-- 主题内容 -->
			<el-main>
				<el-header>
					<!-- 展开和收起菜单 -->
					<span class="collapse_menu">
						<el-icon color="#b9b0b0" size="24" style="cursor: pointer" @click="openMenu">
							<Fold v-if="!isCollapse" />
							<Expand v-else />
						</el-icon>
					</span>
					<!-- 面包屑 -->
					<span class="heard_bread">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
								{{ item }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</span>
				</el-header>
				<tabs />

				<!-- 横向菜单 标签 -->
				<div style="width: 100%; height: calc(100% - 140px) !important" v-if="refresh">
					<router-view v-slot="{ Component, route }" style="height: 100%">
						<keep-alive>
							<Transition name="scale" mode="out-in" v-if="route && route.meta && route.meta.noCache">
								<component :is="Component" v-if="route && route.meta && route.meta.noCache" :key="viewKey" />
							</Transition>
						</keep-alive>
						<Transition name="scale" mode="out-in" v-if="route && route.meta && !route.meta.noCache">
							<component :is="Component" v-if="route && route.meta && !route.meta.noCache" :key="viewKey" />
						</Transition>
					</router-view>
				</div>

				<!-- footer -->
				<Foot />
			</el-main>
		</el-container>
	</el-container>
</template>

<script lang="ts" setup>
import index from "@/util/index";
import Foot from "@/components/Footer/index.vue";

const { isCollapse, full, userData, allMenu, activePath, fullSvg, breadcrumbList, viewKey, el, refresh, reload, handleClick, loginOut, personalCenter, openMenu, toggleScreen, saveNavSate, goIndex, handleMenu } = index();
</script>

<style lang="scss" scoped>
.layout-container-demo {
	height: 100%;

	.common-layout {
		height: 60px;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		background-color: #fff;
		color: #f9f0da !important;
		position: relative;
		padding-right: 8px;
		border-bottom: 1px solid var(--el-border-color-light);

		.header_title {
			color: #000;
			display: flex;
			flex-direction: row;
			align-items: center;
			flex-wrap: nowrap;
			justify-content: space-between;
			font-size: larger;
			cursor: pointer;

			// 下划线动画
			.cont {
				text-decoration: none;
				color: #000;
				position: relative;
			}

			.cont:hover {
				color: var(--el-color-primary);
			}

			.cont::after {
				content: "";
				display: block;
				/*开始时候下划线的宽度为100%*/
				width: 100%;
				height: 1px;
				position: absolute;
				bottom: -7px;
				background: var(--el-color-primary-dark-2);
				transition: all 0.3s ease-in-out;
				/*通过transform的缩放scale来让初始时x轴为0*/
				transform: scale3d(0, 1, 1);
				/*将坐标原点移到元素的中间，以原点为中心进行缩放*/
				transform-origin: 50% 0;
			}

			.cont:hover::after {
				/*鼠标经过时还原到正常比例*/
				transform: scale3d(1, 1, 1);
			}
		}

		.mag {
			margin: 0 7px;
		}

		.user_set {
			display: flex;
			align-items: center;

			span {
				margin: 0 5px;
			}

			.el-badge {
				margin-right: 7px;
			}

			.el-button.is-text {
				color: var(--el-button-text-color);
				border: 0 solid transparent;
				background-color: transparent;
				font-size: 22px;
				padding: 3px;

				:deep(.el-icon) {
					color: chocolate !important;
				}
			}

			.el-button.is-text:hover {
				:deep(.el-icon) {
					color: var(--el-color-primary) !important;
				}
			}

			.full_screen {
				color: #b9b0b0;
				cursor: pointer;
			}

			.full_screen:hover {
				color: var(--el-color-primary) !important;
			}

			.Refresh {
				cursor: pointer;
				color: #b9b0b0;
				width: 26px;
				height: 25px;
			}

			.Refresh:hover {
				color: var(--el-color-primary) !important;
			}

			.full_user {
				cursor: pointer;

				.el-dropdown-link {
					color: black;
					display: flex;
					align-items: center;
					position: relative;

					.usern {
						font-size: 17px;
						width: auto;
						margin: 0 10px;
					}

					.dropdown_svg {
						transition: transform 0.4s;
					}

					.dropdown_svgClick {
						transition: transform 0.4s;
						transform: rotateZ(180deg);
					}
				}
			}
		}
	}

	.el-aside {
		color: var(--el-text-color-primary);
		background: none;
		transition: all 1ms;
		-webkit-transition: width 0.5s;
		-moz-transition: width 0.5s;
		-webkit-transition: width 0.5s;
		-o-transition: width 0.5s;

		.scrollbar_headerTitle {
			display: flex;
			font-size: 20px;
			text-align: center;
			font-weight: bold;
			font-family: fantasy;
			line-height: 29px;
			padding: 14px 22px;
			justify-content: center;
			align-items: center;
		}

		::v-deep(.el-scrollbar__view) {
			height: 100%;
		}
	}

	.el-main {
		position: relative;
		padding: 0;
		width: 100%;
		height: calc(100vh - 60px); // 设置主体 main 高度

		.scale-enter-active,
		.scale-leave-active {
			transition: all 0.5s ease;
		}

		.scale-enter-from,
		.scale-leave-to {
			opacity: 0;
			transform: scale(0.9);
		}

		.el-header {
			height: 50px;
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			flex-direction: row;
			justify-content: space-between;
			color: #fff !important;
			background-color: #fff;
			position: relative;
			padding-right: 8px;
			border-bottom: 1px solid var(--el-border-color-light);

			.collapse_menu {
				width: 2%;
				display: inline-block;
				text-align: left !important;
			}

			.heard_bread {
				position: absolute;
				margin-left: 40px;
			}
		}
	}

	.el-menu {
		// border-right: none;
		border-top: #000;
		height: 100%;
		transition: all 10ms;

		.menu_icon {
			vertical-align: middle;
			margin-right: 13px;
			margin-left: 10px;
			width: var(--el-menu-icon-width);
			text-align: center;
		}

		.menu_icon_full {
			position: fixed;
			vertical-align: middle;
			width: var(--el-menu-icon-width);
			text-align: center;
		}
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 233px;
	}
}
</style>
