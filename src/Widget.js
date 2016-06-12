/**
 * Widget class
 */
class Widget {
  constructor() {
    this._text = ''
    this._resourceId = ''
    this._className = ''
    this._contentDesc = ''
    this._checkable = ''
    this._checked = ''
    this._clickable = ''
    this._bounds = ''
    this._packageName = ''
    this._enabled = ''
    this._focusable = ''
    this._focused = ''
    this._scrollable = ''
    this._long_clickable = ''
    this._password = ''
    this._selected = ''

    this._startX = 0
    this._startY = 0
    this._endX = 0
    this._endY = 0
  }

  set text(text) {
    this._text = text
  }

  get text() {
    return this._text
  }

  get startX() {
    return this._startX
  }

  get startY() {
    return this._startY
  }

  get endX() {
    return this._endX
  }

  get endY() {
    return this._endY
  }

  get x() {
    return this._startX + 1
  }

  get y() {
    return this._startY + 1
  }

  get centerX() {
    return (this._endX - this._startX) / 2 + this._startX
  }

  get centerY() {
    return (this._endY - this._startY) / 2 + this._startY
  }

  get focused() {
    return this._focused
  }

  set focused(focused) {
    this._focused = focused
  }

  get scrollable() {
    return this._scrollable
  }

  set scrollable(scrollable) {
    this._scrollable = scrollable
  }

  get longClickable() {
    return this._long_clickable
  }

  set longClickable(longClickable) {
    this._long_clickable = longClickable
  }

  get password() {
    return this._password
  }

  set password(password) {
    this._password = password
  }

  get selected() {
    return this._selected
  }

  set selected(selected) {
    this._selected = selected
  }

  set focusable(focusable) {
    this._focusable = focusable
  }

  get focusable() {
    return this._focusable
  }

  set enabled(enabled) {
    this._enabled = enabled
  }

  get enabled() {
    return this._enabled
  }

  set packageName(packageName) {
    this._packageName = packageName
  }

  get packageName() {
    return this._packageName
  }

  get className() {
    return this._className
  }

  set className(className) {
    this._className = className
  }

  get bounds() {
    return this._bounds
  }

  set bounds(bounds) {
    this._bounds = bounds
    const matches = bounds.match(/([0-9]+)/g)

    this._startX = parseInt(matches[0], 10)
    this._startY = parseInt(matches[1], 10)
    this._endX = parseInt(matches[2], 10)
    this._endY = parseInt(matches[3], 10)
  }

  get resourceId() {
    return this._resourceId
  }

  set resourceId(resourceId) {
    this._resourceId = resourceId
  }

  get contentDesc() {
    return this._contentDesc
  }

  set contentDesc(contentDesc) {
    this._contentDesc = contentDesc
  }

  get checkable() {
    return this._checkable
  }

  set checkable(checkable) {
    this._checkable = checkable
  }

  get checked() {
    return this._checked
  }

  set checked(checked) {
    this._checked = checked
  }

  get clickable() {
    return this._clickable
  }

  set clickable(clickable) {
    this._clickable = clickable
  }

  toString() {
    const description = `${this.className} ${this.resourceId} ${this.text}`
    return `Widget{X=${this.x}, Y=${this.y}, description=${description}}`
  }

  equals(otherWidget) {
    if (this === otherWidget) {
      return true
    }

    if (otherWidget === null) {
      return false
    }

    if (!(otherWidget instanceof Widget)) {
      return false
    }

    if (this.startX !== otherWidget.startX
      || this.startY !== otherWidget.startY
      || this.endX !== otherWidget.endX
      || this.endY !== otherWidget.endY) {
      return false
    }

    if (this.packageName !== otherWidget.packageName) {
      return false
    }
    if (this.resourceId !== otherWidget.resourceId) {
      return false
    }

    if (this.className !== otherWidget.className) {
      return false
    }

    if (this.enabled !== otherWidget.enabled) {
      return false
    }

    if (this.checked !== otherWidget.checked) {
      return false
    }

    if (this.selected !== otherWidget.selected) {
      return false
    }

    return true
  }
}

export default Widget

