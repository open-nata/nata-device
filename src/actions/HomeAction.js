import Action from './Action.js'
import ActionType from './ActionType.js'

class HomeAction extends Action {
  constructor(device) {
    super(ActionType.HOME)
    this._device = device
  }

  async fire() {
    await this._device.home()
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

    if (!(otherAction instanceof HomeAction)) {
      return false
    }

    if (this.type !== otherAction.type) {
      return false
    }
    return true
  }
}

export default HomeAction