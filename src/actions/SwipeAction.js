import Action from './Action.js
import ActionType from './ActionType.js'
import SwipeDirection from './SwipeDirection.js'

class SwipeAction extends Action {
  constructor(device, widget, direction) {
    super(ActionType.INPUT)
    this._device = device
    this._widget = widget

    this._X = widget.centerX
    this._Y = widget.centerY

    this._startX = widget.startX
    this._startY = widget.startY
    this._endX = widget.endX
    this._endY = widget.endY

    this._direction = direction
  }

  fire() {
    switch (this.direction){
      case SwipeDirection.DOWN: this._device.swipeToDown(this.startX, this.startY, this.endX, this.endY);break
      case SwipeDirection.UP: this._device.swipeToUp(this.startX, this.startY, this.endX, this.endY);break
      case SwipeDirection.LEFT: this._device.swipeToLeft(this.startX, this.startY, this.endX, this.endY);break
      case SwipeDirection.RIGHT:this.device.swipeToRight(this.startX, this.startY, this.endX, this.endY);break
    }
  }

  toCommand() {
    const at = `@${this.startX},${this.startY}x${this.endX},${this.endY}`
    return `${this.type} ${at} ${this.direction}`
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

  get direction() {
    return this._direction
  }

}


export default SwipeAction