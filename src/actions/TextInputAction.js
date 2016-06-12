import Action from './Action.js'
import ActionType from './ActionType.js'

class TextInputAction extends Action {
  constructor(device, widget, text) {
    super(ActionType.INPUT)
    this._device = device

    this._startX = widget.startX || 0
    this._startY = widget.startY || 0
    this._endX = widget.endX || 0
    this._endY = widget.endY || 0

    this._text = text || 'text'
  }

  fire() {
    const X = this._startX + 1
    const Y = this._startY + 1
    this._device.longClick(X, Y)
    this._device.sendText(this.text)
    this._device.hideSoftKeyBoard()
  }


  toCommand() {
    const at = `@${this.startX},${this.startY}x${this.endX},${this.endY}`
    return `${this.type} ${at} ${this.text}`
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

  get text() {
    return this._text
  }

}


export default TextInputAction