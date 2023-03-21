import { onMounted, reactive, ref } from "vue"
// 定义下拉框接收的数据格式
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  key?: string
}

interface Key {
  label: string
  value: string
}
// 定义入参格式
interface FetchSelectProps {
  apiFun: () => Promise<any[]>
  key?: Key
}

export function useFetchSelect(props: FetchSelectProps) {
  const { apiFun, key } = props

  const options = ref<SelectOption[]>([])

  const loading = ref(false)

  /* 调用接口请求数据 */
  const loadData = () => {
    loading.value = true
    options.value = []
    apiFun().then(
      (data) => {
        loading.value = false
        if (key) {
          options.value = []
          for (const item of data) {
            options.value.push({
              label: item[key.label],
              value: item[key.value]
            })
          }
        } else {
          options.value = data
        }
      },
      (err) => {
        // 未知错误，可能是代码抛出的错误，或是网络错误
        loading.value = false
        options.value = [
          {
            value: "-1",
            label: err.message,
            disabled: true
          }
        ]
      }
    )
  }

  //   onMounted 中调用接口
  onMounted(() => {
    loadData()
  })

  return reactive({
    options,
    loading,
    style: { width: "150px" }
  })
}
