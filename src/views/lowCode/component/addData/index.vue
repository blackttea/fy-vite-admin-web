<template>
  <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm" @finish="onFinish">
    <a-space
      v-for="(data, index) in dynamicValidateForm.data"
      :key="data.id"
      style="display: flex; margin-bottom: 8px"
      align="baseline"
    >
      <a-form-item
        :name="['data', index, 'type']"
        label="类型"
        :rules="{
          required: true,
          message: 'Missing type'
        }"
      >
        <a-select v-model:value="data.type" :options="typeOption" style="width: 130px" />
      </a-form-item>
      <a-form-item
        label="名称"
        :name="['data', index, 'name']"
        :rules="{
          required: true,
          message: 'Missing name'
        }"
      >
        <a-input v-model:value="data.name" />
      </a-form-item>
      <a-form-item label="值" :name="['data', index, 'value']">
        <a-input v-model:value="data.value" />
      </a-form-item>
      <MinusCircleOutlined @click="removeData(data)" />
    </a-space>
    <a-form-item>
      <a-button type="dashed" block @click="addData" class="add-data-btn">
        <PlusOutlined />
        添加数据
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue"
import { reactive, ref } from "vue"
import type { FormInstance } from "ant-design-vue"
import { useLowCodeStore } from "@/store/modules/lowCode"

interface Data {
  type: "normal" | "model"
  name: string
  value: any
  id: number
}
const lowCodeStore = useLowCodeStore()
const props = defineProps(["setting"])
const typeOption = [
  {
    label: "普通",
    value: "normal"
  },
  {
    label: "双向绑定数据",
    value: "model"
  }
]
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{ data: Data[] }>({
  data: []
})

const removeData = (item: Data) => {
  const index = dynamicValidateForm.data.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.data.splice(index, 1)
  }
}
const getMax = (): number => {
  let max = 0
  for (const item of dynamicValidateForm.data) if (max < item.id) max = item.id
  return max
}
const addData = () => {
  dynamicValidateForm.data.push({
    type: "normal",
    name: "",
    value: "",
    id: getMax()
  })
}
const onFinish = (values: any) => {
  console.log(values)
  console.log(props.setting)

  const index = lowCodeStore.dom.findIndex((d) => {
    return d.id === props.setting.id
  })

  lowCodeStore.dom[index].setting["data"] = dynamicValidateForm.data
}

defineExpose({
  onFinish
})
</script>
<style lang="scss" scoped>
.add-data-btn {
  width: 120px;
}
</style>
