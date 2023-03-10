/**
 * name 查找key
 * value key值
 * key 返回key值
 * obj 查找对象
 */
const useQueryTree = (name: string, value: any, key: string, obj: any): any => {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (item[name] === value) return item[key]
      if (item.children) {
        useQueryTree(name, value, key, item)
      }
    }
  } else {
    return useQueryTree(name, value, key, obj)
  }
}
export default useQueryTree
