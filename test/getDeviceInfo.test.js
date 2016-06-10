import Device from '../'
import should from 'should'

describe('testing getDeviceInfo', () => {
  const deviceId = 'DU2SSE1478031311'
  let device

  before(() => {
    device = new Device(deviceId)
  })

  it('should get device info', function(done) {
    this.timeout(5000)
    device.getDeviceInfo()
    .then(info => {
      console.log(info)
      info.should.be.instanceof(Object)
      info.should.have.property('name', 'H60-L01')
      info.should.have.property('id', 'DU2SSE1478031311')
      info.should.have.property('version', '4.4.2')
      info.should.have.property('sdk', 19)
      info.should.have.property('resolution', '1080x1920')
      info.should.have.property('cpu', 'armeabi-v7a')
      info.should.have.property('manufacturer', 'HUAWEI')
      done()
    })
    .catch(err => {
      should.not.exist(err)
    })
  })
})


/**
 * npm run compile
 * mocha --compilers js:babel-core/register test/getDeviceInfo.test.js
 */