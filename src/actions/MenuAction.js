import Action from './Action.js'
import ActionType from './ActionType.js'

class MenuAction extends Action {
  constructor(device) {
    super(ActionType.MENU)
    this._device = device
  }

  async fire() {
    await this._device.menu()
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

    if (!(otherAction instanceof MenuAction)) {
      return false
    }

    if (this.type !== otherAction.type) {
      return false
    }
    return true
  }
}


export default MenuAction