import * as React from 'react'

export const useGift = (init: { icon: string; num: number; name: string }) => {
  const [name, setName] = React.useState(init.name)
  const [icon, setIcon] = React.useState(init.icon)
  const [num, setNum] = React.useState(init.num)

  return [{ name, icon, num }, { setName, setIcon, setNum }]
}
