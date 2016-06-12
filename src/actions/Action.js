class Action {
  constructor(type) {
    this._type = type
  }

  toCommand() {
    throw new Error('Missing implementation')
  }

  // toObject() {
  //   throw new Error('Missing implementation')
  // }

  get type() {
    return this._type
  }
}

export default Action