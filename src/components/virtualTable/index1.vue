<template>
  <div class="vir-container" @scroll="scrollEvent" ref="virtualRef" v-if="false">
    <div class="vir-item" v-for="v in showList" :key="v.id" :style="itemStyle">
      <slot :data="v" name="row" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"

const props = defineProps({
  data: {
    type: Array,
    default: () => {
      return []
    }
  },
  maxNum: {
    type: Number,
    default: 20
  },
  qpr: {
    type: Number,
    default: 1
  }
})
const virtualRef = ref<any>()
const childHeight = ref<number>(0)
const itemStyle = reactive({})
const emit = defineEmits(["getData"])
const showInfo = reactive<any>({
  index: []
})

for (let i = 0; i < 20; i++) showInfo.index.push(i)
const showList = reactive<any>([])
console.log(props, emit)

const setRowStyle = () => {
  const width = `calc(${100 / props.qpr}% - ${props.qpr}px)`
  Object.assign(itemStyle, { width })
}
const initShowList = (): void => {
  console.log("=================================")
  for (let i = 0; i < props.maxNum; i++) {
    if (props.data[showInfo.index[i]]) {
      console.log(props.data[showInfo.index[i]])
      showList.push(props.data[showInfo.index[i]])
    }
  }
}

const getChildHeight = (): void => {
  if (virtualRef.value && virtualRef.value.children.length > 0) {
    childHeight.value = virtualRef.value.children[0].clientHeight
  }
}
initShowList()
setRowStyle()

onMounted(() => {
  getChildHeight()
})
const scrollEvent = (el: any) => {
  const target = el.target
  const scrollTop = target.scrollTop
  const start = scrollTop / childHeight.value
  showInfo.index.length = 0
  for (let i = 1; i <= props.maxNum; i++) showInfo.index.push(start + i)
  initShowList()
}
</script>

<style scoped lang="scss">
.vir-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  .vir-item {
    margin: 15px 10px 15px 10px;
  }
}
</style>
