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
    return `${this.type} ${this.pkg}`
  }

  get pkg() {
    return this._pkg
  }

  equals(otherAction) {
    if (this === otherAction) {
      return true
    }

    if (otherAction === null) {
      return false
    }

    if (!(otherAction instanceof CleanDataAction)) {
      return false
    }

    if (this.type !== otherAction.type) {
      return false
    }
    if (this.pkg !== otherAction.pkg) {
      return false
    }

    return true
  }
}


export default CleanDataAction