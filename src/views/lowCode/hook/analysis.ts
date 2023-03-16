import * as antd from "ant-design-vue"
import { useLowCodeHook } from "@/store/modules/lowCode"

class Analysis {
  constructor() {}
  getProps(dom: any) {
    const lowCodeStore = useLowCodeHook()
    const bind: any = {}
    for (const key in dom.setting) {
      Object.assign(bind, { [key]: lowCodeStore.data[dom.setting[key]] })
    }
    return Object.assign(dom.props, bind)
  }
  getChildren() {}

  getTag(name: string) {
    // @ts-ignore
    if (antd[name]) return antd[name]
    else return name
  }
}

export default Analysis
