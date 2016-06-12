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
}

export default HomeAction