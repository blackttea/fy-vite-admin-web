<template>
  <div class="setting-container" :style="setting.props.style" @contextmenu.prevent="visible = true" ref="modal">
    <slot />
    <a-modal
      v-model:visible="visible"
      title="测试"
      @ok="handleOk"
      width="60%"
      :getContainer="() => $refs.modal"
      :maskClosable="false"
    >
      <div class="component-setting">
        <a-tabs v-model:activeKey="activeKey" style="height: 100%" tab-position="left" animated size="small">
          <a-tab-pane :tab="item.title" v-for="(item, i) in tabList" :key="item.key">
            <div class="tab-content">
              <component :is="item.component" :ref="(e) => getRef(e, i)" :setting="setting" />
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import addData from "../addData/index.vue"
import addEvent from "../addEvent/index.vue"
const props = defineProps(["setting"])
console.log(props)

const visible = ref(false)
const activeKey = ref("0")
const refList = ref<any[]>([])

const tabList = [
  { key: "0", title: "数据(props)", component: addData, data: "" },
  { key: "1", title: "事件(event)", component: addEvent, data: "" },
  { key: "2", title: "样式(css)", component: "div", data: "" },
  { key: "3", title: "插槽(slot)", component: "div", data: "" },
  { key: "4", title: "其他(loop)", component: "div", data: "" },
  { key: "5", title: "预览", component: "div", data: "" }
]

const getRef = (e: any, i: number) => {
  if (e) refList.value[i] = e
}

const handleOk = () => {
  console.log(refList.value)
  if (refList.value[0].onFinish) refList.value[0].onFinish()
  visible.value = false
  // const index = lowCodeStore.dom.findIndex((d) => {
  //   return d.id === props.setting.id
  // })
  // lowCodeStore.dom[index].props["onUpdate:value"] = (value: any) => {
  //   lowCodeStore.data[name.value] = value
  // }
  // lowCodeStore.dom[index].setting["value"] = name.value
  //
  // if (!lowCodeStore.data[name.value]) lowCodeStore.data[name.value] = "test"
}
</script>

<style scoped lang="scss">
.setting-container {
  clear: both;
  display: inline-block;
  margin: 8px 8px 0 8px;
}
.component-setting {
  width: 100%;
  height: 500px;
  border: 1px #f0f0f0 solid;
  .tab-content {
    height: 500px;
    width: 100%;
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
:deep(.ant-modal-body) {
  padding: 16px !important;
}

:deep(.ant-modal-wrap) {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.ant-modal-header) {
  padding: 16px;
}

:deep(.ant-modal) {
  margin: 0 !important;
  top: 0 !important;
}
</style>
