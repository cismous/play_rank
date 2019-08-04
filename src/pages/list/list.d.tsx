/* eslint-disable max-len */

export interface ReceivedGift {
  avatar: string
  username: string
  sendGiftNum: number
  className: string
}

export interface Gift {
  giftIcon: string
  giftName: string
  giftNum: number
  maxGiftNum: number
  minGiftNum: number
  animated: string
}

export interface UserSendGift {
  type: string
  time: number //平台发来的数据有时间戳用平台的,没有就用当前时间戳, must
  uid: string // 用户id,是直播平台的用户id, must
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
  gfid: string // 礼物id，平台提供, must
  gfcnt: number // 礼物数目, must
  gift: {
    // 礼物详情,是一个对象, must
    name: string // 礼物名字,must
    price: number // 礼物价格, must
    icon: string // 礼物图片, must
    gif: string // 礼物动态图片, option, 如果这个存在,优先使用这个
  }
}
