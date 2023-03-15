<script lang="ts" setup>
import upload from "@/components/upload/index.vue"
</script>

<template>
  <div>
    <upload />
    <a-button v-permission="'add'">add</a-button>
    <a-button v-permission="'delete'">addRole</a-button>
  </div>
</template>

<style lang="scss" scoped></style>
