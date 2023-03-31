<template>
  <div class="fy-table-container">
    <div class="fy-toolbar" />
    <div class="fy-table-main" ref="table">
      <vxe-grid v-bind="gridOptions">
        <template v-for="item in slot" v-slot:[item]="{ row }">
          <slot :name="item" :row="row" />
        </template>
      </vxe-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue"
import { VxeGridProps } from "vxe-table"

const slot = reactive<string[]>([])
const table = ref()
const props = defineProps({
  toolbar: {
    type: Array,
    default: () => {
      return []
    }
  },
  gridOption: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const gridOptions = reactive<VxeGridProps>(
  Object.assign(
    {
      border: true,
      align: null,
      loading: false,
      columnConfig: {
        resizable: true
      },
      columns: [],
      data: []
    },
    props.gridOption || {}
  )
)

const initSlot = () => {
  slot.length = 0
  const column: any[] = gridOptions.columns || []
  for (const col of column) {
    if (col?.slots) {
      if (col.slots.default) {
        slot.push(col.slots.default)
      }
      if (col.slots.edit) {
        slot.push(col.slots.edit)
      }
    }
  }
}
initSlot()
const setHeight = () => {
  if (table.value) {
    console.log(table.value.clientHeight)
  }
}
onMounted(() => {
  setHeight()
})
</script>

<style scoped lang="scss">
.fy-table-container {
  width: 100%;
  height: 100%;
}
</style>
