import Action from './Action.js'
import ActionType from './ActionType.js'

class BackAction extends Action {
  constructor(device) {
    super(ActionType.BACK)
    this._device = device
  }

  async fire() {
    await this._device.back()
  }

  toCommand() {
    return this.type
  }

  equals(otherAction) {
    if (this === otherAction) {
      return true
    }

    if (otherAction === null) {
      return false
    }

    if (!(otherAction instanceof BackAction)) {
      return false
    }

    if (this.type !== otherAction.type) {
      return false
    }
    return true
  }
}


export default BackAction