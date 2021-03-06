import adb from 'adbkit'
import _ from 'lodash'
import os from 'os'
import fs from 'fs'
import { exec } from 'child_process'
import AndroidKeyCode from './AndroidKeyCode.js'
import DeviceInfo from './DeviceInfo.js'
import utils from './utils.js'
import ActionFactory from './actions/ActionFactory.js'
import ActionParser from './actions/ActionParser.js'

const client = adb.createClient()

class Device {
  constructor(deviceId) {
    this.deviceId = deviceId
  }

  /**
   * get online connected devices
   * devices An array of device objects. Device { id , type : enum[emulator, device, offline]}
   * @return {Promise } devices[Device]
   */
  static async getOnlineDevices() {
    return client.listDevices()
  }

  static getTracker() {
    return client.trackDevices()
  }

  /**
   * check if device is online
   * @param deviceId device id
   * @returns {boolean} whether device is online
   */
  static async isDeviceOnline(deviceId) {
    const devices = await this.getOnlineDevices()
    const index = _.findIndex(devices, device => device.id === deviceId)
    return index !== -1
  }

  /**
   * run adb shell commmand and get the output
   * @param  {String} cmd command to run
   * @return {Promise} output
   */
  adbshell(cmd) {
    return new Promise((resolve, reject) => {
      client.shell(this.deviceId, cmd)
      .then(adb.util.readAll)
      .then((output) => { resolve(output.toString().trim()) })
      .catch((err) => { reject(err) })
    })
  }

