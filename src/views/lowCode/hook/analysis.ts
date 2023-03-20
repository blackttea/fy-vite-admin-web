import * as antd from "ant-design-vue"
import { useLowCodeHook } from "@/store/modules/lowCode"
import test from "../component/test.vue"
interface Props {
  [index: string]: Function
}
class Analysis {
  constructor() {}
  handleData(bind: any, dom: any) {
    const lowCodeStore = useLowCodeHook()
    for (const item of dom.setting["data"]) {
      const data_name = `${item.name}_${dom.id}`
      if (item.type === "model") {
        Object.assign(bind, { [item.name]: lowCodeStore.data[data_name] })
      }
      if (item.name === "children") {
        Object.assign(dom, { children: lowCodeStore.data[data_name] })
      }
    }
  }

  handleEvent() {}

  getProps(dom: any) {
    const bind: any = {}
    const propsType: Props = {
      data: this.handleData,
      event: this.handleEvent
    }
    for (const _pt in propsType) {
      if (dom.setting[_pt]) {
        if (dom.setting[_pt]) propsType[_pt](bind, dom)
      }
    }
    return Object.assign(dom.props, bind)
  }
  getChildren() {}

  getTag(name: string) {
    // @ts-ignore
    if (antd[name]) return antd[name]
    else if (name === "test") return test
    else return name
  }
}

export default Analysis
