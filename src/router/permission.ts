import router from "@/router"
import { useUserStoreHook } from "@/store/modules/user"
import { usePermissionStoreHook } from "@/store/modules/permission"
import { ElMessage } from "element-plus"
import { whiteList } from "@/config/white-list"
import { getToken } from "@/utils/cache/cookies"
import asyncRouteSettings from "@/config/async-route"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const userStore = useUserStoreHook()
  const permissionStore = usePermissionStoreHook()
  document.title = to?.meta?.title || "vue3"
  // 判断该用户是否登录
  if (getToken()) {
    if (to.path === "/login") {
      // 如果已经登录，并准备进入 Login 页面，则重定向到主页
      userStore.currentRoute = to.path
      next()
      NProgress.done()
    } else {
      // 检查用户是否已获得其权限角色
      if (permissionStore.menu.length === 0) {
        try {
          if (asyncRouteSettings.open) {
            await userStore.getInfo()
            await permissionStore.getMenu()
            for (const m of permissionStore.menu) {
              router.addRoute("index", m)
            }
          } else {
            // 没有开启动态路由功能，则启用默认角色
          }
          userStore.currentRoute = to.path
          next({ ...to, replace: true })
        } catch (err: any) {
          // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
          userStore.resetToken()
          ElMessage.error(err.message || "路由守卫过程发生错误")
          userStore.currentRoute = "/login"
          next("/login")
          NProgress.done()
        }
      } else {
        userStore.currentRoute = to.path
        next()
      }
    }
  } else {
    // 如果没有 Token
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在免登录的白名单中，则直接进入
      userStore.currentRoute = to.path
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      userStore.currentRoute = "/login"
      next("/login")
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
