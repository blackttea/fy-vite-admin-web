<script lang="ts">
import { h } from "vue"
import analysis from "@/views/lowCode/hook/analysis"
import { useLowCodeStore } from "@/store/modules/lowCode"
import setting from "./component/setting/index.vue"

export default {
  setup() {
    const _a = new analysis()
    const lowStore = useLowCodeStore()
    const renderDom = (dom: any): any => {
      if (dom) {
        if (dom?.children && Array.isArray(dom?.children) && dom.children.length > 0) {
          const children: any[] = []
          for (const _dom of dom.children) children.push(renderDom(_dom))
          return h(setting, { setting: dom }, { default: () => h(_a.getTag(dom.type), _a.getProps(dom), ...children) })
        } else {
          return h(
            setting,
            { setting: dom },
            { default: () => h(_a.getTag(dom.type), _a.getProps(dom), { default: () => dom.children }) }
          )
        }
      }
    }

    return () =>
      h(
        "div",
        { style: lowStore.style },
        {
          default: () =>
            lowStore.dom.map((item) => {
              return renderDom(item)
            })
        }
      )
  }
}
</script>
