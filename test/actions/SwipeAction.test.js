import Device from '../../'
import should from 'should'
import ActionParser from '../../lib/actions/ActionParser'

describe('testing SwipeAction', () => {
  const deviceId = 'DU2SSE1478031311'
  const actionString = 'Swipe @0,255x1080,705 LEFT'

  let device

  before(async function() {
    this.timeout(20000)
    await Device.startServer()
    device = new Device(deviceId)
  })

  it('should get swipe action', async function (done) {
    this.timeout(20000)
    const action = ActionParser.parse(device, actionString)
    console.log(action)
    await action.fire()
    done()
  })
})


/**
 * npm run compile
 * mocha --compilers js:babel-core/register test/actions/SwipeAction.test.js
 */