<script lang="ts" setup>
import upload from "@/components/upload/index.vue"
import { ref } from "vue"

const value = ref("")
</script>

<template>
  <div>
    <upload />
    <a-button v-permission="'add'">add</a-button>
    <a-button v-permission="'delete'">addRole</a-button>
    <a-input v-model:value="value" />
  </div>
</template>

<style lang="scss" scoped></style>
