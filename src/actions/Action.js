class Action {
  constructor(type) {
    this._type = type
  }

  toCommand() {
    throw new Error('Missing implementation')
  }

  fire() {
    throw new Error('Missing implementation')
  }

  get type() {
    return this._type
  }

  equals(action) {
    throw new Error('Missing implementation')
  }
}

export default Action