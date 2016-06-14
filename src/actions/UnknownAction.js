import Action from './Action.js'
import ActionType from './ActionType.js'

class UnknownAction extends Action {
  constructor(device) {
    super(ActionType.UNKNOWN)
    this._device = device
  }

  /**
   * do nothing but slepp for 1s
   */
  async fire() {
    await this._device.sleep(1000)
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

    if (!(otherAction instanceof UnknownAction)) {
      return false
    }

    if (this.type !== otherAction.type) {
      return false
    }
    return true
  }
}


export default UnknownAction