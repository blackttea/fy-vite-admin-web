<template>
  <div class="setting-container" :style="setting.props.style" @contextmenu.prevent="visible = true" ref="modal">
    <slot />
    <a-modal v-model:visible="visible" title="测试" @ok="handleOk" width="60%" :getContainer="() => $refs.modal">
      <div class="component-setting">
        <a-tabs v-model:activeKey="activeKey" style="height: 100%" tab-position="left" animated size="small">
          <a-tab-pane :tab="item.title" v-for="item in tabList" :key="item.key">
            <div class="tab-content">
              <component :is="item.component" />
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useLowCodeStore } from "@/store/modules/lowCode"
import addData from "../addData/index.vue"
const lowCodeStore = useLowCodeStore()
const props = defineProps(["setting"])
const visible = ref(false)
const name = ref("")
const activeKey = ref("1")

const tabList = [
  { key: "1", title: "数据(props)", component: addData },
  { key: "2", title: "事件(event)", component: "div" },
  { key: "3", title: "样式(css)", component: "div" },
  { key: "4", title: "插槽(slot)", component: "div" },
  { key: "5", title: "其他", component: "div" }
]

const handleOk = () => {
  visible.value = false
  const index = lowCodeStore.dom.findIndex((d) => {
    return d.id === props.setting.id
  })
  lowCodeStore.dom[index].props["onUpdate:value"] = (value: any) => {
    lowCodeStore.data[name.value] = value
  }
  lowCodeStore.dom[index].setting["value"] = name.value

  if (!lowCodeStore.data[name.value]) lowCodeStore.data[name.value] = "test"
}
</script>

<style scoped lang="scss">
.setting-container {
  clear: both;
  border: 1px solid #c69026;
  display: inline-block;
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
