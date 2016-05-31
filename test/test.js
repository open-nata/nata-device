import Device from '../'
import assert from 'assert'
import path from 'path'

describe('testing device api', () => {
  const deviceId = 'DU2SSE1478031311'
  const apkPath = path.join(__dirname, '../assets/cxnt.apk')
  let device

  before(() => {
    device = new Device(deviceId)
  })

  // beforeEach(() => {
  //   device.sleep(2000)
  // })

  it('should install apk', async function(done) {
    this.timeout(40000)
    await device.install(apkPath)
    done()
  })

  it('should dump ui', async done => {
    const target = await device.dumpUI()
    console.log(target)
    done()
  })

  it('should get focused pkgact', async done => {
    const pkgact = await device.getFocusedPackageAndActivity()
    console.log(pkgact)
    done()
  })

  it('should clear App Data', async done => {
    const pkg = 'com.cvicse.zhnt'
    await device.clearAppData(pkg)
    done()
  })

  it('should startActivity', async function(done) {
    const pkg = 'com.cvicse.zhnt'
    const act = '.LoadingActivity'
    const componet = `${pkg}/${act}`

    await device.startActivity(componet)
    const output = await device.getCurrentPackageName()
    assert.equal(output, pkg)
    done()
  })

  it('should click (x,y)', async done => {
    const x = 100
    const y = 100
    await device.click(x, y)
    done()
  })

  it('should back', async done => {
    await device.back()
    done()
  })

  it('should return all the connnected devices id', async done => {
    const ids = await device.getOnlineDeviceIds()
    console.log(ids)
    done()
  })

  it('shoudl get all permissions', async done => {
    const permissions = await Device.getPermissions(apkPath)
    assert.notEqual(permissions.length, 0)
    done()
  })

  
})