import Device from '../'
import should from 'should'

describe('testing getUIActions', () => {
  const deviceId = 'DU2SSE1478031311'
  let device

  before(() => {
    device = new Device(deviceId)
  })

  it('should get ui actions', function(done) {
    this.timeout(20000)
    device.getUIActions()
    .then(actions => {
      actions.should.be.instanceOf(Array)
      actions.length.should.not.be.equal(0)
      done()
    })
    .catch(err => {
      should.not.exist(err)
    })
  })
})


/**
 * npm run compile
 * mocha --compilers js:babel-core/register test/getUIActions.test.js
 */