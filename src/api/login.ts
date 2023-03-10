import { request } from "@/utils/service"
import { Menu } from "@/type/menu"
import { Param } from "@/type/api"

export interface ILoginData {
  /** admin 或 editor */
  username: "admin" | "editor"
  /** 密码 */
  password: string
  /** 验证码 */
  code?: string
}

export interface formType {
  username: string
  phone: string
  email: string
  password: string
  rePassword: string
  emailCode?: string
}

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return request({
    url: "/api/user/code",
    method: "post",
    responseType: "arraybuffer"
  })
}
/** 登录并返回 Token */
export function loginA(data: ILoginData) {
  return request({
    url: "/users/login",
    method: "post",
    data
  })
}
/** 获取用户详情 */
export function getUserInfoApi() {
  return request({
    url: "/api/user/info",
    method: "post"
  })
}

/** 获取用户详情 */
export function loginApi(data: ILoginData) {
  return request({
    url: "/api/user/login",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function register(data: formType) {
  return request({
    url: "/api/user/register",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getMenuApi() {
  return request({
    url: "/api/menu/getMenu",
    method: "post"
  })
}

/** 获取用户详情 */
export function addMenuApi(data: Menu[]) {
  return request({
    url: "/api/menu/addMenu",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function sendEmailCode(data: formType) {
  return request({
    url: "/api/user/sendEmailCode",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function deleteMenu(data: number[]) {
  return request({
    url: "/api/menu/delMenu",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function updateMenu(data: Menu[]) {
  return request({
    url: "/api/menu/updateMenu",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getUserList(data: Param) {
  return request({
    url: "/api/user/getUser",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getRoleList(data: Param) {
  return request({
    url: "/api/user/getRole",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function upRole(data: any) {
  return request({
    url: "/api/user/updateRole",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function upUser(data: any) {
  return request({
    url: "/api/user/updateUser",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function upFile(data: any) {
  return request({
    url: "/api/user/uploadFile",
    method: "post",
    headers: {
      "content-type": "multipart/form-data"
    },
    data
  })
}
