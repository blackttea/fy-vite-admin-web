<template>
  <a-form ref="formRef" name="dynamic_form_nest_item" :model="dynamicValidateForm" @finish="onFinish">
    <a-space v-for="(event, index) in dynamicValidateForm.event" :key="event.id" class="event-form" align="baseline">
      <a-form-item
        :name="['event', index, 'type']"
        label="类型"
        :rules="{
          required: true,
          message: 'Missing type'
        }"
      >
        <a-select v-model:value="event.type" @change="typeChange(index)" :options="typeOption" style="width: 130px" />
      </a-form-item>
      <a-form-item
        label="名称"
        :name="['event', index, 'name']"
        :rules="{
          required: true,
          message: 'Missing name'
        }"
      >
        <a-input v-model:value="event.name" :disabled="eventEn.includes(event.type)" />
      </a-form-item>
      <a-form-item label="值" :name="['event', index, 'value']">
        <a-select v-model:value="event.function" :options="typeOption" style="width: 130px" />
      </a-form-item>
      <MinusCircleOutlined @click="removeData(event)" />
    </a-space>
    <a-form-item>
      <a-button type="dashed" block @click="addData" class="add-data-btn">
        <PlusOutlined />
        添加事件
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
  type: string
  name: string
  function: any
  id: number
}
const lowCodeStore = useLowCodeStore()
const props = defineProps(["setting"])

const eventEn = ["onClick", "onMouseover", "onMouseout", "onFocus", "onBlur", "onMousemove", "onMouseup", "onMousedown"]
const eventCn = ["鼠标点击", "鼠标经过", "鼠标离开", "获得鼠标焦点", "失去鼠标焦点", "鼠标移动", "鼠标弹起", "鼠标按下"]
const typeOption = reactive<{ label: string; value: string }[]>([])

const initOption = () => {
  for (const n in eventEn) {
    typeOption.push({ label: eventCn[n], value: eventEn[n] })
  }
  typeOption.push({ label: "其他", value: "other" })
}
initOption()
const formRef = ref<FormInstance>()
const dynamicValidateForm = reactive<{ event: Data[] }>({
  event: props?.setting?.event || []
})

const removeData = (item: Data) => {
  const index = dynamicValidateForm.event.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.event.splice(index, 1)
  }
}
const getMax = (): number => {
  let max = 0
  for (const item of dynamicValidateForm.event) if (max < item.id) max = item.id
  return max
}
const addData = () => {
  dynamicValidateForm.event.push({
    type: "",
    name: "",
    function: "",
    id: getMax()
  })
}

const typeChange = (index: number) => {
  if (eventEn.includes(dynamicValidateForm.event[index].type))
    dynamicValidateForm.event[index].name = dynamicValidateForm.event[index].type
  else dynamicValidateForm.event[index].name = ""
}

const onFinish = (values: any) => {
  console.log(values)
  console.log(props.setting)

  const index = lowCodeStore.dom.findIndex((d) => {
    return d.id === props.setting.id
  })

  for (const item of dynamicValidateForm.event) {
    const data_name = `${item.name}_${lowCodeStore.dom[index].id}`
    if (item.type === "model") {
      lowCodeStore.dom[index].props[`onUpdate:${item.name}`] = (value: any) => {
        lowCodeStore.data[data_name] = value
      }
    }
    if (!lowCodeStore.data[data_name]) lowCodeStore.data[data_name] = item.value
  }
  lowCodeStore.dom[index].setting["data"] = dynamicValidateForm.event
  // lowCodeStore.dom[index].setting["data"] = dynamicValidateForm.data
}

defineExpose({
  onFinish
})
</script>
<style lang="scss" scoped>
.add-data-btn {
  width: 120px;
}
.event-form {
  display: flex;
  margin-bottom: 8px;
}
</style>
