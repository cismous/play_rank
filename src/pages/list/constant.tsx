import { hexToRgb } from './util'

/* eslint-disable max-len */

export const IS_PROD = process.env.NODE_ENV === 'production'

const giftList = [
  ['<%= gift1Icon %>', '<%= gift1Name %>', '<%= gift1Num %>'],
  ['<%= gift2Icon %>', '<%= gift2Name %>', '<%= gift2Num %>'],
  ['<%= gift3Icon %>', '<%= gift3Name %>', '<%= gift3Num %>'],
  ['<%= gift4Icon %>', '<%= gift4Name %>', '<%= gift4Num %>'],
  ['<%= gift5Icon %>', '<%= gift5Name %>', '<%= gift5Num %>'],
  ['<%= gift6Icon %>', '<%= gift6Name %>', '<%= gift6Num %>'],
]

// for test
const _giftList = [
  ['<%= gift1Icon %>', '<%= gift1Name %>', '<%= gift1Num %>'],
  ['<%= gift2Icon %>', '<%= gift2Name %>', '-1'],
  ['<%= gift3Icon %>', '<%= gift3Name %>', '-1'],
  ['<%= gift4Icon %>', '<%= gift4Name %>', '-1'],
  ['<%= gift5Icon %>', '<%= gift5Name %>', '-1'],
  ['<%= gift6Icon %>', '<%= gift6Name %>', '-1'],
]

const _colorStyle = IS_PROD ? '<%= colorStyle %>' : '#000'
export const COLOR_STYLE = hexToRgb(_colorStyle, 0.25)

const ORIGIN_GIFT_LIST = [
  {
    giftIcon: IS_PROD
      ? '<%= gift1Icon %>'
      : `https://static.hdslb.com/live-static/live-room/images/gift-section/mobilegift-static-icon/gift-102.png?20171010161652`,
    giftName: IS_PROD ? '<%= gift1Name %>' : '虎粮',
    giftNum: IS_PROD ? Number('<%= gift1Num %>') || 10 : 10,
    maxGiftNum: 9999,
    minGiftNum: 1,
    animated: 'heartBeat animated',
  },

  {
    giftIcon: IS_PROD ? '<%= gift2Icon %>' : `http://zbmate.com/gifts/iqiyi/woyaoshangche90.gif`,
    giftName: IS_PROD ? '<%= gift2Name %>' : '虎粮1',
    giftNum: IS_PROD ? Number('<%= gift2Num %>') || 10 : 11,
    maxGiftNum: 9999,
    minGiftNum: 1,
    animated: 'heartBeat animated',
  },

  {
    giftIcon: IS_PROD ? '<%= gift3Icon %>' : `http://zbmate.com/gifts/zd.png`,
    giftName: IS_PROD ? '<%= gift3Name %>' : '虎粮',
    giftNum: IS_PROD ? Number('<%= gift3Num %>') || 10 : 9,
    maxGiftNum: 9999,
    minGiftNum: 1,
    animated: 'heartBeat animated',
  },

  {
    giftIcon: IS_PROD
      ? '<%= gift4Icon %>'
      : `https://s1.hdslb.com/bfs/live/d46c2628e13dbfb5a0e11a0b91d17288d4f51e82.png`,
    giftName: IS_PROD ? '<%= gift4Name %>' : '虎粮2',
    giftNum: IS_PROD ? Number('<%= gift4Num %>') || 10 : 12,
    maxGiftNum: 9999,
    minGiftNum: 1,
    animated: 'heartBeat animated',
  },

  {
    giftIcon: IS_PROD
      ? '<%= gift5Icon %>'
      : `https://s1.hdslb.com/bfs/live/38f512f2419ab3f284bacd303e4fd6d39e3b4d3c.png`,
    giftName: IS_PROD ? '<%= gift5Name %>' : '虎粮',
    giftNum: IS_PROD ? Number('<%= gift5Num %>') || 10 : 8,
    maxGiftNum: 9999,
    minGiftNum: 1,
    animated: 'heartBeat animated',
  },

  {
    giftIcon: IS_PROD
      ? '<%= gift6Icon %>'
      : `https://s1.hdslb.com/bfs/live/12837763e084cad78a026808af9a4b9f40e4afca.png`,
    giftName: IS_PROD ? '<%= gift6Name %>' : '虎粮',
    giftNum: IS_PROD ? Number('<%= gift6Num %>') || 10 : 10,
    maxGiftNum: 9999,
    minGiftNum: 1,
    animated: 'heartBeat animated',
  },
]

export const GIFT_LIST = ORIGIN_GIFT_LIST.filter((_, i) => !giftList[i].some(val => ['0', '-1'].includes(val)))

export const VIDEO_LIST = [
  'http://zbmate.com/border/shousongbang/lshy_line1.webm',
  'http://zbmate.com/border/shousongbang/lshy_line2.webm',
  'http://zbmate.com/border/shousongbang/lshy_line3.webm',
  'http://zbmate.com/border/shousongbang/lshy_line4.webm',
  'http://zbmate.com/border/shousongbang/lshy_line5.webm',
  'http://zbmate.com/border/shousongbang/lshy_line6.webm',
]
