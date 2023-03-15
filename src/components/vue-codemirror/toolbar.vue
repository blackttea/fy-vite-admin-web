<template>
  <div class="toolbar">
    <div class="item">
      <label for="language">language:</label>
      <a-select
        name="language"
        id="language"
        :disabled="disabled"
        v-model:value="formState.language"
        @change="handleSelectLanguage"
        :options="languageOption"
        class="set-select"
        size="small"
      />
    </div>
    <div class="item">
      <label for="theme">theme:</label>
      <a-select
        name="theme"
        id="theme"
        :disabled="disabled"
        v-model:value="formState.theme"
        :options="themeOption"
        @change="settingChange('theme')"
        size="small"
        class="set-select"
      />
    </div>
    <div class="item">
      <label for="disabled">disabled:</label>
      <a-checkbox v-model:checked="formState.disabled" :disabled="disabled" @change="settingChange('disabled')" />
    </div>
    <div class="item">
      <label for="autofocus">autofocus:</label>
      <a-checkbox v-model:checked="formState.autofocus" :disabled="disabled" @change="settingChange('autofocus')" />
    </div>
    <div class="item">
      <label for="indentWithTab">indentWithTab:</label>
      <a-checkbox
        v-model:checked="formState.indentWithTab"
        :disabled="disabled"
        @change="settingChange('indentWithTab')"
      />
    </div>
    <div class="item">
      <label for="tabSize">tabSize:</label>
      <a-select
        name="tabSize"
        id="tabSize"
        :disabled="disabled"
        v-model:value="formState.tabSize"
        :options="sizeOption"
        size="small"
        class="set-select"
        @change="settingChange('tabSize')"
      />
    </div>
    <div class="item">
      <label for="height">height:</label>
      <a-select
        name="height"
        id="height"
        :disabled="disabled"
        v-model:value="formState.height"
        :options="heightOption"
        size="small"
        class="set-select"
        @change="settingChange('height')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Option {
  label: string | number
  value: string | number
}
import { PropType, reactive } from "vue"

const emit = defineEmits(["language", "updateConfig"])
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  config: {
    type: Object,
    required: true
  },
  languages: {
    type: Array as PropType<Array<string>>,
    required: true
  },
  themes: {
    type: Array as PropType<Array<string>>,
    required: true
  }
})
const formState = reactive({
  ...props.config
})
const languageOption = reactive<Option[]>([])
const themeOption = reactive<Option[]>([])
const sizeOption: Option[] = [
  { label: 2, value: 2 },
  { label: 4, value: 4 },
  { label: 6, value: 6 },
  { label: 8, value: 8 }
]
const heightOption: Option[] = [
  { label: "auto", value: "auto" },
  { label: "200px", value: "200px" },
  { label: "40em", value: "40em" },
  { label: "60vh", value: "60vh" }
]
const initOption = () => {
  for (const lan of props.languages || []) languageOption.push({ label: lan, value: lan })
  for (const theme of props.themes || []) themeOption.push({ label: theme, value: theme })
}

initOption()
const handleSelectLanguage = (event: any) => {
  emit("language", event)
}

const settingChange = (name: string) => {
  const config = { name, value: formState[name] }
  emit("updateConfig", config)
}
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 0 1em;
  border: 1px solid #f3f3f3;

  .item {
    display: flex;
    align-items: center;
    .set-select {
      width: 200px;
    }
    label {
      margin-right: 8px;
    }
  }
}
</style>
