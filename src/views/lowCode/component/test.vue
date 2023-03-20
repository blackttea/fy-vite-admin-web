<template>
  <div style="width: 500px; background-color: #f3f3f3">
    <a-button type="primary" @click="onClick"> test1 </a-button>
    <slot />
    <slot name="port" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["test"])
const onClick = () => {
  emit("test")
}
</script>

<style scoped></style>
