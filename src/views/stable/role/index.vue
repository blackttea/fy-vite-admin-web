<script lang="ts" setup>
import pagePadding from "@/components/pagePadding/index.vue"
// import { usePermissionStore } from "@/store/modules/permission"
import { onMounted, reactive, ref } from "vue"
import { Menu, Role } from "@/type/menu"
import { SearchOutlined } from "@ant-design/icons-vue"
// import { message } from "ant-design-vue"
import { VxeGridProps } from "vxe-table"
import { getRoleList } from "@/api/login"
import { message } from "ant-design-vue"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue"
import addRole from "./addRole/index.vue"

const formState = reactive({
  name: ""
})
const user = reactive({})
const visible = ref(false)
const gridOuter = ref()
const search = () => {
  const param = {
    currentPage: 1,
    pageSize: 100
  }
  getRoleList(param).then((res: any) => {
    console.log(res)
    if (res.code === 200) {
      gridOption.data = res.data
    } else {
      message.info(res.message)
    }
  })
}

search()
const gridOption = reactive<VxeGridProps>({
  border: true,
  size: "mini",
  align: null,
  columnConfig: {
    resizable: true
  },
  columns: [
    { field: "name", title: "名称" },
    { field: "menu", title: "菜单权限", showOverflow: true },
    { field: "page", title: "页面权限", showOverflow: true, slots: { default: "page" } },
    { field: "level", title: "用户等级", showOverflow: true },
    { title: "操作", slots: { default: "operate" } }
  ],
  data: []
})

const upMenu = () => {}

const delMenu = (row: Menu) => {
  console.log(row)
}

const editRole = (row: Role) => {
  Object.assign(user, row)
  visible.value = true
}

const close = () => {
  visible.value = false
}
onMounted(() => {
  if (gridOuter.value) {
    gridOption.height = (gridOuter.value.clientHeight || 600) - 30
  }
})
</script>

<template>
  <page-padding>
    <div class="tool-bar">
      <a-input v-model:value="formState.username" size="small" class="user-name" placeholder="请输入用户名" />
      <a-button type="primary" size="small" class="bar-btn" @click="search">
        <template #icon>
          <search-outlined />
        </template>
        搜索
      </a-button>
      <a-button type="primary" size="small" class="bar-btn" @click="upMenu">保存</a-button>
      <a-button type="primary" size="small" danger class="bar-btn" @click="delMenu">删除</a-button>
    </div>
    <div class="menu-table" ref="gridOuter">
      <vxe-grid v-bind="gridOption">
        <template #page="{ row }">
          {{ JSON.stringify(row["page"]) }}
        </template>
        <template #operate="{ row }">
          <edit-outlined class="edit-btn" @click="editRole(row)" />
          <delete-outlined class="edit-btn" />
        </template>
      </vxe-grid>
    </div>
    <add-role v-if="visible" :user="user" @close="close" />
  </page-padding>
</template>

<style lang="scss" scoped>
.tool-bar {
  width: 100%;
  display: flex;
  margin-bottom: 8px;
  background-color: #ffffff;
  padding: 8px;
  border: 1px solid #e4e7ed;

  .bar-btn {
    margin-right: 8px;
  }

  .user-name {
    width: 150px;
    margin-right: 10px;
  }
}

.menu-table {
  width: 100%;
  padding: 8px;
  background-color: #ffffff;
  border: 1px solid #e4e7ed;
  height: calc(100% - 50px);

  .icon-edit {
    width: 100%;
  }

  .edit-btn {
    margin-right: 10px;
    font-size: 16px;
  }
}

.el-icon-list {
  width: 100%;
  display: flex;
  align-items: center;

  .el-icon {
    margin-right: 20px;
  }
}

.icon-set {
  width: 100%;
  margin-bottom: 20px;
}

:deep(.vxe-header--row) {
  th {
    background-color: #ffffff !important;
  }
}
</style>
