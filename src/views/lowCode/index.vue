<template>
  <padding>
    <div class="low-container">
      <div class="component-bar">
        <sidebar />
      </div>
      <div class="component-main">
        <div class="component-setting" />
        <div class="component-show" @drop="addComponent" @dragover="(e) => e.preventDefault()">
          <low />
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

const lowCode = useLowCodeStore()
const lowSetting = useLowSetting()

const addComponent = (e: any) => {
  const id: number = parseInt(e.dataTransfer.getData("id") || "0")
  lowCode.dom.push(lowSetting.sideBar[id])
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
      border-bottom: 1px solid #f3f3f3;
    }
    .component-show {
      width: 100%;
      height: 90%;
      display: flex;
      align-content: flex-start;
      flex-wrap: wrap;
      overflow: auto;
    }
  }
}
</style>
