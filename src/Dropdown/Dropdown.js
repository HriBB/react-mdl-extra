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
    target: PropTypes.element.isRequired,
    targetNode: PropTypes.any,
    useTargetWidth: PropTypes.bool,
    useTargetMinHeight: PropTypes.bool,
    viewportPadding: PropTypes.number,
  }

  static defaultProps = {
    align: 'tl tl',
    closeOnEsc: true,
    closeOnOutsideClick: true,
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

  onOpen(portalNode) {
    const {
      align, offset, useTargetWidth, useTargetMinHeight, viewportPadding: pad
    } = this.props

    // window is our boundary
    const { innerWidth, innerHeight } = window

    // get target node
    const targetNode = this.props.targetNode || findDOMNode(this)

    // get bounding rects
    const portal = portalNode.getBoundingClientRect()
    const target = targetNode.getBoundingClientRect()

    // parse position
    let [ay,ax,ty,tx] = align.split('').map(a => a && POS[a]).filter(a => a)

    // parse offset
    let [oy,ox] = offset.split(' ').map(o => parseInt(o))

    // calculate space above and below target
    let spaceAbove, spaceBelow
    if (ty === 'top') {
      if (ay === 'top') {
        spaceAbove = target.bottom - pad + oy
        spaceBelow = innerHeight - target.top - pad + oy
      } else if (ay === 'bottom') {
        spaceAbove = target.top - pad + oy
        spaceBelow = innerHeight - target.bottom - pad + oy
      }
    } else if (ty === 'bottom') {
      if (ay === 'top') {
        spaceAbove = target.top - pad + oy
        spaceBelow = innerHeight - target.bottom - pad + oy
      } else if (ay === 'bottom') {
        spaceAbove = target.bottom - pad + oy
        spaceBelow = innerHeight - target.bottom - pad + oy
      }
    } else if (ty === 'middle') {
      if (ay === 'top' || ay === 'bottom') {
        spaceAbove = target.top + (target.height / 2) - pad + oy
        spaceBelow = innerHeight - target.bottom + (target.height / 2) - pad + oy
      } else if (ay === 'middle') {
        spaceAbove = innerHeight - (pad * 2)
        spaceBelow = innerHeight - (pad * 2)
      }
    }

    // flip y if neccessary
    if (ay === 'top' && portal.height > spaceBelow && spaceAbove > spaceBelow) {
      // flip up
      ay = 'bottom'
      if (ty === 'top') {
        ty = 'bottom'
      } else if (ty === 'bottom') {
        ty = 'top'
      }
    } else if (ay === 'bottom' && portal.height > spaceAbove && spaceBelow > spaceAbove) {
      // flip down
      ay = 'top'
      if (ty === 'top') {
        ty = 'bottom'
      } else if (ty === 'bottom') {
        ty = 'top'
      }
    }

    // flip x if neccessary
    if (ax === 'left') {
      // flip left
      if (tx === 'left' && (target.left + portal.width + pad + ox) > innerWidth) {
        tx = 'right'
        ax = 'right'
      } else if (tx === 'right' && (target.right + portal.width + pad + ox) > innerWidth) {
        tx = 'left'
        ax = 'right'
      }
    } else if (ax === 'right') {
      // flip left
      if (tx === 'left' && (target.left - portal.width) < 0) {
        tx = 'right'
        ax = 'left'
      } else if (tx === 'right' && (target.right - portal.width) < 0) {
        tx = 'left'
        ax = 'left'
      }
    }

    // apply max height
    const maxHeight = Math.max(spaceAbove, spaceBelow)
    this.applyStyles(portalNode, { maxHeight: `${maxHeight}px` })

    // use target width
    if (useTargetWidth) {
      this.applyStyles(portalNode, { width: `${target.width}px` })
    }

    // use target height as min-height
    if (useTargetMinHeight) {
      this.applyStyles(portalNode, { minHeight: `${target.height}px` })
    }

    // tether
    this.tether = new Tether({
      element: portalNode,
      target: targetNode,
      attachment: `${ay} ${ax}`,
      targetAttachment: `${ty} ${tx}`,
      offset: `${oy} ${ox}`,
      constraints: [{
        to: 'window',
        pin: true,
      }],
    })

    // fade in
    this.applyStyles(portalNode, { opacity: 1 })

    // force reposition
    if (portal.height > maxHeight) {
      this.tether.position()
    }
  }

  beforeClose(portalNode, remove) {
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
