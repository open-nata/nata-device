import Action from './Action.js'

class StartAppAction extends Action {
  constructor(device, pkgAct) {
    super('startapp')
    this.device = device
    this.pkgAct = pkgAct
  }

  async fire() {
    await this.device.startActivity(this.pkgAct)
    await this.device.sleep(2000)
  }
}


export default StartAppAction