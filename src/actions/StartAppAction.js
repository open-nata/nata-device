import Action from './Action.js'
import ActionType from './ActionType.js'

class StartAppAction extends Action {
  constructor(device, pkgAct) {
    super(ActionType.START_APP)
    this._device = device
    this._pkgAct = pkgAct
  }

  async fire() {
    await this._device.startActivity(this.pkgAct)
  }

  get pkgAct() {
    return this._pkgAct
  }

  toCommand() {
    return `${this.type} ${this.pkgAct}`
  }
}


export default StartAppAction