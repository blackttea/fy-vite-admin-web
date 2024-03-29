import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from "vue-router"
const view = import.meta.glob("../**/**/**.vue")
const layout = import.meta.glob("../layout/**/**.vue")

const Layout = layout["../layout/index.vue"]
/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/system/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/system/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/system/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/system/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    name: "register",
    path: "/register",
    component: () => import("@/views/system/login/register.vue"),
    meta: {
      hidden: true
    }
  },
  {
    name: "article",
    path: "/article",
    component: () => import("@/views/article/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layout,
    name: "index",
    children: [
      {
        path: "/system",
        component: view["../views/system/system/index.vue"],
        name: "system",
        meta: {
          title: "系统配置",
          svgIcon: "menu",
          hidden: true
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
