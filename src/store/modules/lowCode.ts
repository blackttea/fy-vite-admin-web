import store from "@/store"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useLowCodeStore = defineStore("lowCode", () => {
  const dom = ref<any[]>([])
  const style = {
    width: "100%",
    height: "100%"
  }
  // const style1 = {
  //   width: "200px",
  //   height: "200px",
  //   background: "#fff000"
  // }

  // setTimeout(() => {
  //   for (let i = 0; i < 3; i++) {
  //     dom.value.push({
  //       id: 0,
  //       type: "div",
  //       props: {
  //         onClick: () => {
  //           console.log("div1")
  //         },
  //         style: style1
  //       },
  //       children: [
  //         {
  //           id: 1,
  //           type: "span",
  //           props: {
  //             style: style1
  //           },
  //           children: i
  //         }
  //       ]
  //     })
  //   }
  // }, 3000)
  return {
    style,
    dom
  }
})

/** 在 setup 外使用 */
export function useLowCodeHook() {
  return useLowCodeStore(store)
}
