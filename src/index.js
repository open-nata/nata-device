import adb from 'adbkit'
import os from 'os'
import fs from 'fs'

const client = adb.createClient()

class Device {
  constructor(deviceId) {
    this.deviceId = deviceId
  }

  sleep(ms) {
    return new Promise((resolve) => { setTimeout(resolve, ms) })
  }

  /**
   * run adb shell commmand and get the output
   * @param  {String} cmd command to run
   * @return {String} the output
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
   * clear app data of pkg
   * @param  {String} pkg - pkg to be cleared
   * @return {Boolean}     wheather success to delete
   */
  async clearAppData(pkg) {
    const cmd = `pm clear ${pkg}`
    const output = await this.adbshell(cmd)
    return output === 'Success'
  }


  /**
   * click (x,y)
   * @param  {String} x - coordinate x
   * @param  {String} y - coordinate y
   * @return {null}
   */
  async click(x, y) {
    const cmd = `input tap ${x} ${y}`
    await this.adbshell(cmd)
  }

  /**
   * get current focused package and activity
   * @return {String}
   */
  async getFocusedPackageAndActivity() {
    const reg = /[a-zA-Z0-9.]+\/.[a-zA-Z0-9.]+/
    const cmd = 'dumpsys input | grep FocusedApplication'
    const output = await this.adbshell(cmd)
    return output.match(reg)[0]
  }

  /**
   * get current package name
   * @return {String}
   */
  async getCurrentPackageName() {
    const pkgact = await this.getFocusedPackageAndActivity()
    return pkgact.split('/')[0]
  }

  /**
   * get current activity
   * @return {String}
   */
  async getCurrentActivity() {
    const pkgact = await this.getFocusedPackageAndActivity()
    return pkgact.split('/')[1]
  }

  /**
   * Dump ui xml and pull it to local temp file
   * @return {Promise} resolve the target xml file
   */
  async dumpUI() {
    const source = '/storage/sdcard0/window_dump.xml'
    const cmd = `uiautomator dump ${source}`
    const target = `${os.tmpdir()}/dumpfile.xml`
    await this.adbshell(cmd)
    const output = await this.pullFile(source, target)
    return output
  }

  /**
   * start activity
   * @param  {String} componet pkg/act
   * @return {null}
   */
  startActivity(component) {
    // const cmd = `am start -S -W -n ${componet}`
    return client.startActivity(this.deviceId, { component, wait: true })
  }

  /**
   * pull file from device to local file system
   * @param  {String} source src file path of the device
   * @param  {String} target target file path of the local file system
   * @return {String} target file path
   */
  pullFile(source, target) {
    return new Promise((resolve, reject) => {
      client.pull(this.deviceId, source)
      .then((transfer) => {
        transfer.on('end', () => resolve(target))
        transfer.on('error', reject)
        transfer.pipe(fs.createWriteStream(target))
      })
    })
  }
}

export default Device

/**
 * tests
 */

// const deviceId = 'DU2SSE1478031311'
// const device = new Device(deviceId)

// // device.dumpUI().then((output) => console.log(output))
// // device.getFocusedPackageAndActivity().then((output) => console.log(output))
// // device.getCurrentActivity().then((act) => console.log(act))
// // device.getCurrentPackageName().then((pkg) => console.log(pkg))
// device.startActivity('com.cvicse.zhnt/.LoadingActivity').then(() => {
//   console.log('should start the activity')
// })

