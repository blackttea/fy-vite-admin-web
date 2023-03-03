<template>
  <div @mouseover="outerCon" @mouseout="leaveCon">
    <div class="child">
      p
      <div class="child-1">
        <div class="child-1-1">
          <a-input v-model:value="iV" style="width: 150px"></a-input>
        </div>
      </div>
      <div class="child-2">
        <div class="child-2-1">
          <a-input v-model:value="iV" style="width: 150px"></a-input>
        </div>
      </div>
    </div>
  </div>
  <div style="width: 50px; height: 50px; background-color: #409eff" draggable="true"></div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import test from "./component/test.vue"

const divCon = ref<any>()
const refList = reactive([])
const appList = reactive<any[]>([])

const iV = ref(1)
for (let i = 1; i <= 20; i++) {
  if (i < 3) {
    appList.push({ id: i, parentId: null })
  } else {
    appList.push({ id: i, parentId: Math.floor((i - 1) / 10) })
  }
}

const getQueryPath = (e: any) => {
  const _pc: string = e.target.parentNode.className
  const _pt: string = e.target.parentNode.tagName
  const _ec: string = e.target.className
  const _et: string = e.target.tagName
  const _pp: string = `${_pt}${_pc ? '.' : ''}${_pc}`
  const _ep: string = `${_et}${_ec ? '.' : ''}${_ec}`
  const path: string = `${_pp || ''} ${_ep || ''}`
  return { path, tag: _et }
}


const outerCon = (e: any) => {
  const { path, tag } = getQueryPath(e)
  const exceptTag = ["input"]
  if (!exceptTag.includes(tag.toLowerCase())) {
    const ele = <HTMLElement>document.querySelector(path)
    ele.className = `${ele.className} hover-con`
    divCon.value = ele
  }
}

const leaveCon = () => {
  divCon.value.className = divCon.value.className.replace(" hover-con", "")
}
console.log(appList)
onMounted(() => {
  console.log(refList)
  console.log(appList)
})
</script>

<style scoped>
.child {
  width: 100%;
  display: flex;
  height: 500px;
}
.hover-con {
  border: 1px dashed #409eff;
  box-shadow:2px 2px 2px #333333;
  background-color: #409eff;
}

.child-1,.child-2 {
  width: 50%;
  height: 200px;
}

.child-1-1,.child-2-1 {
  width: 100%;
  height: 200px;
}
</style>
