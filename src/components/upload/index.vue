<template>
  <a-upload v-model:file-list="fileList" :customRequest="() => {}" @change="getFile">
    <a-button>
      <upload-outlined />
      <slot />
    </a-button>
  </a-upload>
</template>
<script lang="ts" setup>
import { UploadOutlined } from "@ant-design/icons-vue"
import { ref } from "vue"
import type { UploadProps } from "ant-design-vue"
import { request } from "@/utils/service"
import useBase64 from "@/hooks/useBase64"
const emit = defineEmits(["success"])
const props = defineProps({
  url: String,
  message: String
})

const getFile = (file: any) => {
  const _file = new FormData()
  _file.append("file", file.file["originFileObj"])
  _file.append("text", props.message)
  request({
    url: props.url,
    method: "post",
    headers: {
      "content-type": "multipart/form-data"
    },
    responseType: "arraybuffer",
    data: _file
  }).then((res: any) => {
    console.log(useBase64(res))
    emit("success", useBase64(res))
  })
}
const fileList = ref<UploadProps["fileList"]>([])
</script>
