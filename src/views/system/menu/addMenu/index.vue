<template>
  <div>
    <a-button type="primary" size="small" class="bar-btn" @click="showDrawer">
      <template #icon><PlusOutlined /></template>
      新增
    </a-button>
    <a-drawer
      title="新增菜单"
      :width="720"
      v-model:visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <a-form :model="form" :rules="rules" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="名称" name="title">
              <a-input v-model:value="form.title" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="路由路径" name="path">
              <a-input v-model:value="form.path" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="路由名称" name="name">
              <a-input v-model:value="form.name" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="组件路径" name="component">
              <a-input v-model:value="form.component" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="是否隐藏" name="hidden">
              <a-select v-model:value="form.hidden" :options="hiddenOption" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="重定向" name="redirect">
              <a-input v-model:value="form.redirect" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="父级菜单" name="parentId">
              <a-tree-select
                v-model:value="form.parentId"
                show-search
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                allow-clear
                tree-default-expand-all
                :tree-data="permissionStore.parentList"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="顺序" name="seq">
              <a-input v-model:value="form.seq" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="公共组件" name="common">
              <a-select v-model:value="form.common" :options="hiddenOption" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="菜单图标" name="svgIcon">
              <a-textarea v-model:value="form.svgIcon" :rows="4" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template #extra>
        <a-space>
          <a-button @click="onClose">取消</a-button>
          <a-button type="primary" @click="onOk">确认</a-button>
        </a-space>
      </template>
    </a-drawer>
  </div>
</template>
<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue"
import { reactive, ref } from "vue"
import type { Rule } from "ant-design-vue/es/form"
import { Menu } from "@/type/menu"
import { usePermissionStore } from "@/store/modules/permission"
import { addMenuApi } from "@/api/login"
import { message } from "ant-design-vue"

const form = reactive<Menu>({
  title: "",
  path: "",
  name: "",
  component: "",
  hidden: "false",
  redirect: "",
  svgIcon: "",
  seq: undefined,
  parentId: undefined,
  permission: [],
  common: "false"
})

const emit = defineEmits(["search"])
const rules: Record<string, Rule[]> = {
  title: [{ required: true, message: "请输入菜单名称" }],
  path: [{ required: true, message: "请输入菜单路径" }],
  name: [{ required: true, message: "请输入路由名称" }],
  component: [{ required: false, message: "请输入组件路径" }],
  hidden: [{ required: true, message: "请选择是否隐藏" }],
  redirect: [{ required: false, message: "请输入重定向路径" }],
  svgIcon: [{ required: false, message: "请输入图标" }],
  seq: [{ required: false, message: "请输入顺序" }],
  parentId: [{ required: false, message: "情选择上级菜单" }]
}
const hiddenOption = [
  { label: "是", value: "true" },
  { label: "否", value: "false" }
]
const visible = ref<boolean>(false)

const showDrawer = () => {
  visible.value = true
}
const permissionStore = usePermissionStore()
const onClose = () => {
  visible.value = false
}

const onOk = () => {
  const param = { ...form }
  param["hidden"] = form["hidden"] === "true"
  param["common"] = form["common"] === "true"
  addMenuApi([param]).then((res: any) => {
    if (res.code === 200) {
      message.info(res.message)
    } else {
      message.error(res.message)
    }
    visible.value = false
    emit("search")
  })
}
</script>

<style lang="scss" scoped>
.bar-btn {
  margin-right: 8px;
}
</style>
