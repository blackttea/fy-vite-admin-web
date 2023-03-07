<template>
  <div>
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
          <a-col :span="12">
            <a-form-item label="菜单权限" name="roles">
              <a-input v-model:value="form.roles" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="头像" name="img">
              <a-textarea v-model:value="form.img" :rows="4" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="页面权限" name="permission">
              <a-textarea v-model:value="form.permission" :rows="4" />
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
import { addMenuApi } from "@/api/login"
import { message } from "ant-design-vue"

// { field: "username", title: "用户名" },
// { field: "password", title: "密码", showHeaderOverflow: true },
// { field: "email", title: "邮箱", showOverflow: true },
// { field: "phone", title: "手机", showOverflow: true },
// { field: "img", title: "头像", showOverflow: true },
// { field: "roles", title: "菜单权限", showOverflow: true },
// { field: "permission", title: "页面权限", showOverflow: true },
// { field: "level", title: "用户等级", showOverflow: true },
// { title: "操作", slots: { default: "operate" } }
const form = reactive<Role>({
  username: "",
  password: "",
  email: "",
  phone: "",
  img: "",
  roles: "",
  permission: "",
  level: 0
})

const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: "请输入用户" }],
  password: [{ required: true, message: "请输入密码" }],
  email: [{ required: true, message: "请输入邮箱" }],
  phone: [{ required: false, message: "请输入电话" }],
  img: [{ required: true, message: "请上传头像" }],
  roles: [{ required: false, message: "请选择菜单权限"}],
  permission: [{ required: false, message: "请选择页面权限" }],
  level: [{ required: false, message: "请选择用户级别" }]
}

const visible = ref<boolean>(true)

const showDrawer = () => {
  visible.value = true
}
const permissionStore = usePermissionStore()
const onClose = () => {
  visible.value = false
}

const onOk = () => {}
</script>

<style lang="scss" scoped>
.bar-btn {
  margin-right: 8px;
}
</style>
