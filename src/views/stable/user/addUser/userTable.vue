<template>
  <a-table :columns="columns" :data-source="data" size="small" :pagination="false" :bordered="true">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'age'">
        <a-select
          @change="permissionChane"
          v-model:value="record.age"
          :maxTagCount="3"
          mode="multiple"
          style="width: 90%"
          option-label-prop="label"
          :options="record.tags"
        />
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { reactive } from "vue"

const emit = defineEmits(["update:value"])
// const props = defineProps(["value"])
const columns = reactive([
  {
    title: "菜单",
    dataIndex: "name",
    key: "name",
    width: 150
  },
  {
    title: "权限",
    dataIndex: "age",
    key: "age"
  }
])
const op = []
for (let i = 0; i < 50; i++) op.push({ label: `ieeeeeeeee`, value: i })
const data = reactive([
  {
    key: "1",
    name: "John Brown",
    age: [],
    tags: op
  },
  {
    key: "2",
    name: "Jim Green",
    age: [],
    tags: op
  },
  {
    key: "3",
    name: "Joe Black",
    age: [],
    tags: op
  },
  {
    key: "3",
    name: "Joe Black",
    age: [],
    tags: op
  },
  {
    key: "3",
    name: "Joe Black",
    age: [],
    tags: op
  }
])

const permissionChane = () => {
  console.log(data)
  emit("update:value", data)
}
</script>
