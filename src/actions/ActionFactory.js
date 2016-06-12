import _ from 'lodash'
import ClickAction from './ClickAction.js'
import TextInputAction from './TextInputAction.js'
import SwipeAction from './SwipeAction.js'
import LongClickAction from './LongClickAction.js'
import SwipeDirection from './SwipeDirection.js'

function getActionsFromWidgets(device, widgets) {
  console.log(widgets)
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

export default {
  getActionsFromWidgets,
}