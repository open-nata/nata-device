import Action from './Action.js'
import ActionType from './ActionType.js'

class ClickAction extends Action {
  constructor(device, widget) {
    super(ActionType.CLICK)
    this._device = device

    this._startX = widget.startX || 0
    this._startY = widget.startY || 0
    this._endX = widget.endX || 0
    this._endY = widget.endY || 0
  }

  async fire() {
    const X = this._startX + 1
    const Y = this._startY + 1
    await this._device.click(X, Y)
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

}


export default ClickAction