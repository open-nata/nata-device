import Action from './Action.js'
import ActionType from './ActionType.js'

class LongClickAction extends Action {
  constructor(device, widget) {
    super(ActionType.LONG_CLICK)
    this._device = device

    this._startX = widget.startX || 0
    this._startY = widget.startY || 0
    this._endX = widget.endX || 0
    this._endY = widget.endY || 0
  }

  async fire() {
    const X = this._startX + 1
    const Y = this._startY + 1
    await this._device.longClick(X, Y)
  }

  toCommand() {
    const at = `@${this.startX},${this.startY}x${this.endX},${this.endY}`
    return `${this.type} ${at}`
  }

  get startX() {
    return this._startX
  }

  get endX() {
    return this._endX
  }

  get startY() {
    return this._startY
  }

  get endY() {
    return this._startX
  }

}

export default LongClickAction