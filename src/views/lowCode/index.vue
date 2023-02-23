<template>
  <div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
const refList = reactive([])
const appList = reactive<any[]>([])

for (let i = 1; i <= 20; i++) {
  if (i < 3) {
    appList.push({ id: i, parentId: null })
  } else {
    appList.push({ id: i, parentId: Math.floor((i - 1) / 10) })
  }
}
console.log(appList)
onMounted(() => {
  console.log(refList)
  console.log(appList)
})
</script>

<style scoped></style>
