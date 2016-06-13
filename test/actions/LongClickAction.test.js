import Device from '../../'
import should from 'should'
import ActionParser from '../../lib/actions/ActionParser'

describe('testing LongClickAction', () => {
  const deviceId = 'DU2SSE1478031311'
  const actionString = 'LongClick @782,795x1024,782'

  let device

  before(() => {
    device = new Device(deviceId)
  })

  it('should get long click action', async function (done) {
    this.timeout(20000)
    const action = ActionParser.parse(device, actionString)
    console.log(action)
    await action.fire()
    done()
  })
})


/**
 * npm run compile
 * mocha --compilers js:babel-core/register test/actions/LongClickAction.test.js
 */