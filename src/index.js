import adb from 'adbkit'
import os from 'os'
import fs from 'fs'

const client = adb.createClient()

class Device {
  constructor(deviceId) {
    this.deviceId = deviceId
  }

  adbshell(cmd) {
    return new Promise((resolve, reject) => {
      client.shell(this.deviceId, cmd)
      .then(adb.util.readAll)
      .then((output) => { resolve(output.toString().trim()) })
      .catch((err) => { reject(err) })
    })
  }

  async getFocusedPackageAndActivity() {
    const reg = /[a-zA-Z0-9.]+\/.[a-zA-Z0-9.]+/
    const cmd = 'dumpsys input | grep FocusedApplication'
    const output = await this.adbshell(cmd)
    return output.match(reg)[0]
  }

  async getCurrentPackageName() {
    const pkgact = await this.getFocusedPackageAndActivity()
    return pkgact.split('/')[0]
  }

  async getCurrentActivity() {
    const pkgact = await this.getFocusedPackageAndActivity()
    return pkgact.split('/')[1]
  }

  /**
   * Dump ui xml and pull it to local temp file
   * @return Promise [resolve the target xml file]
   */
  async dumpUI() {
    const source = '/storage/sdcard0/window_dump.xml'
    const cmd = `uiautomator dump ${source}`
    const target = `${os.tmpdir()}/dumpfile.xml`
    await client.shell(this.deviceId, cmd)
    const output = await this.pullFile(source, target)
    return output
  }

  async startActivity(componet) {
    const cmd = `am start -S -W -n ${componet}`
    await client.shell(this.deviceId, cmd)
  }

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

// device.dumpUI().then((output) => console.log(output))
// device.getFocusedPackageAndActivity().then((output) => console.log(output))
// device.getCurrentActivity().then((act) => console.log(act))
// device.getCurrentPackageName().then((pkg) => console.log(pkg))
// device.startActivity('com.cvicse.zhnt/.LoadingActivity').then(() => {
//   console.log('should start the activity')
// })

