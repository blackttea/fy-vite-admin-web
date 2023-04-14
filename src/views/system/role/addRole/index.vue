<template>
  <div>
    <a-drawer
      title="新增菜单"
      :width="720"
      v-model:visible="visible"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <a-form :model="form" :rules="rules" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="名称" name="name">
              <a-input v-model:value="form.name" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="level" label="用户级别">
              <a-input v-model:value="form.level" size="small" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item name="permission">
              <div class="role-con">
                <div class="role-header">
                  菜单权限
                  <a-checkbox v-model:checked="checkAll" @change="selectAll"> 全选 </a-checkbox>
                </div>
                <a-tree
                  v-model:expandedKeys="expandedKeys"
                  v-model:checkedKeys="form.menu"
                  v-model:selectedKeys="selectedKeys"
                  checkable
                  :tree-data="treeData"
                />
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item name="permission" label="页面权限">
              <a-select
                v-model:value="menuPermission[selectedKeys[0]]"
                mode="multiple"
                style="width: 100%"
                option-label-prop="label"
                :options="permissionStore.menuPer[selectedKeys[0]]"
              />
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
// import { PlusOutlined } from "@ant-design/icons-vue"
import { reactive, ref } from "vue"
import type { Rule } from "ant-design-vue/es/form"
import { Role } from "@/type/menu"
import { usePermissionStore } from "@/store/modules/permission"
import { upRole } from "@/api/login"

const props = defineProps({
  user: Object
})
const form = reactive<Role>({
  name: props.user?.name || "",
  menu: props.user?.menu || [],
  page: props.user?.page || {},
  level: props.user?.level ?? undefined
})

const permissionStore = usePermissionStore()
const expandedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
const menuPermission = reactive<any>({ ...form.page })
const treeData = reactive([...permissionStore.parentList])
const checkAll = ref(false)

const selectAll = () => {}
const emit = defineEmits(["close"])
const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: "请输入用户" }],
  level: [{ required: false, message: "请选择用户级别" }]
}

const visible = ref<boolean>(true)

const onClose = () => {
  emit("close")
}

const onOk = () => {
  const user = { id: props.user?.id, ...form }
  user.page = {}
  for (const m of form.menu) {
    if (menuPermission[m]) user.page[m] = menuPermission[m]
    else {
      const tem = []
      for (const key of permissionStore.menuPer[m]) tem.push(key.value)
      user.page[m] = tem
    }
  }
  upRole([user]).then((res) => {
    console.log(res)
  })
  emit("close")
}
</script>

<style lang="scss" scoped>
.bar-btn {
  margin-right: 8px;
}
.role-con {
  border: 1px solid #f0f0f0ff;
  .role-header {
    height: 39px;
    width: 100%;
    background: #fafafa;
    margin-bottom: 8px;
    border-bottom: 1px solid #f0f0f0ff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px 0 8px;
  }
}

.menu-permission {
  width: 100%;
  display: flex;
  white-space: nowrap;
}
</style>
