<script lang="ts" setup>
import upload from "@/components/upload/index.vue"
import { useFetchSelect } from "@/components/hook/useFetchSelect"
import { ref, reactive } from "vue"
import fyTable from "@/components/fyTable/index.vue"

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

const clickBtn = (data) => {
  console.log("1======================", data)
}

const gridOptions = reactive({
  border: true,
  align: null,
  columnConfig: {
    resizable: true
  },
  columns: [
    { type: "seq", width: 50 },
    { field: "name", title: "name" },
    { field: "sex", title: "sex", showHeaderOverflow: true },
    { field: "address", title: "Address", showOverflow: true }
  ],
  data: [
    { id: 10001, name: "Test1", nickname: "T1", role: "Develop", sex: "Man", age: 28, address: "Shenzhen" },
    { id: 10002, name: "Test2", nickname: "T2", role: "Test", sex: "Women", age: 22, address: "Guangzhou" },
    { id: 10003, name: "Test3", nickname: "T3", role: "PM", sex: "Man", age: 32, address: "Shanghai" },
    { id: 10004, name: "Test4", nickname: "T4", role: "Designer", sex: "Women", age: 23, address: "Shenzhen" },
    { id: 10005, name: "Test5", nickname: "T5", role: "Develop", sex: "Women", age: 30, address: "Shanghai" },
    { id: 10006, name: "Test6", nickname: "T6", role: "Designer", sex: "Women", age: 21, address: "Shenzhen" },
    { id: 10007, name: "Test7", nickname: "T7", role: "Test", sex: "Man", age: 29, address: "Shenzhen" },
    { id: 10008, name: "Test8", nickname: "T8", role: "Develop", sex: "Man", age: 35, address: "Shenzhen" }
  ]
})
</script>

<template>
  <div class="dash-container">
    <upload />
    <a-button v-permission="'add'" v-throttle="{ fn: clickBtn.bind(55) }">add</a-button>
    <a-button v-permission="'delete'">delete</a-button>
    <a-select v-model:value="value" v-bind="selectBind" />
    <fy-table :gridOption="gridOptions" v-if="false" />
  </div>
</template>

<style lang="scss" scoped>
.dash-container {
}
</style>
