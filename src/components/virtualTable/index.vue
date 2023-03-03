<script setup lang="ts">
import { ref, computed, onMounted, reactive, watch, h } from "vue"
import { LoadingOutlined } from "@ant-design/icons-vue"
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
  rowNum: {
    type: Number
  },
  qpr: {
    type: Number,
    default: 2
  }
})
const emit = defineEmits(["search"])
const loading = ref<boolean>(false)
const virRef = ref<any>()
const childHeight = ref<number>(0)
//容器真实高度
const containerHeight = ref(0)
//当前状态的索引
const startKey = ref(0)
//视窗内应该显示的 DOM 数量
const showItemNum = ref(0)
//容器dom节点
const wrapper = ref<any>(null)
//容器高度
const wrapperHeight = ref<number>(0)
const itemStyle = reactive({})

//片段容器偏移量
const scrollTopWrapper = ref<number>(0)
//滚动事件
const wrapperScroll = (e: any) => {
  //计算当前状态的索引
  const calRow = Math.floor(e.target.scrollTop / childHeight.value)
  const tempNum = calRow * props.qpr

  const isOnePage = Math.ceil(props.data?.length / props.qpr) <= Math.ceil(wrapperHeight.value / childHeight.value)
  //当前状态的索引发生变化才触发视图层刷新
  if (tempNum !== startKey.value || isOnePage) {
    const clientHeight = e.target.clientHeight
    const scrollTop = e.target.scrollTop
    const scrollHeight = e.target.scrollHeight
    if (clientHeight + scrollTop >= scrollHeight - 120 && !loading.value) {
      loading.value = true
      emit("search")
    }
    startKey.value = tempNum
    scrollTopWrapper.value = e.target.scrollTop - (e.target.scrollTop % childHeight.value)
  }
}
//对数据进行切片处理方法
const showItem = computed(() => {
  return [...props.data.slice(startKey.value, showItemNum.value + startKey.value + 3)]
})

const setRowStyle = () => {
  const width = `calc(${100 / props.qpr}% - 20px)`
  Object.assign(itemStyle, { width })
}

const getChildHeight = (): void => {
  if (wrapper.value && wrapper.value.children.length > 0) {
    childHeight.value = virRef.value.children[0].clientHeight

    wrapperHeight.value = wrapper.value.clientHeight
    //运算出应该显示的 DOM 数量
    showItemNum.value = Math.ceil(wrapperHeight.value / childHeight.value) * props.qpr
    containerHeight.value = Math.ceil(props.data.length / props.qpr) * childHeight.value
    if (loading.value) {
      loading.value = false
    }
  }
}

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "24px"
  },
  spin: true
})

watch(
  () => props.data,
  () => {
    getChildHeight()
}, { deep: true })

onMounted(() => {
  getChildHeight()
  setRowStyle()
})
</script>
<template>
  <div class="wrapper" ref="wrapper" @scroll="wrapperScroll($event)">
    <div class="wrapper-scroll" :style="{ height: containerHeight + 'px' }" style="position: relative">
      <div
        :style="{ transform: `translateY(${scrollTopWrapper}px)` }"
        style="position: absolute; width: 100%"
        class="virtual-main"
        ref="virRef"
      >
        <div v-for="(item, key) in showItem" :key="key" class="vir-item" :style="itemStyle">
          <slot :data="item" name="row" />
        </div>
        <div class="loading-data" v-if="loading">
          <a-spin :indicator="indicator" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  .virtual-main {
    display: flex;
    flex-wrap: wrap;
  }
  .vir-item {
    margin: 15px 10px 15px 10px;
  }
  .loading-data {
    width: 100%;
    display: flex;
    padding: 0 0 10px 0;
    justify-content: center;
    align-items: center;
  }
}

/* 滚动条宽高，横向滚动条的高，纵向滚动条的宽 */
::-webkit-scrollbar {
  width: 10px;
  height: 100px;
}

/* 滚动轨道 */
::-webkit-scrollbar-track {
  border-radius: 3px;
}

/* 滚动条 */
::-webkit-scrollbar-thumb {
  background: rgba(55, 55, 55, 0.1);
  border-radius: 3px;
}
</style>
