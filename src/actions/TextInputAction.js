import Action from './Action.js'
import ActionType from './ActionType.js'

class TextInputAction extends Action {
  constructor(device, widget, text) {
    super(ActionType.INPUT)
    this._device = device
    this._widget = widget

    this._startX = widget.startX || 0
    this._startY = widget.startY || 0
    this._endX = widget.endX || 0
    this._endY = widget.endY || 0

    this._text = text || 'text'
  }

  async fire() {
    const X = this._startX + 1
    const Y = this._startY + 1
    await this._device.longClick(X, Y)
    await this._device.sendText(this.text)
    await this._device.hideSoftKeyBoard()
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
    return this._endY
  }

  get widget() {
    return this._widget
  }

  get text() {
    return this._text
  }

  equals(otherAction) {
    if (this === otherAction) {
      return true
    }

    if (otherAction === null) {
      return false
    }

    if (!(otherAction instanceof TextInputAction)) {
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


export default TextInputAction