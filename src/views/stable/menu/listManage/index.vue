<template>
  <div class="list-manage-container">
    <div class="toolbar">
      <a-input v-model:value="inputValue" size="small" />
      <a-button type="primary" size="small" class="bar-btn" @click="addData">添加</a-button>
    </div>
    <div class="data-list">
      <div v-for="(item, index) in dataList" :key="item" class="list-title" @click="removeData">
        {{ item }}
        <div class="badge" :style="{ color, background: color }" :data-index="index">
          <span :data-index="index">删除</span>
          <div class="badge-corner" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onUnmounted } from "vue"

const emit = defineEmits(["update:value"])
const inputValue = ref()
const props = defineProps({
  value: String,
  color: {
    type: String,
    default: "#ff0000"
  }
})

const dataList = reactive<string[]>([...(props.value || [])])

const addData = () => {
  if (inputValue.value && !dataList.includes(inputValue.value)) {
    dataList.unshift(inputValue.value)
    updatePermission()
  }
}

const removeData = (e: any) => {
  if (e.target.dataset.index) {
    dataList.splice(e.target.dataset.index, 1)
    updatePermission()
  }
}

const updatePermission = () => {
  emit("update:value", JSON.stringify(dataList))
}
</script>

<style scoped lang="scss">
.list-manage-container {
  width: 100%;
  .toolbar {
    display: flex;
    width: 100%;
    .bar-btn {
      margin-left: 10px;
    }
  }
  .data-list {
    width: 100%;
    overflow-y: auto;
    height: 200px;
  }
  .list-title {
    width: calc(100% - 8px);
    height: 40px;
    border: 1px solid #f0f0f0;
    margin: 8px 0 8px 0;
    padding: 0 0 0 8px;
    display: flex;
    align-items: center;
    .badge {
      height: 22px;
      margin: 0 -8px 0 auto;
      padding: 0 8px 0 8px;
      border-radius: 2px;
      display: flex;
      span {
        color: #ffffff;
      }
      .badge-corner {
        border-radius: 2px;
        border-width: 0 0 8px 8px;
        margin: 22px -8px 0 0;
        width: 8px;
        height: 8px;
        color: currentcolor;
        border: 4px solid;
        transform: scaleY(0.75);
        transform-origin: top;
        border-color: currentcolor transparent transparent currentcolor;
      }
    }
  }
}
</style>
