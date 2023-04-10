<template>
  <padding>
    <upload url="/api/tool/wordToImg" @success="setImg" message="胜利了">图片上传</upload>
    <img :src="imgUrl" alt="" class="img" />
  </padding>
</template>

<script lang="ts" setup>
import upload from "@/components/upload/index.vue"
import { ref } from "vue"
const imgUrl = ref()

const setImg = (img: any) => {
  debugger
  imgUrl.value = img
}
console.log()
</script>

<style scoped lang="scss">
.img {
  width: 500px;
}
</style>
