<template>
  <div class="left-bar">
    <div
      class="component-item"
      v-for="item in lowSetting.sideBar"
      :key="item.type"
      @dragstart="drag($event, item.id)"
      draggable="true"
    >
      <component :is="item.icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { reactive } from "vue"
// import { components } from "@/views/lowCode/hook/setting"

import { useLowSetting } from "@/store/modules/lowSetting"
const lowSetting = useLowSetting()
const drag = (e: any, id: number) => {
  e.dataTransfer.setData("id", id)
}
</script>

<style scoped lang="scss">
.left-bar {
  width: 100%;
  height: 100%;
  background: #d9e9ff;
  display: flex;
  flex-wrap: wrap;
  .component-item {
    width: calc(33.33% - 10px);
    height: 30px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    border-radius: 3px;
  }
}
</style>
