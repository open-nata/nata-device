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

  equals(otherAction) {
    if (this === otherAction) {
      return true
    }

    if (otherAction === null) {
      return false
    }

    if (!(otherAction instanceof StartAppAction)) {
      return false
    }

    if (this.type !== otherAction.type) {
      return false
    }

    if (this.pkgAct !== otherAction.pkgAct) {
      return false
    }

    return true
  }
}


export default StartAppAction