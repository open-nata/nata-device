import Device from '../'
import should from 'should'

describe('testing getTracker', () => {
  it('should get tracker', function(done) {
    this.timeout(20000)

    Device.getTracker()
    .then(tracker => {
      tracker.on('add', (device) => {
        console.log('Device %s was plugged in', device.id)
      })
      tracker.on('remove', (device) => {
        console.log('Device %s was unplugged', device.id)
        done()
      })
      tracker.on('end', () => {
        console.log('Tracking stopped')
      })
    })
    .catch(err => {
      should.not.exist(err)
    })
  })
})


/**
 * npm run compile
 * mocha --compilers js:babel-core/register test/getTracker.test.js
 */