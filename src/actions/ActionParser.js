import ActionType from './ActionType.js'
import ClickAction from './ClickAction.js'
import TextInputAction from './TextInputAction.js'
import SwipeAction from './SwipeAction.js'
import LongClickAction from './LongClickAction.js'

import BackAction from './BackAction.js'
import HomeAction from './HomeAction.js'
import MenuAction from './MenuAction.js'
import CleanDataAction from './CleanDataAction.js'
import StartAppAction from './StartAppAction.js'

import UnKnownAction from './UnknownAction.js'

import _ from 'lodash'

function  parseAt(at) {
  const coordinates = at.substring(1).split(/[,x]/)
  return {
    startX: parseInt(coordinates[0], 10),
    endX: parseInt(coordinates[1], 10),
    startY:parseInt(coordinates[2], 10),
    endY: parseInt(coordinates[3], 10),
  }
}

function parse(device, actionString) {
  const params = actionString.split(' ', 3)
  const actionType = params[0]
  const at = params[1]
  const pkg = params[1]
  const pkgAct = params[1]
  const direction = params[2]
  const text = params[2]

  let action

  switch (actionType) {
    case ActionType.BACK : action = new BackAction(device); break
    case ActionType.HOME : action = new HomeAction(device); break
    case ActionType.MENU : action = new MenuAction(device); break
    case ActionType.CLEAN_DATA: action = new CleanDataAction(device, pkg); break
    case ActionType.START_APP: action = new StartAppAction(device, pkgAct); break
    case ActionType.CLICK: action = new ClickAction(device, parseAt(at)); break
    case ActionType.LONG_CLICK: action = new LongClickAction(device, parseAt(at)); break
    case ActionType.SWIPE : action  = new SwipeAction(device, parseAt(at), direction); break
    case ActionType.INPUT : action = new TextInputAction(device, parseAt(at), text); break
    default: action = new UnKnownAction(device)
  }

  return action
}

