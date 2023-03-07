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
    debugger
    if (index >= 0) {
      if (_pm[index].permission && Array.isArray(_pm[index].permission) && _pm[index].permission.length > 0) {
        if (!_pm[index].permission.includes(value)) {
          el.style.display = "none"
        }
      }
    }
  }
}
