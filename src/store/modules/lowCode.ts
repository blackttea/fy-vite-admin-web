import store from "@/store"
import { defineStore } from "pinia"

export const useLowCodeStore = defineStore("lowCode", () => {
  return {}
})

/** 在 setup 外使用 */
export function useLowCodeHook() {
  return useLowCodeStore(store)
}
