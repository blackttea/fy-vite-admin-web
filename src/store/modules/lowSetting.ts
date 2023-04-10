import store from "@/store"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useLowSetting = defineStore("lowSetting", () => {
  const sideBar = ref<any[]>([])
  const data = ref<any>({})
  const initSideBar = () => {
    const testList = [
      {
        id: 0,
        type: "div",
        icon: "div",
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
        icon: "button",
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
        icon: "input",
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
