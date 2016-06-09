class DeviceInfo {
  constructor() {
    this._name = undefined
    this._id = undefined
    this._version = undefined
    this._sdk = undefined
    this._resolution = undefined
    this._cpu = undefined
    this._manufacturer = undefined
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get id() {
    return this._id
  }

  set id(id) {
    this._id = id
  }

  get version() {
    return this._version
  }

  set version(version) {
    this._version = version
  }

  get sdk() {
    return this._sdk
  }

  set sdk(sdk) {
    this._sdk = sdk
  }

  get resolution() {
    return this._resolution
  }

  set resolution(resolution) {
    this._resolution = resolution
  }

  get cpu() {
    return this._cpu
  }

  set cpu(cpu) {
    this._cpu = cpu
  }

  get manufacturer() {
    return this._manufacturer
  }

  set manufacturer(manufacturer) {
    this._manufacturer = manufacturer
  }

}

export default DeviceInfo