import Action from './Action.js'

class BackAction extends Action {
  constructor(device) {
    super('back')
    this.device = device
  }

  async fire() {
    await this.device.back()
  }
}


export default BackAction