export declare interface Menu {
  title: string
  path: string
  name: string
  component: string | null
  hidden: boolean | string
  redirect: string
  id?: number
  svgIcon?: string
  elIcon?: string
  seq: number | undefined
  parentId: number | null | undefined
  permission: Array<string>
  children?: Array<object>
}

export declare interface iconList {
  label: string
  value: string
  icon: any
}

export declare interface User {
  username: string
  password: string
  email: string
  phone: string
  img: string
  roles: string | Array<any>
  permission: string | Array<any>
  level: number | undefined
}

export declare interface Role {
  name: string
  menu: string | Array<any>
  page: any
  level: number | undefined
}
