import Action from './Action.js'
import ActionType from './ActionType.js'

class LongClickAction extends Action {
  constructor(device, widget) {
    super(ActionType.LONG_CLICK)
    this._device = device
    this._widget = widget

    this._X = widget.centerX
    this._Y = widget.centerY

    this._startX = widget.startX
    this._startY = widget.startY
    this._endX = widget.endX
    this._endY = widget.endY
  }

  fire() {
    this._device.longClick(this.X, this.Y)
  }

  toCommand() {
    const at = `@${this.startX},${this.startY}x${this.endX},${this.endY}`
    return `${this.type} ${at} ${this.X} ${this.Y}`
  }

  get X() {
    return this._X
  }

  get Y() {
    return this._Y
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