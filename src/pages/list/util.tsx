export const hexToRgb = (hex: string, opacity: number): string => {
  const rgb: number[] = []

  hex = hex.substr(1) //去除前缀 # 号

  if (hex.length === 3) {
    // 处理 "#abc" 成 "#aabbcc"
    hex = hex.replace(/(.)/g, '$1$1')
  }

  hex.replace(/../g, (color: string): string => {
    rgb.push(parseInt(color, 0x10)) //按16进制将字符串转换为数字
    return ''
  })

  if (opacity) rgb.push(opacity)

  return 'rgb(' + rgb.join(',') + ')'
}
