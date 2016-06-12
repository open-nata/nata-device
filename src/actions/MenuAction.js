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
}


export default MenuAction