import Action from './Action.js'
import ActionType from './ActionType.js'
import SwipeDirection from './SwipeDirection.js'

class SwipeAction extends Action {
  constructor(device, widget, direction) {
    super(ActionType.SWIPE)
    this._device = device

    this._startX = widget.startX || 0
    this._startY = widget.startY || 0
    this._endX = widget.endX || 0
    this._endY = widget.endY || 0

    this._direction = direction
  }

  async fire() {
    switch (this.direction) {
      case SwipeDirection.DOWN:
        await this._device.swipeToDown(this.startX, this.startY, this.endX, this.endY)
        break
      case SwipeDirection.UP:
        await this._device.swipeToUp(this.startX, this.startY, this.endX, this.endY)
        break
      case SwipeDirection.LEFT:
        await this._device.swipeToLeft(this.startX, this.startY, this.endX, this.endY)
        break
      case SwipeDirection.RIGHT:
        await this._device.swipeToRight(this.startX, this.startY, this.endX, this.endY)
        break
      default:
    }
  }

  toCommand() {
    const at = `@${this.startX},${this.startY}x${this.endX},${this.endY}`
    return `${this.type} ${at} ${this.direction}`
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