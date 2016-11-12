import React, { Component, PropTypes } from 'react'
import { setValueForStyles as applyStyles } from 'react/lib/CSSPropertyOperations'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import Portal from 'react-portal'
import Tether from 'tether'

import './Dropdown.scss'

const POS = {
  t: 'top',
  b: 'bottom',
  l: 'left',
  r: 'right',
  m: 'middle',
  c: 'center',
}

export default class Dropdown extends Component {

  static propTypes = {
    align: function(props, propName, componentName) {
      if (!/[btm][lrc]\ [btm][lrc]/.test(props[propName])) {
        return new Error(
          `Invalid prop ${propName} (${props[propName]}) supplied to ${componentName}. Validation failed.`
        )
      }
    },
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    closeOnEsc: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    offset: PropTypes.string,
    viewportPadding: PropTypes.number,
    cssPadding: PropTypes.number,
    target: PropTypes.element.isRequired,
    targetNode: PropTypes.any,
    useTargetWidth: PropTypes.bool,
    useTargetMinHeight: PropTypes.bool,
  }

  static defaultProps = {
    align: 'tl tl',
    closeOnEsc: true,
    closeOnOutsideClick: true,
    cssPadding: 10,
    offset: '0 0',
    viewportPadding: 10,
  }

  constructor(props) {
    super(props)
    this.tether = null
    this.onOpen = this.onOpen.bind(this)
    this.beforeClose = this.beforeClose.bind(this)
  }

  applyStyles(node, styles) {
    applyStyles(node, styles, this._reactInternalInstance)
  }

  onOpen(portal) {
    const {
      align,
      offset,
      cssPadding,         // padding for styles (needed if menu is out of bounds)
      viewportPadding,    // padding for viewport (needed if menu is out of bounds)
      useTargetWidth,     // dropdown will inherit target width
      useTargetMinHeight, // dropdown will inherit target height as min-height
    } = this.props

    // parse position
    let [ay,ax,ty,tx] = align.split('').map(a => a && POS[a]).filter(a => a)

    // parse offset
    let [oy,ox] = offset.split(' ').map(o => parseInt(o))

    // window is our boundary
    const { innerHeight } = window

    // get target node
    const target = this.props.targetNode || findDOMNode(this)

    // get bounding rects
    const portalRect = portal.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()

    // calculate padding
    const padding = viewportPadding + cssPadding + oy

    // calculate space above and below target
    let spaceAbove, spaceBelow
    if (ty === 'middle') {
      spaceAbove = targetRect.top + (targetRect.height / 2) - padding
      spaceBelow = innerHeight - targetRect.bottom + (targetRect.height / 2) - padding
    } else if (ty === 'top') {
      if (ay === 'top') {
        spaceAbove = targetRect.bottom - padding
        spaceBelow = innerHeight - targetRect.top - padding
      } else {
        spaceAbove = targetRect.top - padding
        spaceBelow = innerHeight - targetRect.bottom - padding
      }
    } else {
      if (ay === 'top') {
        spaceAbove = targetRect.top - padding
        spaceBelow = innerHeight - targetRect.bottom - padding
      } else {
        spaceAbove = targetRect.bottom - padding
        spaceBelow = innerHeight - targetRect.bottom - padding
      }
    }

    // calculate max height
    const maxHeight = Math.max(spaceAbove, spaceBelow)

    // flip if neccesary
    if (ay === 'top' && spaceAbove > spaceBelow) {

      // flip up
      ay = 'bottom'
      if (ty === 'top') {
        ty = 'bottom'
      } else {
        ty = 'top'
      }

    } else if (ay === 'bottom' && spaceBelow > spaceAbove) {

      // flip down
      ay = 'top'
      if (ty === 'top') {
        ty = 'bottom'
      } else {
        ty = 'top'
      }

    }

    // apply max height
    this.applyStyles(portal, { maxHeight: `${maxHeight}px` })

    // use target width
    if (useTargetWidth) {
      this.applyStyles(portal, { width: `${targetRect.width}px` })
    }

    // use target height as min-height
    if (useTargetMinHeight) {
      this.applyStyles(portal, { minHeight: `${targetRect.height}px` })
    }

    // tether
    this.tether = new Tether({
      element: portal,
      target: target,
      attachment: `${ay} ${ax}`,
      targetAttachment: `${ty} ${tx}`,
      offset: `${oy} ${ox}`,
      constraints: [{
        to: 'window',
        pin: true,
      }],
    })

    // fade in
    this.applyStyles(portal, { opacity: 1 })

    // force reposition
    if (portalRect.height > maxHeight) {
      this.tether.position()
    }
  }

  beforeClose(portal, remove) {
    if (this.tether) {
      this.tether.destroy()
    }
    this.timeout = setTimeout(() => {
      this.timeout = null
      remove()
    })
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  render() {
    const { children, className, closeOnEsc, closeOnOutsideClick, target } = this.props
    const portalClass = classnames('mdl-dropdown', className)
    return (
      <Portal
        className={portalClass}
        closeOnEsc={closeOnEsc}
        closeOnOutsideClick={closeOnOutsideClick}
        openByClickOn={target}
        onOpen={this.onOpen}
        beforeClose={this.beforeClose}
      >
        {children}
      </Portal>
    )
  }

}
