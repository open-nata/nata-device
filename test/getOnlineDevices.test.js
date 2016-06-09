import Device from '../'
import should from 'should'

describe('testing getOnlineDevices', () => {
  it('should get online devices', function(done) {
    this.timeout(5000)

    Device.getOnlineDevices()
    .then(devices => {
      devices.should.be.instanceof(Array).and.with.lengthOf(1)
      const device = devices[0]
      device.should.have.ownProperty('id')
      device.should.have.ownProperty('type')
      done()
    })
    .catch(err => {
      should.not.exist(err)
    })
  })
})


/**
 * npm run compile
 * mocha --compilers js:babel-core/register test/getOnlineDevices.test.js
 */