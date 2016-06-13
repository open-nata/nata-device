import Device from '../'
import should from 'should'

describe('testing executeActions', () => {
  const deviceId = 'DU2SSE1478031311'
  const actions = ['CleanData com.cvicse.zhnt',
    'StartApp com.cvicse.zhnt/.LoadingActivity',
    'Click @0,75x1080,1776',
    'Swipe @0,75x1080,1776 LEFT',
    'Swipe @0,75x1080,1776 LEFT',
    'Swipe @0,75x1080,1776 LEFT',
    'Swipe @0,75x1080,1776 LEFT',
    'Click @856,75x1020,255',
    'TextInput @255,727x990,847 15996270647',
    'TextInput @255,892x990,1012 mcl896345253',
    'Click @90,1072x990,1207']
  let device

  before(() => {
    device = new Device(deviceId)
  })

  it('should get ui actions', function(done) {
    this.timeout(40000)
    device.executeActions(actions)
    .then(() => {
      console.log(actions)
      done()
    })
    .catch(err => {
      should.not.exist(err)
    })
  })
})


/**
 * npm run compile
 * mocha --compilers js:babel-core/register test/executeActions.test.js
 */