import Device from '../../'
import should from 'should'
import ActionParser from '../../lib/actions/ActionParser'

describe('testing ActionParser', () => {
  const deviceId = 'DU2SSE1478031311'
  const actionStrings = ['Click @0,75x164,0',
    'Click @856,75x1020,856',
    'Swipe @0,255x1080,0 RIGHT',
    'Swipe @0,255x1080,0 LEFT',
    'Click @30,270x420,30',
    'Click @500,255x990,500',
    'Click @990,270x1050,990',
    'LongClick @0,795x1080,0',
    'Click @56,795x298,56',
    'LongClick @56,795x298,56',
    'Click @298,795x540,298',
    'LongClick @298,795x540,298',
    'Click @540,795x782,540',
    'LongClick @540,795x782,540',
    'Click @782,795x1024,782',
    'LongClick @782,795x1024,782',
    'Click @56,1029x298,56',
    'LongClick @56,1029x298,56',
    'Click @298,1029x540,298',
    'LongClick @298,1029x540,298',
    'Click @540,1029x782,540',
    'LongClick @540,1029x782,540',
    'Click @782,1029x1024,782',
    'LongClick @782,1029x1024,782',
    'Click @56,1263x298,56',
    'LongClick @56,1263x298,56',
    'Click @298,1263x540,298',
    'LongClick @298,1263x540,298',
    'Click @540,1263x782,540',
    'LongClick @540,1263x782,540']

  let device

  before(() => {
    device = new Device(deviceId)
  })

  it('should get ui action commands', function (done) {
    this.timeout(20000)
    const actions = ActionParser.parseAll(device, actionStrings)
    console.log(actions)
    done()
  })
})


/**
 * npm run compile
 * mocha --compilers js:babel-core/register test/actions/ActionParser.test.js
 */