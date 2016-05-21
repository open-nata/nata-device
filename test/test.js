import Device from '../'
import assert from 'assert'

describe('testing device api', () => {
  const deviceId = 'DU2SSE1478031311'
  let device

  before(() => {
    device = new Device(deviceId)
  })

  it('should startActivity ', async done => {
    const pkg = 'com.cvicse.zhnt'
    const act = '.LoadingActivity'

    const componet = `${pkg}/${act}`
    console.log(componet)

    await device.startActivity(componet)
    const output = await device.getCurrentPackageName(deviceId)
    assert.equal(output, pkg)
    done()
  })
})