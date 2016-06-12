import Action from './Action.js'
import ActionType from './ActionType.js'

class CleanDataAction extends Action {
  constructor(device, pkg) {
    super(ActionType.CLEAN_DATA)
    this._device = device
    this._pkg = pkg
  }

  async fire() {
    await this._device.clearAppData(this.pkg)
  }

  toCommand() {
    return this.type
  }

  get pkg() {
    return this._pkg
  }
}


export default CleanDataAction