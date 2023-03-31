<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css" // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue"
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"
import { message } from "ant-design-vue"
import type { IEditorConfig } from "@wangeditor/core"

const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref("<p>hello</p>")

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = ""
  }, 1500)
})

const mode = ref("")
const toolbarConfig = {}
const editorConfig: Partial<IEditorConfig> = {
  // 最长输入2000字
  maxLength: 2000,
  // 进入页面不自动聚焦
  autoFocus: true,
  MENU_CONF: {}
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

editorConfig.MENU_CONF["uploadImage"] = {
  async customUpload(file: any, insertFn: any) {
    upLoadImgVideo("1", file, insertFn)
  }
}

// 上传视频
editorConfig.MENU_CONF["uploadVideo"] = {
  async customUpload(file: any, insertFn: any) {
    upLoadImgVideo("2", file, insertFn)
  }
}

// 封装 - 上传图片、视频
const upLoadImgVideo = (type: string, file: any, insertFn: any) => {
  if (file.size / 1024 / 1024 > 50) {
    message.error(`文件大小不能超过50MB!`)
    return false
  } else {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e: any) => {
      const res = e.target.result
      insertFn(res)
    }
  }
}
</script>

<style lang="scss" scoped></style>
