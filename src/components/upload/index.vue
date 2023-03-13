<template>
  <a-upload v-model:file-list="fileList" :customRequest="() => {}" @change="getFile">
    <a-button>
      <upload-outlined />
      Upload
    </a-button>
  </a-upload>
</template>
<script lang="ts" setup>
import { UploadOutlined } from "@ant-design/icons-vue"
import { ref } from "vue"
import type { UploadProps } from "ant-design-vue"
import { upFile } from "@/api/login"

const getFile = (file: any) => {
  const _file = new FormData()
  _file.append("file", file.file["originFileObj"])
  debugger
  console.log(file)
  upFile(_file).then((res) => {
    console.log(res)
    debugger
  })
}
const fileList = ref<UploadProps["fileList"]>([])
</script>
