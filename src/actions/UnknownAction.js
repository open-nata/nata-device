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
}


export default UnknownAction