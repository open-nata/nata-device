import Action from './Action.js'
import ActionType from './ActionType.js'

class LongClickAction extends Action {
  constructor(device, widget) {
    super(ActionType.LONG_CLICK)
    this._device = device
    this._widget = widget

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
    return this._endY
  }

  get widget() {
    return this._widget
  }

  equals(otherAction) {
    if (this === otherAction) {
      return true
    }

    if (otherAction === null) {
      return false
    }

    if (!(otherAction instanceof LongClickAction)) {
      return false
    }

    if (this.type !== otherAction.type) {
      return false
    }

    if (!this.widget.equals(otherAction.widget)) {
      return false
    }

    return true
  }

}

export default LongClickAction