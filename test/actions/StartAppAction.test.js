import Device from '../../'
import should from 'should'
import ActionParser from '../../lib/actions/ActionParser'

describe('testing StartAppAction', () => {
  const deviceId = 'DU2SSE1478031311'
  const pkgAct = 'com.cvicse.zhnt/.LoadingActivity'
  let actionString = ''
  let device

  before(async function() {
    this.timeout(20000)
    await Device.startServer()
    device = new Device(deviceId)
    const startAppAction = device.getStartAppAction(pkgAct)
    actionString = startAppAction.toCommand()
  })

  it('should start app cxnt', async function (done) {
    this.timeout(20000)
    const action = ActionParser.parse(device, actionString)
    console.log(action)
    await action.fire()
    done()
  })
})


/**
 * npm run compile
 * mocha --compilers js:babel-core/register test/actions/StartAppAction.test.js
 */