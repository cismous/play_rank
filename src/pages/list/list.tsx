/* eslint-disable max-len */

import * as React from 'react'
import * as style from './list.css'
import * as classNames from 'classnames'

declare const PubSub: {
  subscribe: (type: string, callback: (msg: string, data: any) => void) => void
}
declare const zbmate: {
  connect: () => void
}

interface ReceivedGift {
  avatar: string
  username: string
  sendGiftNum: number
}

interface Gift {
  giftIcon: string
  iconCode: string
  giftName: string
  nameCode: string
  giftNum: number
  numCode: string
  maxGiftNum: number
  minGiftNum: number
  animated: string
}

interface UserSendGift {
  type: string
  time: number //平台发来的数据有时间戳用平台的,没有就用当前时间戳, must
  uid: number // 用户id,是直播平台的用户id, must
  nn: string // 用户名字昵称, must
  ic: string // 用户头像, must
  default_ic: string // 是否是默认头像,有些平台没有头像,ic就是智播提供的默认头像, must
  rm: boolean // 房管,boolean值, option
  pnl: number // 平台贵族等级, option；
  pnl_name: string // 贵族等级名称, option
  pnl_icon: string // 贵族等级图片, option
  nl: number // 贵族等级, option；是贵族才有这个字段
  nl_name: string // 贵族等级名称, option
  nl_icon: string // 贵族等级图片, option
  gfid: number // 礼物id，平台提供, must
  gfcnt: number // 礼物数目, must
  gift: {
    // 礼物详情,是一个对象, must
    name: string // 礼物名字,must
    price: number // 礼物价格, must
    icon: string // 礼物图片, must
    gif: string // 礼物动态图片, option, 如果这个存在,优先使用这个
  }
}

export const List = (): JSX.Element => {
  const [giftList, setGiftList] = React.useState<Gift[]>([
    {
      iconCode: 'gift1_icon',
      nameCode: 'gift1_name',
      numCode: 'gift1_target',
      giftIcon: `https://static.hdslb.com/live-static/live-room/images/gift-section/mobilegift-static-icon/gift-102.png?20171010161652`,
      giftName: '秘银水壶',
      giftNum: 10,
      maxGiftNum: 9999,
      minGiftNum: 1,
      animated: 'heartBeat animated',
    },
    {
      iconCode: 'gift2_icon',
      nameCode: 'gift2_name',
      numCode: 'gift2_target',
      giftIcon: 'http://zbmate.com/gifts/iqiyi/woyaoshangche90.gif',
      giftNum: 10,
      giftName: '快上车',
      maxGiftNum: 9999,
      minGiftNum: 1,
      animated: 'heartBeat animated',
    },
    {
      iconCode: 'gift3_icon',
      nameCode: 'gift3_name',
      numCode: 'gift3_target',
      giftIcon: 'http://zbmate.com/gifts/zd.png',
      giftNum: 10,
      giftName: '快上车',
      maxGiftNum: 9999,
      minGiftNum: 1,
      animated: 'heartBeat animated',
    },
    {
      iconCode: 'gift4_icon',
      nameCode: 'gift4_name',
      numCode: 'gift4_target',
      giftIcon: 'https://s1.hdslb.com/bfs/live/d46c2628e13dbfb5a0e11a0b91d17288d4f51e82.png',
      giftNum: 10,
      giftName: '告白玫瑰',
      maxGiftNum: 9999,
      minGiftNum: 1,
      animated: 'heartBeat animated',
    },
    {
      iconCode: 'gift5_icon',
      nameCode: 'gift5_name',
      numCode: 'gift5_target',
      giftIcon: 'https://s1.hdslb.com/bfs/live/38f512f2419ab3f284bacd303e4fd6d39e3b4d3c.png',
      giftNum: 10,
      giftName: '虎牙一号',
      maxGiftNum: 9999,
      minGiftNum: 1,
      animated: 'heartBeat animated',
    },
    {
      iconCode: 'gift6_icon',
      nameCode: 'gift6_name',
      numCode: 'gift6_target',
      giftIcon: 'https://s1.hdslb.com/bfs/live/12837763e084cad78a026808af9a4b9f40e4afca.png',
      giftNum: 10,
      giftName: '为你而唱',
      maxGiftNum: 9999,
      minGiftNum: 1,
      animated: 'heartBeat animated',
    },
  ])

  const [receivedGiftList, setReceivedGiftList] = React.useState<ReceivedGift[]>(() => {
    return Array(giftList.length)
  })

  React.useEffect(() => {
    const _receivedGiftList = [...receivedGiftList]
    _receivedGiftList[0] = {
      avatar: 'https://s1.hdslb.com/bfs/live/12837763e084cad78a026808af9a4b9f40e4afca.png',
      username: '张三',
      sendGiftNum: 100,
    }

    setReceivedGiftList(_receivedGiftList)
  }, [])

  React.useEffect(() => {
    try {
      PubSub.subscribe('connect', function(msg, data) {
        console.log(msg, data)
      })

      PubSub.subscribe('disconnect', function(msg, data) {
        console.log(msg, data)
      })

      PubSub.subscribe('gift', function(msg, data: UserSendGift) {
        console.log(msg, data)
      })

      zbmate.connect()
    } catch (err) {}
  }, [])

  return (
    <div className={style.gift}>
      <video className={style.bgVideo} muted loop autoPlay>
        <source src='http://zbmate.com//border/lshy/webcam.webm' type='video/webm' />
      </video>

      <div className={style.title}>榜单标题</div>
      <div className={style.list}>
        {giftList.map((gift, i) => (
          <div
            key={i}
            className={classNames(
              style.item,
              receivedGiftList[i] && receivedGiftList[i].sendGiftNum >= gift.giftNum
                ? [style.userItem, 'heartBeat animated']
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
