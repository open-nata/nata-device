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
}


export default BackAction