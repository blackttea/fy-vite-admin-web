<script lang="ts" setup>
import pagePadding from "@/components/pagePadding/index.vue"
import { usePermissionStore } from "@/store/modules/permission"
import { reactive, ref, nextTick } from "vue"
import { Menu, iconList } from "@/type/menu"
import { SearchOutlined } from "@ant-design/icons-vue"
import addMenu from "./addMenu/index.vue"
import { deleteMenu, updateMenu } from "@/api/login"
import { message } from "ant-design-vue"
import listManage from "./listManage/index.vue"

const column = [
  {
    title: "名称",
    field: "title"
  },
  {
    title: "路由路径",
    field: "path"
  },
  {
    title: "路由名称",
    field: "name"
  },
  {
    title: "组件路径",
    field: "component"
  },
  {
    title: "是否隐藏",
    field: "hidden"
  },
  {
    title: "重定向",
    field: "redirect"
  },
  {
    title: "父菜单",
    field: "parentId"
  },
  {
    title: "菜单图标",
    field: "svgIcon"
  },
  {
    title: "顺序",
    field: "seq"
  },
  {
    title: "页面权限",
    field: "permission"
  }
]
const loading = ref(false)
const permissionStore = usePermissionStore()
const gridRef = ref()
const hiddenOption = [
  { label: "是", value: true },
  { label: "否", value: false }
]

const perVisible = ref(false)
const data = reactive<any>({
  permission: "[]",
  gridData: [...permissionStore.menuList],
  id: 0
})

const elIcon = reactive<iconList[]>([])

const getIcon = () => {
  elIcon.length = 0
}
getIcon()

const delMenu = () => {
  const id: number[] = []
  for (const item of gridRef.value.getCheckboxRecords() || []) id.push(item.id)
  deleteMenu(id).then((res: any) => {
    if (res.code === 200) {
      message.info(res.message)
    } else {
      message.error(res.message)
    }
    search()
  })
}

const search = async () => {
  loading.value = true
  await permissionStore.getMenu()
  data.gridData = [...permissionStore.menuList]
  loading.value = false
}

const upMenu = () => {
  updateMenu(data.gridData).then((res: any) => {
    if (res.code === 200) {
      message.info("更新成功!")
    } else {
      message.error(res.message)
    }
    search()
  })
}

const editPermission = (row: Menu) => {
  data.permission = row["permission"]
  const index: number = permissionStore.menuList.findIndex((pm) => {
    return row.id === pm.id
  })
  data.id = index
  perVisible.value = true
}

const permissionEdit = () => {
  perVisible.value = false
  nextTick(() => {
    permissionStore.menuList[data.id].permission = data.permission
  })
}
</script>

<template>
  <page-padding>
    <div class="tool-bar">
      <add-menu class="bar-btn" @search="search" />
      <a-button type="primary" size="small" class="bar-btn" @click="upMenu">保存</a-button>
      <a-button type="primary" size="small" danger class="bar-btn" @click="delMenu">删除</a-button>
      <a-button type="primary" size="small" class="bar-btn" @click="search">
        <template #icon>
          <search-outlined />
        </template>
        搜索
      </a-button>
    </div>
    <div class="menu-table">
      <vxe-table
        ref="gridRef"
        :column-config="{ resizable: true }"
        :data="data.gridData"
        :checkbox-config="{ labelField: 'name', highlight: true }"
        :tree-config="{ transform: true, rowField: 'id', parentField: 'parentId' }"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
        size="mini"
        header-align="left"
        align="left"
        style="height: 100%"
        :loading="loading"
        border
      >
        <vxe-column type="checkbox" title="名称" tree-node />
        <vxe-column field="id" title="ID" />
        <vxe-column :field="item.field" :title="item.title" v-for="item in column" :key="item.field" :edit-render="{}">
          <template #default="{ row }" v-if="['svgIcon', 'permission'].includes(item.field)">
            <div class="icon-edit" v-if="item.field === 'svgIcon'">
              <svg-icon v-if="row['svgIcon']" :name="row['svgIcon']" />
              <component v-else-if="row['elIcon']" :is="row['elIcon']" class="el-icon" />
            </div>
            <div v-else>
              <div @click="editPermission(row)">
                {{ row[item.field] }}
              </div>
            </div>
          </template>
          <template #edit="{ row }" v-if="!['id', 'permission'].includes(item.field)">
            <vxe-select v-model="row[item.field]" v-if="item.field === 'hidden'" :options="hiddenOption" transfer />
            <a-input v-else v-model:value="row[item.field]" style="width: 100%" />
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <a-modal v-model:visible="perVisible" title="图标编辑" @ok="permissionEdit" @cancel="perVisible = false">
      <div>
        <listManage v-if="perVisible" v-model:value="data.permission" />
      </div>
    </a-modal>
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
