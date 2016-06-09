import Device from '../'
import assert from 'assert'
import path from 'path'
import fs from 'fs'

describe('testing device api', () => {
  const deviceId = 'DU2SSE1478031311'
  const target = path.join(__dirname, './temp/coverage.ec')
  let device

  before(() => {
    device = new Device(deviceId)
  })

  it('should collect coverage', async function(done) {
    this.timeout(20000)
    await device.collectCoverage(target)
    assert.equal(fs.existsSync(target), true)
    fs.unlinkSync(target)
    done()
  })
})


/**
 * npm run compile
 * mocha --compilers js:babel-core/register test/collectCoverage.test.js
 */