import Device from '../'
import should from 'should'

describe('testing common actions', () => {
  const deviceId = 'DU2SSE1478031311'
  let device

  before(() => {
    device = new Device(deviceId)
  })

  it('the device should be online', async function(done) {
    this.timeout(2000)
    const isOnline = await Device.isDeviceOnline(deviceId)
    isOnline.should.be.true()
    done()
  })

  it('should press back key', async function (done) {
    await device.back()
    done()
  })

  it('should press home key', async function(done) {
    await device.home()
    done()
  })

  it('should press menu key', async function(done) {
    await device.menu()
    done()
  })
})


/**
 * npm run compile
 * mocha --compilers js:babel-core/register test/commons.test.js
 */