import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { type RouteRecordRaw } from "vue-router"
import { Menu } from "@/type/menu"
import useFormatTree from "@/hooks/useFormatTree"
import useDeepClone from "@/hooks/useDeepClone"
import { getMenuApi } from "@/api/login"
import { message } from "ant-design-vue"
const view = import.meta.glob("../../**/**/**.vue")
import { useUserStore } from "@/store/modules/user"

const _menuPrefix = "../../views/"

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const menu = ref<RouteRecordRaw[]>([])
  const menuList = ref<Array<Menu>>([])
  const parentList = ref<Array<Menu>>([])
  const menuPer = ref<any>({})
  const activeMenu = ref<string>("")

  const m: Menu[] = []
  const pList: number[] = []
  let tempMenu: Menu[] = []
  const userStore = useUserStore()
  const getMenu = async () => {
    await getMenuApi().then((res: any) => {
      if (res.code == "200") {
        tempMenu = res.data
      } else {
        message.error(res.message)
      }
    })
    m.length = 0
    const getParentList = () => {
      const um = userStore.userInfo.menu
      for (let i = 0; i < (userStore.userInfo.menu || []).length; i++) {
        const _pm = tempMenu
        const index = _pm.findIndex((pm) => {
          return pm.id === um[i]
        })
        if (index >= 0) {
          if (Number.isInteger(_pm[index].parentId) && pList.indexOf(<number>_pm[index].parentId) < 0) {
            pList.push(<number>_pm[index].parentId)
            i = 0
          }
        }
      }
    }
    getParentList()
    for (const item of tempMenu || []) {
      // 用户权限中包含该菜单，公共组件，超级管理员可以看到该菜单
      if (
        (userStore.userInfo.menu || []).includes(item.id) ||
        item.common ||
        userStore.userInfo.level === 0 ||
        pList.includes(<number>item.id)
      ) {
        m.push(item)
      }
    }
    const reFormData = (data: any): void => {
      if (!data["component"] || data["component"] === "../layout/indexCopy.vue") data["children"] = []
      data["component"] = view[`${_menuPrefix}${data["component"]}.vue`] || data["component"]
      data["meta"] = {}
      const showList = ["hidden", "title", "svgIcon", "elIcon"]
      for (const item of showList) if (data[item] !== undefined) data["meta"][item] = data[item]
    }

    menu.value.length = 0
    menuList.value.length = 0
    parentList.value.length = 0
    const mCopy: Menu[] = useDeepClone(m)
    const mCopy1: Menu[] = useDeepClone(m)
    for (const n of mCopy) {
      menuList.value.push(n)
      const option = []
      for (const item of n.permission) option.push({ label: item, value: item })
      if (n.id) menuPer.value[n.id] = option
    }
    const menuRoute = useFormatTree(m, "id", "parentId", "children", reFormData, undefined)
    for (const item of menuRoute) menu.value.push(item)

    const reFormData1 = (data: any): void => {
      data["value"] = data["id"]
      data["key"] = data["id"]
    }
    const menuRoute1 = useFormatTree(mCopy1, "id", "parentId", "children", reFormData1, undefined)
    for (const item of menuRoute1) parentList.value.push(item)
    menu.value.sort((a: any, b: any) => {
      return a.seq - b.seq
    })
  }
  return { routes, menu, menuList, getMenu, parentList, menuPer, activeMenu }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
