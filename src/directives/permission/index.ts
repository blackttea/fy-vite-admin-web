import { type Directive } from "vue"
import { useUserStoreHook } from "@/store/modules/user"
import { usePermissionStore } from "@/store/modules/permission"

/** 权限指令 */
export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding
    const userStore = useUserStoreHook()
    const permissionStore = usePermissionStore()
    const currentRoute = userStore.currentRoute
    const _pm = permissionStore.menuList
    const index = _pm.findIndex((pm) => {
      return pm.path === currentRoute
    })
    if (index >= 0) {
      const page = userStore.userInfo.page[<number>_pm[index].id] || []
      if (!page.includes(value)) {
        el.style.display = "none"
      }
    }
  }
}
