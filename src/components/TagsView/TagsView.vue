<template>
  <el-scrollbar>
    <div class="scrollbar-flex-content">
      <router-link
        v-for="(item, index) in getTabs"
        ref="tag"
        :key="item.path"
        :class="isActive(item) ? 'active' : ''"
        :to="{ path: item.path }"
        tag="span"
        class="tags-view-item"
      >
        <span style="margin-right: 5px">{{ item.title }}</span>
        <svgIcon
          v-if="index !== 0"
          class="del"
          @click.prevent.stop="closeSelectedTag(item)"
          iconName="icon-quxiao1"
          color="#fff"
        ></svgIcon>
      </router-link>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const layoutStore = useLayoutStore();

const getTabs = layoutStore.getTabs;

const isExistence = getTabs.find((item) => {
  return item.path === key;
});

if (!isExistence) {
  const obj = userStore.getMenusNamePath.filter((item: any) => {
    return item.path === key;
  })[0];

  layoutStore.addTab(obj);
}

const delTabUtils = (key = "") => {
  const layoutStore = useLayoutStore();

  const getTabs = layoutStore.getTabs;

  const currentTabs = getTabs.filter((item) => {
    return item.path !== key;
  });

  layoutStore.setTab(currentTabs);
};

const closeSelectedTag = (tag) => {
  // 判断是否是 当前活动的tab
  if (isActive(tag)) {
    delTabUtils(tag.path);
    const lastTag = getTabs.value[getTabs.value.length - 1].path;
    router.push(lastTag);
  } else {
    delTabUtils(tag.path);
  }
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of close
.tags-view-wrapper {
  .tags-view-item {
    .close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
        width: 12px !important;
        height: 12px !important;
      }
    }
  }
}
</style>
