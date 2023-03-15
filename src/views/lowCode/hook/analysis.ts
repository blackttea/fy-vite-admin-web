import * as antd from "ant-design-vue"

class Analysis {
  constructor() {}
  getProps() {}
  getChildren() {}

  getTag(name: string) {
    // @ts-ignore
    if (antd[name]) return antd[name]
    else return name
  }
}

export default Analysis
