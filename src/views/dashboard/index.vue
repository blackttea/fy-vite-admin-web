<script lang="ts" setup>
import upload from "@/components/upload/index.vue"
import { useFetchSelect } from "@/components/hook/useFetchSelect"
import { ref } from "vue"

const value = ref("")
const getRemoteData = (): any => {
  return new Promise((resolve) => {
    const data = []
    for (let i = 0; i < 100; i++) {
      data.push({ name: i + "年", age: i })
    }
    setTimeout(() => {
      resolve(data)
    }, 3000)
  })
}

const selectBind = useFetchSelect({
  apiFun: getRemoteData,
  key: { label: "name", value: "age" }
})
</script>

<template>
  <div class="dash-container">
    <upload />
    <a-button v-permission="'add'">add</a-button>
    <a-button v-permission="'delete'">addRole</a-button>
    <a-input v-model:value="value" />
    <a-select v-model:value="value" v-bind="selectBind" />
  </div>
</template>

<style lang="scss" scoped>
.dash-container {
}
</style>