  /**
   * run shell command and get the output
   * @param  {String} cmd to run
   * @return {Promise} stdout || stderr
   */
  static shell(cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, (err, stdout, stderr) => {
        if (err) reject(err)
        else resolve(stdout || stderr)
      })
    })
  }

  static async startServer() {
    const cmd = 'adb start-server'
    await Device.shell(cmd)
  }

  /**
   * sleep for ms time
   * @param  {Integer} ms time in ms
   * @return {Promise}
   */
  sleep(ms) {
    return new Promise((resolve) => { setTimeout(resolve, ms) })
  }

  // TODO : test
  async waitForDevice() {
    const WAIT_TIME = 10
    const cmd = 'adb wait-for-device'
    const bootcmd = 'getprop init.svc.bootanim'
    await Device.shell(cmd)
    for (let i = WAIT_TIME - 1; i >= 0; i--) {
      const out = (await this.adbshell(bootcmd)).split()[0]
      if (out === 'stopped') break
      await this.sleep(2000)
    }
  }

  /**
   * adb shell am broadcast -a edu.gatech.m3.emma.COLLECT_COVERAGE
   * adb pull /mnt/sdcard/coverage.ec $1/coverage$i.ec
   * collect Coverage through broadcast edu.gatech.m3.emma.COLLECT_COVERAGE
   * @param  {String} target path to store the coverage file
   * @return {Promise}
   */
  async collectCoverage(target) {
    const cmd = 'am broadcast -a edu.gatech.m3.emma.COLLECT_COVERAGE'
    await this.adbshell(cmd)
    await this.pullFile('/mnt/sdcard/coverage.ec', target)
  }

  /**
   * get device info including name,id,version,sdk,cpu,manufactur and resolution
   * @returns {Promise}
   */
  getDeviceInfo() {
    return new Promise((resolve, reject) => {
      Promise.all([client.getProperties(this.deviceId), this.getScreenResolution()])
      .then((values) => {
        const info = new DeviceInfo()
        const properties = values[0]
        info.name = properties['ro.product.model']
        info.id = properties['ro.boot.serialno']
        info.version = properties['ro.build.version.release']
        info.sdk = parseInt(properties['ro.build.version.sdk'].trim(), 10)
        info.cpu = properties['ro.product.cpu.abi']
        info.manufacturer = properties['ro.product.manufacturer']
        info.resolution = values[1]
        resolve(info)
      })
      .catch(err => reject(err))
    })
  }

  // TODO : test
  getModel() {
    return this.adbshell('getprop ro.product.model')
  }
  // TODO : test
  getCpuABI() {
    return this.adbshell('getprop ro.product.cpu.abi')
  }
  // TODO : test
  getAndroidVersion() {
    return this.adbshell('getprop ro.build.version.release')
  }
  // TODO : test
  getDeviceId() {
    return this.adbshell('getprop ro.boot.serialno')
  }
  // TODO : test
  getManufacturer() {
    return this.adbshell('getprop ro.product.manufacturer')
  }
  // TODO : test
  async getSdkVersion() {
    const sdkVersion = await this.adbshell('getprop ro.build.version.sdk')
    return parseInt(sdkVersion.trim(), 10)
  }
  // TODO : test
  async getScreenResolution() {
    const regexp = /[0-9]+/gi
    const cmd = `adb -s ${this.deviceId} shell dumpsys display | grep PhysicalDisplayInfo`
    const output = await Device.shell(cmd)
    const array = output.match(regexp)

    return `${array[0]}x${array[1]}`
  }

  /**
   * pm grant <PACKAGE_NAME> <PERMISSION>
   */
  // async grantPermission(pkg, permission) {
  //   const cmd = `pm grant ${pkg} ${permission}`
  //   await this.adbshell(cmd)
  // }


  /**
   * am start -a android.intent.action.INSERT -t vnd.android.cursor.dir/contact
   * -e name 'Donald Duck' -e phone 555-1234
   */
  async addContact(contactData) {
    const cmd = `am start -a android.intent.action.INSERT 
    -t vnd.android.cursor.dir/contact ${contactData}`
    await this.adbshell(cmd)
    await this.sleep(2000)
    await this.back()
    await this.sleep(2000)
    await this.back()
  }


  // async addContactFromCSV(csvpath) {
  //   const cmd = `am start -t "text/csv" -d ${csvpath}
  //   -a android.intent.action.VIEW com.android.contacts`
  //   await this.adbshell(cmd)
  // }

  /**
   * get [adbkit-logcat](https://www.npmjs.com/package/adbkit-logcat) client
   * @return {client}
   */
  logcat() {
    return client.openLogcat(this.deviceId, { clear: true })
  }

  /**
   * clear app data of pkg
   * @param  {String} pkg  pkg to be cleared
   * @return {Boolean} wheather success to delete
   */
  async clearAppData(pkg) {
    const cmd = `pm clear ${pkg}`
    const output = await this.adbshell(cmd)
    return output === 'Success'
  }

  /**
   * install apk
   * @param  {String} apk path
   * @return {Promise}
   */
  install(apk) {
    return client.install(this.deviceId, apk)
  }

  /**
   * Static
   * get permissions of apk, make sure you can call aapt from command line
   * @param  {String} apk path
   * @return {Promise} permissions [String]
   */
  async getPermissionsFromApk(apk) {
    const cmd = `aapt d permissions ${apk}`
    const output = await Device.shell(cmd)
    return _.chain(output)
           .split('\n')
           .filter(line => line.startsWith('uses-permission'))
           .map(line => line.split(' ')[1].slice(6, -1))
           .value()
  }

  /**
   * getPermissions pkg
   * @param  {String} pkg package of the app
   * @return {Promise} permissions [String]
   */
  async getPermissions(pkg) {
    const codePath = (await this.adbshell(`dumpsys package ${pkg} | grep codePath`)).trim().slice(9)
    const apkPath = await this.pullFile(codePath, `${os.tmpdir()}/app.apk`)
    return await this.getPermissionsFromApk(apkPath)
  }

  /**
   * adb shell dumpsys package com.cvicse.zhnt | grep android.permission
   * get granted permissions
   * @param  {String} pkg package of the app
   * @return {Promise} permissions [String] granted permissions
   */
  async getGrantedPermissions(pkg) {
    const output = await this.adbshell(`dumpsys package ${pkg} | grep android.permission`)
    return _.chain(output)
            .split('\n')
            .map(line => line.trim())
            .value()
  }

  /**
   * get not granted permissions
   * @param  {String} pkg package of the app
   * @return {Promise} notGrantedPermissions [String] not granted permissions
   */
  async getNotGrantedPermissions(pkg) {
    const grantedPermissions = await this.getGrantedPermissions(pkg)
    const permissions = await this.getPermissions(pkg)
    return _.chain(permissions)
            .difference(grantedPermissions)
            .uniq()
            .value()
  }

  /**
   * click (x,y)
   * @param  {String} x - coordinate x
   * @param  {String} y - coordinate y
   * @return {Promise}
   */
  async click(x, y) {
    const cmd = `input tap ${x} ${y}`
    await this.adbshell(cmd)
  }

  /**
   * send key event from https://developer.android.com/reference/android/view/KeyEvent.html
   * @param  {Integer} keycode keycode from Android
   * @return {Promise}
   */
  async sendKeyEvent(keycode) {
    const cmd = `input keyevent ${keycode}`
    await this.adbshell(cmd)
  }

  /**
   * press back key of the device
   * @return {Promise}
   */
  back() {
    return this.sendKeyEvent(AndroidKeyCode.BACK)
  }

  /**
   * press home key of the device
   * @return {Promise}
   */
  home() {
    return this.sendKeyEvent(AndroidKeyCode.HOME)
  }

  /**
   * press menu key of the device
   * @return {Promise}
   */
  menu() {
    return this.sendKeyEvent(AndroidKeyCode.MENU)
  }

  /**
   * long click (x,y)
   * @param x
   * @param y
   * @returns {Promise}
   */
  longClick(x, y) {
    return this.swipe(x, y, x, y, 1500)
  }

  async sendText(text) {
    await this.adbshell(`input text ${text}`)
  }

  hideSoftKeyBoard() {
    return this.sendKeyEvent(AndroidKeyCode.HIDE_KEYBOARD)
  }

  async swipe(startX, startY, endX, endY, ms) {
    const sdkVersion = await this.getSdkVersion()
    if (sdkVersion < 19) {
      await this.adbshell(`input swipe ${startX} ${startY} ${endX} ${endY}`)
    } else {
      await this.adbshell(`input swipe ${startX} ${startY} ${endX} ${endY} ${ms}`)
    }
  }


  /**
   * 左滑控件
   */
  async swipeToLeft(X1, Y1, X2, Y2) {
    const startX = X1 + 0.8 * (X2 - X1)
    const startY = Y1 + 0.5 * (Y2 - Y1)
    const endX = X1 + 0.2 * (X2 - X1)
    const endY = Y1 + 0.5 * (Y2 - Y1)
    await this.swipe(startX, startY, endX, endY, 100)
  }

  /**
   * 右滑控件
   */
  async swipeToRight(X1, Y1, X2, Y2) {
    const startX = X1 + 0.2 * (X2 - X1)
    const startY = Y1 + 0.5 * (Y2 - Y1)
    const endX = X1 + 0.8 * (X2 - X1)
    const endY = Y1 + 0.5 * (Y2 - Y1)
    await this.swipe(startX, startY, endX, endY, 100)
  }

  /**
   * 上滑控件
   */
  async swipeToUp(X1, Y1, X2, Y2) {
    const startX = X1 + 0.5 * (X2 - X1)
    const startY = Y1 + 0.7 * (Y2 - Y1)
    const endX = X1 + 0.5 * (X2 - X1)
    const endY = Y1 + 0.3 * (Y2 - Y1)
    await this.swipe(startX, startY, endX, endY, 100)
  }

  /**
   * 下滑控件
   */
  async swipeToDown(X1, Y1, X2, Y2) {
    const startX = X1 + 0.5 * (X2 - X1)
    const startY = Y1 + 0.3 * (Y2 - Y1)
    const endX = X1 + 0.5 * (X2 - X1)
    const endY = Y1 + 0.7 * (Y2 - Y1)
    await this.swipe(startX, startY, endX, endY, 100)
  }
  /**
   * get current focused package and activity
   * @return {Promise}
   */
  async getFocusedPackageAndActivity() {
    const reg = /[a-zA-Z0-9.]+\/.[a-zA-Z0-9.]+/
    const cmd = 'dumpsys input | grep FocusedApplication'
    const output = await this.adbshell(cmd)
    return output.match(reg)[0]
  }

  /**
   * get current package name
   * @return {Promise}
   */
  async getCurrentPackageName() {
    const pkgact = await this.getFocusedPackageAndActivity()
    return pkgact.split('/')[0]
  }

  /**
   * get current activity
   * @return {Promise}
   */
  async getCurrentActivity() {
    const pkgact = await this.getFocusedPackageAndActivity()
    return pkgact.split('/')[1]
  }

  /**
   * Dump ui xml and pull it to local temp file
   * @return {Promise} resolve the target xml file
   */
  async dumpUI(target) {
    if (!target) {
      const resultDir = `${os.tmpdir()}/${this.deviceId}`
      if (!fs.existsSync(resultDir)) {
        fs.mkdirSync(resultDir)
      }
      target = `${resultDir}/dumpfile.xml`
    }
    const source = '/storage/sdcard0/window_dump.xml'
    const cmd = `uiautomator dump ${source}`
    // const target = `${os.tmpdir()}/dumpfile.xml`
    await this.adbshell(cmd)
    return await this.pullFile(source, target)
  }

  async getUIActions() {
    const xmlFile = await this.dumpUI()
    const widgets = await utils.getWidgetsFromXml(xmlFile)
    return ActionFactory.getActionsFromWidgets(this, widgets)
  }

  async getUIWidgets() {
    const xmlFile = await this.dumpUI()
    return await utils.getWidgetsFromXml(xmlFile)
  }

  async getUIActionCommands() {
    let actions = await this.getUIActions()
    actions = _.map(actions, (action) => {
      return action.toCommand()
    })
    return actions
  }

  async getAvaliableActions() {
    const uiActions = await this.getUIActions()
    const commonActions = ActionFactory.getCommonActions(this)
    return _.concat(uiActions, commonActions)
  }

  async getAvaliableActionsCommands() {
    let actions = await this.getAvaliableActions()
    actions = _.map(actions, (action) => {
      return action.toCommand()
    })
    return actions
  }

  getStartAppAction(pkgAct) {
    return ActionFactory.createStartAppAction(this, pkgAct)
  }

  getCleanAppAction(pkg) {
    return ActionFactory.createCleanAppAction(this, pkg)
  }

  getBackAction() {
    return ActionFactory.createBackAction(this)
  }

  getMenuAction() {
    return ActionFactory.createMenuAction(this)
  }

  getHomeAction() {
    return ActionFactory.createHomeAction(this)
  }

  async executeAction(action) {
    await ActionParser.parse(this, action).fire()
  }

  async executeActions(actions) {
    for (let i = 0; i < actions.length; i++) {
      await this.executeAction(actions[i])
      await this.sleep(1000)
    }
  }

  /**
   * start activity
   * @param  {String} component pkg/act
   * @return {Promise}
   */
  async startActivity(component) {
    const cmd = `am start -S -W -n ${component}`
    // return client.startActivity(this.deviceId, { component, wait: true })
    await this.adbshell(cmd)
  }

  /**
   * pull file from device to local file system
   * @param  {String} source src file path of the device
   * @param  {String} target target file path of the local file system
   * @return {Promise} target file path
   */
  pullFile(source, target) {
    return new Promise((resolve, reject) => {
      client.pull(this.deviceId, source)
      .then((transfer) => {
        transfer.on('end', () => resolve(target))
        transfer.on('error', reject)
        transfer.pipe(fs.createWriteStream(target))
      })
      .catch(err => reject(err))
    })
  }
}

export default Device

