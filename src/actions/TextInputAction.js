import Action from './Action.js'
import ActionType from './ActionType.js'

class TextInputAction extends Action {
  constructor(widget) {
    super(ActionType.INPUT)
    this._widget = widget

    this._X = widget.centerX
    this._Y = widget.centerY

    this._startX = widget.startX
    this._startY = widget.startY
    this._endX = widget.endX
    this._endY = widget.endY

    this._text = 'text'
  }

  fire() {
    this._device.longClick(this.X, this.Y)
    this._device.sendText(this.text)
    this._device.hideSoftKeyBoard()
  }


  toCommand() {
    const at = `@${this.startX},${this.startY}x${this.endX},${this.endY}`
    return `${this.type} ${at} ${this.X} ${this.Y} ${this.text}`
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

  get text() {
    return this._text
  }

}


export default TextInputAction