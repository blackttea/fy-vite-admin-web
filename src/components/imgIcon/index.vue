<template>
  <img :src="imgUrl" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import useRequireImg from "@/hooks/useRequireImg"

const props = defineProps(["src"])
const imgUrl = ref<any>()
const getUrl = () => {
  if (props.src.toString().length < 100) {
    if (props.src.toString().indexOf("http") > -1 || props.src.toString().indexOf("https")) {
      imgUrl.value = props.src
    } else {
      imgUrl.value = useRequireImg(props.src)
    }
  } else {
    imgUrl.value = props.src
  }
}

getUrl()
</script>

<style scoped></style>
