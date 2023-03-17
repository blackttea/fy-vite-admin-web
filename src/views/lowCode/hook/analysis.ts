import * as antd from "ant-design-vue"
import { useLowCodeHook } from "@/store/modules/lowCode"

interface Props {
  [index: string]: Function
}
class Analysis {
  constructor() {}
  handleData(bind: any, dom: any) {
    const lowCodeStore = useLowCodeHook()
    for (const item of dom.setting["data"]) {
      if (item.type === "model") {
        Object.assign(bind, {
          [`onUpdate:${item.name}`]: (value: any) => {
            lowCodeStore.data[item.name] = value
          }
        })
        if (!lowCodeStore.data[item.name]) lowCodeStore.data[item.name] = item.value
        Object.assign(bind, { [item.name]: lowCodeStore.data[item.name] })
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
    else return name
  }
}

export default Analysis
