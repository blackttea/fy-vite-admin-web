import store from "@/store"
import { defineStore } from "pinia"
import { ref } from "vue"
import { BarsOutlined, CloseOutlined, MenuOutlined } from "@ant-design/icons-vue"

export const useLowSetting = defineStore("lowSetting", () => {
  const sideBar = ref<any[]>([])
  const data = ref<any>({})
  const initSideBar = () => {
    const testList = [
      {
        id: 0,
        type: "div",
        icon: BarsOutlined,
        props: {
          style: {
            background: "#00d9ff",
            width: "100%",
            height: "90px"
          }
        },
        children: "text",
        setting: {}
      },
      {
        id: 1,
        type: "Button",
        icon: CloseOutlined,
        props: {
          style: {
            width: "150px"
          },
          type: "primary"
        },
        children: "text",
        setting: {}
      },
      {
        id: 2,
        type: "Input",
        icon: MenuOutlined,
        props: {
          style: {
            width: "150px"
          }
        },
        children: null,
        setting: {}
      }
    ]
    for (const item of testList) sideBar.value.push(item)
  }
  initSideBar()
  return {
    sideBar,
    data
  }
})

/** 在 setup 外使用 */
export function useLowSettingHook() {
  return useLowSetting(store)
}
