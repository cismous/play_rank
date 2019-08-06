/* eslint-disable max-len */

import * as React from 'react'
import * as style from './list.css'
import * as classNames from 'classnames'
import { Gift, ReceivedGift, UserSendGift } from './list.d'
import { GIFT_LIST, IS_PROD, VIDEO_LIST, COLOR_STYLE } from './constant'

declare const PubSub: {
  subscribe: (type: string, callback: (msg: string, data: any) => void) => void
  unsubscribe: (type: string, callback?: (msg: string, data: any) => void) => void
}

declare const zbmate: {
  connect: () => void
}

interface CacheGiftIndex {
  [key: string]: { num: number; index: number }[]
}

export const List = (): JSX.Element => {
  const clearRef = React.useRef<number[]>([])
  const [giftList] = React.useState<Gift[]>(GIFT_LIST)

  const cacheGiftIndex: CacheGiftIndex = React.useMemo((): CacheGiftIndex => {
    const keys: CacheGiftIndex = {}
    giftList.forEach((item, index) => {
      if (!keys[item.giftName]) keys[item.giftName] = []
      keys[item.giftName].push({ num: item.giftNum, index })
      if (keys[item.giftName].length > 1) {
        keys[item.giftName] = keys[item.giftName].sort((a, b) => b.num - a.num)
      }
    })
    return keys
  }, [giftList])

  const [receivedGiftList, setReceivedGiftList] = React.useState<ReceivedGift[]>(() => {
    return Array(giftList.length)
  })

  React.useEffect(() => {
    try {
      PubSub.subscribe('connect', () => console.log('connected'))

      PubSub.subscribe('disconnect', () => console.log('disconnect'))

      zbmate.connect()
    } catch (err) {}
  }, [])

  React.useEffect(() => {
    let taskIdList: number[] = []

    if (!clearRef.current.length) return

    const _receivedGiftList = [...receivedGiftList]

    const clearClassName = (index: number) => {
      if (!_receivedGiftList[index] || !_receivedGiftList[index].className) return
      _receivedGiftList[index].className = ''
      clearRef.current[index] = null
      setReceivedGiftList(_receivedGiftList)
    }

    for (let index = 0; index < clearRef.current.length; index++) {
      const ts = clearRef.current[index]
      if (!ts) continue
      const taskTs = 1500 - (Date.now() - ts)
      if (taskTs <= 0) return clearClassName(index)
      taskIdList.push(window.setTimeout(() => clearClassName(index), taskTs))
    }

    return () => {
      for (const taskId of taskIdList) window.clearTimeout(taskId)
    }
  })

  // React.useEffect(() => {
  //   const taskId = setTimeout(() => {
  //     const _receivedGiftList = [...receivedGiftList]
  //     _receivedGiftList[0] = { avatar: 'aa', username: 'a', sendGiftNum: 100, className: 'heartBeat animated' }
  //     clearRef.current.push({ index: 0, ts: Date.now() })
  //     setReceivedGiftList(_receivedGiftList)
  //   }, 1000)
  //   return () => clearTimeout(taskId)
  // }, [])

  React.useEffect(() => {
    let didCancel = false

    const handlerGift = (msg: string, data: UserSendGift) => {
      if (didCancel) return

      const { ic: avatar, nn: username, gfcnt: sendGiftNum } = data
      const sendGiftName = data.gift.name

      const indexList = cacheGiftIndex[sendGiftName]
      if (!indexList) return

      let giftIndex = -1
      for (const item of indexList) {
        if (~giftIndex) continue
        if (sendGiftNum >= item.num) giftIndex = item.index
      }

      if (!~giftIndex) return

      const targetGift = giftList[giftIndex]

      // 当收到的礼物少于目标礼物数量 不操作
      if (sendGiftNum < targetGift.giftNum) return

      const _receivedGiftList = [...receivedGiftList]
      _receivedGiftList[giftIndex] = { avatar, username, sendGiftNum, className: 'heartBeat animated' }
      clearRef.current[giftIndex] = Date.now()

      setReceivedGiftList(_receivedGiftList)
    }

    try {
      PubSub.subscribe('dgb', handlerGift)
    } catch (err) {}

    return () => {
      didCancel = true
      try {
        PubSub.unsubscribe('dgb')
      } catch (err) {}
    }
  }, [receivedGiftList, giftList, cacheGiftIndex])

  return (
    <div className={classNames(style.gift, `gift-${giftList.length}`)}>
      <video className={style.bgVideo} muted loop autoPlay>
        <source src={VIDEO_LIST[giftList.length - 1]} type='video/webm' />
      </video>

      <div className={style.title}>{IS_PROD ? '<%= title %>' : '榜单标题'}</div>

      <div className={style.list}>
        {giftList.map((gift, i) => (
          <div
            key={i}
            style={{ background: COLOR_STYLE }}
            className={classNames(
              style.item,
              receivedGiftList[i] && receivedGiftList[i].sendGiftNum >= gift.giftNum
                ? [style.userItem, receivedGiftList[i].className]
                : style.giftItem,
            )}
          >
            {receivedGiftList[i] && receivedGiftList[i].sendGiftNum >= gift.giftNum ? (
              <>
                <div className={style.icon}>
                  <img src={receivedGiftList[i].avatar} />
                </div>

                <div className={style.userContent}>
                  <div className={style.username}>{receivedGiftList[i].username}</div>

                  <div className={style.innerGiftContent}>
                    <div className={style.icon}>
                      <img src={gift.giftIcon} />
                    </div>

                    <span className={style.name}>{gift.giftName}</span>
                    <span className={style.x}>X</span>
                    <span className={style.num}>{receivedGiftList[i].sendGiftNum}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={style.icon}>
                  <img src={gift.giftIcon} />
                </div>

                <div className={style.giftContent}>
                  <span className={style.name}>{gift.giftName}</span>
                  <span className={style.x}>X</span>
                  <span className={style.num}>{gift.giftNum}</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
