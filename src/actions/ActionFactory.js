import _ from 'lodash'
// ui actions
import ClickAction from './ClickAction.js'
import TextInputAction from './TextInputAction.js'
import SwipeAction from './SwipeAction.js'
import LongClickAction from './LongClickAction.js'
import SwipeDirection from './SwipeDirection.js'


// common actions
import BackAction from './BackAction.js'
import CleanDataAction from './CleanDataAction.js'
import HomeAction from './HomeAction.js'
import MenuAction from './MenuAction.js'
import StartAppAction from './StartAppAction.js'


function getActionsFromWidgets(device, widgets) {
  const actions = []
  _.forEach(widgets, (widget) => {
    if (widget.enabled === 'false') {
      return
    }
    if (widget.scrollable === 'true') {
      if (widget.className === 'android.widget.ListView') {
        actions.push(new SwipeAction(device, widget, SwipeDirection.DOWN))
        actions.push(new SwipeAction(device, widget, SwipeDirection.UP))
      } else if (widget.className === 'android.support.v4.view.ViewPager') {
        actions.push(new SwipeAction(device, widget, SwipeDirection.RIGHT))
        actions.push(new SwipeAction(device, widget, SwipeDirection.LEFT))
      }
    }
    if ((widget.className === 'android.widget.TextView'
        || widget.className === 'android.widget.Button'
        || widget.className === 'android.widget.ImageView'
        || widget.className === 'android.widget.ImageButton'
        || widget.className === 'android.widget.RelativeLayout'
        || widget.className === 'android.widget.LinearLayout'
        || widget.className === 'android.widget.CheckedTextView'
        || widget.className === 'android.widget.CheckBox'
    ) && widget.clickable === 'true') {
      actions.push(new ClickAction(device, widget))
    }

    if (widget.longClickable === 'true') {
      actions.push(new LongClickAction(device, widget))
    }

    // text input actions
    if (widget.className === 'android.widget.EditText' && widget.clickable === 'true') {
      actions.push(new TextInputAction(device, widget))
    }
  })

  return actions
}

// back, home, menu actions
function getCommonActions(device) {
  const actions = []
  actions.push(new BackAction(device))
  actions.push(new HomeAction(device))
  actions.push(new MenuAction(device))

  actions.push()
  return actions
}

function createStartAppAction(device, pkgAct) {
  return new StartAppAction(device, pkgAct)
}

function createCleanAppAction(device, pkg) {
  return new CleanDataAction(device, pkg)
}

function createBackAction(device) {
  return new BackAction(device)
}

function createMenuAction(device) {
  return new MenuAction(device)
}

function createHomeAction(device) {
  return new HomeAction(device)
}

export default {
  getActionsFromWidgets,
  getCommonActions,
  createStartAppAction,
  createCleanAppAction,
  createBackAction,
  createMenuAction,
  createHomeAction,
}