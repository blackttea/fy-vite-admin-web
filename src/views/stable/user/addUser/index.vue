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
              <a-select v-model:value="form.level" :options="roleOption" @change="initPermission" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12" />
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="头像" name="img" />
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
import { reactive, ref } from "vue"
import type { Rule } from "ant-design-vue/es/form"
import { User } from "@/type/menu"
import { usePermissionStore } from "@/store/modules/permission"
import {getRoleList, upUser} from "@/api/login"
import { message } from "ant-design-vue"

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

const props = defineProps({
  user: Object
})

const form = reactive<User>({
  username: props.user?.username || "",
  password: props.user?.password || "",
  email: props.user?.email || "",
  phone: props.user?.phone || "",
  img: props.user?.img || "",
  menu: props.user?.menu || [],
  page: props.user?.page || {},
  level: props.user?.level
})

const initPermission = () => {
  form.menu = role[form.level ?? 0]?.menu
  form.page = role[form.level ?? 0]?.page
  for (const key in menuPermission) delete menuPermission[key]
  Object.assign(menuPermission, form.page)
}
const selectedKeys = ref<string[]>([])
const menuPermission = reactive<any>({ ...form.page })
const permissionStore = usePermissionStore()
const expandedKeys = ref<string[]>([])
const treeData = reactive([...permissionStore.parentList])
const checkAll = ref(false)
const roleOption = reactive<Array<any>>([])
const role = reactive<any>([])
const selectAll = () => {}
const emit = defineEmits(["close"])

const getRole = () => {
  const param = {
    currentPage: 1,
    pageSize: 100
  }
  roleOption.length = 0
  getRoleList(param).then((res: any) => {
    console.log(res)
    if (res.code === 200) {
      for (const item of res.data || []) {
        roleOption.push({ label: item.name, value: item.level })
        role[item.level] = item
      }
    } else {
      message.info(res.message)
    }
  })
}
if (!props?.user?.username) {
  initPermission()
}
getRole()
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
  upUser([user]).then((res: any) => {
    console.log(res)
    debugger
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
</style>
