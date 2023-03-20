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
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  background: #f2f2f2;
  .component-item {
    width: calc(33.33% - 10px);
    height: 30px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    border-radius: 1px;
  }
}
</style>
