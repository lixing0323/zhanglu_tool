import { getWindowInfo } from './get-window-info'
import deviceId from './uuid.js'
import { getBrowserInfo } from './get-browser-info'
import { sortObject } from './utils'
import settings from '@/settings'

let browserInfo = {}
let _initBrowserInfo = true

function initBrowserInfo() {
  if (!_initBrowserInfo) return
  browserInfo = getBrowserInfo()
}

export function getDeviceInfo() {
  initBrowserInfo()
  const {
    deviceBrand,
    deviceModel,
    brand,
    model,
    platform,
    system,
    deviceOrientation,
    deviceType
  } = browserInfo

  return {
    brand,
    deviceBrand,
    deviceModel,
    devicePixelRatio: window.devicePixelRatio,
    deviceId: deviceId(),
    deviceOrientation,
    deviceType,
    model,
    platform,
    system
  }
}

export function getAppBaseInfo() {
  initBrowserInfo()
  const { theme, language, browserName, browserVersion } = browserInfo
  const appLanguage = 'zh-Hans'
  return {
    appId: settings.appId,
    appName: '',
    appVersion: '',
    appVersionCode: '',
    appLanguage,
    enableDebug: false,
    hostSDKVersion: undefined,
    hostPackageName: undefined,
    hostFontSizeSetting: undefined,
    hostName: browserName,
    hostVersion: browserVersion,
    hostTheme: theme,
    hostLanguage: language,
    language,
    SDKVersion: '',
    theme,
    version: ''
  }
}

/**
 * 获取系统信息-同步
 */
export function getSystemInfoSync() {
  _initBrowserInfo = true
  initBrowserInfo()
  _initBrowserInfo = false
  const windowInfo = getWindowInfo()
  const deviceInfo = getDeviceInfo()
  const appBaseInfo = getAppBaseInfo()
  _initBrowserInfo = true

  const { ua, browserName, browserVersion, osname, osversion } = browserInfo

  const systemInfo = Object.assign(
    {},
    windowInfo,
    deviceInfo,
    appBaseInfo,
    {
      browserName,
      browserVersion,
      fontSizeSetting: appBaseInfo.hostFontSizeSetting,
      osName: osname.toLocaleLowerCase(),
      osVersion: osversion,
      osLanguage: undefined,
      osTheme: undefined,
      uniPlatform: 'web',
      uniCompileVersion: '',
      uniRuntimeVersion: '',
      ua
    }
  )

  delete systemInfo.screenTop
  delete systemInfo.enableDebug

  return sortObject(systemInfo)
}
/**
 * 获取系统信息-异步
 */
export function getSystemInfo() {
  return getSystemInfoSync()
}