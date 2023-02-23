<template>
  <div style="width: 500px;background-color: #f3f3f3">
    <a-button type="primary"> test </a-button>
    <slot />
    <slot name="port" />
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped></style>
