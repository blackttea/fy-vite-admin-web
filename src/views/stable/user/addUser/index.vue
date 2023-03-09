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
            <a-form-item label="用户名" name="username">
              <a-input v-model:value="form.username" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="密码" name="password">
              <a-input v-model:value="form.password" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="邮箱" name="email">
              <a-input v-model:value="form.email" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="手机" name="phone">
              <a-input v-model:value="form.phone" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="用户等级" name="level">
              <a-input v-model:value="form.level" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12"> </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="头像" name="img">
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
                  v-model:checkedKeys="form.roles"
                  checkable
                  :tree-data="treeData"
                >
                  <template #title="{ title, key }">
                    <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
                    <template v-else>{{ title }}</template>
                  </template>
                </a-tree>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <user-table v-model:vaue="form.permission" />
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
import { User } from "@/type/menu"
import { usePermissionStore } from "@/store/modules/permission"
import userTable from "./userTable.vue"

const form = reactive<User>({
  username: "",
  password: "",
  email: "",
  phone: "",
  img: "",
  roles: [],
  permission: [],
  level: 0
})
const props = defineProps({
  user: Object
})

const getInitData = () => {
  form.permission = JSON.parse(props.user?.permission || "[]")
  form.roles = JSON.parse(props.user?.roles || "[]")
}
const permissionStore = usePermissionStore()
const expandedKeys = ref<string[]>([])
const treeData = reactive([...permissionStore.parentList])
const checkAll = ref(false)

const selectAll = () => {}
const emit = defineEmits(["close"])
const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: "请输入用户" }],
  password: [{ required: true, message: "请输入密码" }],
  email: [{ required: true, message: "请输入邮箱" }],
  phone: [{ required: false, message: "请输入电话" }],
  img: [{ required: true, message: "请上传头像" }],
  roles: [{ required: false, message: "请选择菜单权限" }],
  permission: [{ required: false, message: "请选择页面权限" }],
  level: [{ required: false, message: "请选择用户级别" }]
}

const visible = ref<boolean>(true)

const onClose = () => {
  emit("close")
}

const onOk = () => {
  console.log(form)
  emit("close")
}

getInitData()
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
</style>
