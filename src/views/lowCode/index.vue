<template>
  <padding>
    <div class="low-container">
      <div class="component-bar">
        <sidebar />
      </div>
      <div class="component-main">
        <div class="component-setting" />
        <div class="component-show" @drop="addComponent" @dragover="(e) => e.preventDefault()">
          <low class="show-main" />
        </div>
      </div>
    </div>
  </padding>
</template>

<script setup lang="ts">
import low from "./low.vue"
import sidebar from "./component/sidebar/index.vue"
import { useLowCodeStore } from "@/store/modules/lowCode"
import { useLowSetting } from "@/store/modules/lowSetting"
import useDeepClone from "@/hooks/useDeepClone"

const lowCode = useLowCodeStore()
const lowSetting = useLowSetting()

const addComponent = (e: any) => {
  const id: number = parseInt(e.dataTransfer.getData("id") || "0")
  const dom = useDeepClone(lowSetting.sideBar[id])
  dom.id = Date.now()
  lowCode.dom.push(dom)
}
</script>
<style lang="scss" scoped>
$bg: #ffffff;
.low-container {
  width: 100%;
  height: 100%;
  display: flex;
  .component-bar {
    width: 10%;
    height: 100%;
    background: $bg;
    border-right: 1px solid #f3f3f3;
    padding: 8px;
  }
  .component-main {
    width: 90%;
    height: 100%;
    background: $bg;
    .component-setting {
      width: 100%;
      height: 10%;
      padding: 8px;
      border-bottom: 2px solid #f3f3f3;
    }
    .component-show {
      width: 100%;
      height: 90%;
      padding: 8px;
      display: flex;
      align-content: flex-start;
      flex-wrap: wrap;
      overflow: auto;
      .show-main {
        background: #f2f2f2;
      }
    }
  }
}
</style>
