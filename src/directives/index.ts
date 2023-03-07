import { type App, Directive } from "vue"
import * as permission from "./permission"

/** 挂载自定义指令 */
export function loadDirectives(app: App) {
  const _file = [permission]
  let directives = {}
  for (const f of _file) directives = { ...directives, ...f }
  Object.keys(directives).forEach((key) => {
    app.directive(key, (directives as { [key: string]: Directive })[key]) //key是自定义指令名字；后面应该是自定义指令的值，值类型是string
  })
}
