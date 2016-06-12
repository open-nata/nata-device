import fs from 'fs'
import Widget from './Widget.js'
import cheerio from 'cheerio'

/**
 * parse the xml file using xmldom
 * @param  {String} target the local path of dumpfile.xml
 * @return {Promise}  the document instance of the dumpfile.xml
 */
function parseFile(target) {
  return new Promise((resolve, reject) => {
    fs.readFile(target, 'utf8', (err, data) => {
      if (err) reject(err)
      // const doc = parser.parseFromString(data, 'application/xml')
      const doc = cheerio.load(data, { xmlMode: true })
      resolve(doc)
    })
  })
}

/**
 * get widgets from dumpfile.xml
 * @param  {String} target the local path of dumpfile.xml
 * @return {[Widget]}  Array of avaliable widgets
 */
async function getWidgetsFromXml(target) {
  const $ = await parseFile(target)
  const widgets = []
  let widget

  $('node').each((i, elem) => {
    const node = $(elem)
    widget = new Widget()
    widget.text = node.attr('text')
    widget.resourceId = node.attr('resource-id')
    widget.className = node.attr('class')
    widget.packageName = node.attr('package')
    widget.contentDesc = node.attr('content-desc')
    widget.checkable = node.attr('checkable')
    widget.checked = node.attr('checked')
    widget.clickable = node.attr('clickable')
    widget.enabled = node.attr('enabled')
    widget.focusable = node.attr('focusable')
    widget.focused = node.attr('focused')
    widget.scrollable = node.attr('scrollable')
    widget.longClickable = node.attr('long-clickable')
    widget.password = node.attr('password')
    widget.selected = node.attr('selected')
    widget.bounds = node.attr('bounds')
    widgets.push(widget)
  })

  return widgets
}


// import path from 'path'
// const dumpfilePath = path.join(__dirname, '../../assets/dumpfile.xml')
// getWidgetsFromXml(dumpfilePath).then((widgets) => {
//   console.log(widgets)
// })
// .catch((err) => console.log(err))

export default {
  getWidgetsFromXml: getWidgetsFromXml,
}