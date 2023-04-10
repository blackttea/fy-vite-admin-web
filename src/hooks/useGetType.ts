const useGetType = (data: any, type?: string): boolean | string => {
  if (type) return Object.prototype.toString.call(data).toLowerCase() === `[object ${type.toLowerCase()}]`
  else return Object.prototype.toString.call(data).toLowerCase().slice(8, -1)
}

export default useGetType
