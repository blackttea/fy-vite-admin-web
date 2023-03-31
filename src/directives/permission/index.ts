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

// 节流指令 一段时间内只执行一次
export const throttle: Directive = {
  beforeMount(el: HTMLElement, binding: any) {
    let timer: any = null
    const { method, fn, delay } = binding.value
    el.addEventListener(method || "click", (event: Event) => {
      const delayTime = delay || 2000
      if (!timer) {
        timer = setTimeout(() => {
          fn()
          clearTimeout(timer)
          timer = null
        }, delayTime)
      } else {
        event?.stopImmediatePropagation() // 阻止事件冒泡
      }
    })
  }
}

export const debounce: Directive = {
  beforeMount(el: HTMLElement, binding: any) {
    let timer: any = null
    const { method, fn, delay } = binding.value
    el.addEventListener(method || "click", () => {
      const delayTime = delay || 2000
      if (timer != null) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(() => {
        fn()
      }, delayTime)
    })
  }
}
