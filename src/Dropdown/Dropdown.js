import React, { Component, PropTypes } from 'react'
import { setValueForStyles as applyStyles } from 'react/lib/CSSPropertyOperations'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import Portal from 'react-portal'
import Tether from 'tether'
import Popper from 'popper.js'

import './Dropdown.scss'

/**
 * Position shorthand refs
 *
 * @type {Object}
 */
const POS = {
  t: 'top',
  b: 'bottom',
  l: 'left',
  r: 'right',
  m: 'middle',
  c: 'center',
}

/**
 * Generic dropdown component
 */
export default class Dropdown extends Component {

  static propTypes = {
    align: function(props, propName, componentName) {
      if (!/[a-z][a-z]\ [a-z][a-z]/.test(props[propName])) {
        return new Error(
          `Invalid prop ${propName} (${props[propName]}) supplied to ${componentName}. Validation failed.`
        )
      }
    },
    animate: PropTypes.bool,
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    closeOnEsc: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    fade: PropTypes.bool,
    offset: PropTypes.string,
    target: PropTypes.element.isRequired,
    targetNode: PropTypes.any,
    useTargetWidth: PropTypes.bool,
  }

  static defaultProps = {
    align: 'tl tl',
    animate: false,
    closeOnEsc: true,
    closeOnOutsideClick: true,
    fade: true,
    offset: '0 0',
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
    const { align, animate, fade, offset, useTargetWidth } = this.props

    // get position
    const [ay,ax,ty,tx] = align.split('').map(a => a && POS[a]).filter(a => a)
    const attachment = `${ay} ${ax}`
    const targetAttachment = `${ty} ${tx}`

    // get target node
    const target = this.props.targetNode || findDOMNode(this)
    const targetRect = target.getBoundingClientRect()

    // use target width
    if (useTargetWidth) {
      this.applyStyles(portal, { width: `${targetRect.width}px` })
    }

    this.applyStyles(portal, { minHeight: `${targetRect.height}px` })

    // tether
    this.tether = new Tether({
      element: portal,
      target: target,
      attachment,
      targetAttachment,
      offset,
      constraints: [{
        to: 'window',
        attachment: 'together',
        pin: true,
      }],
    })

    // fade in
    this.applyStyles(portal, {
      opacity: `1`,
      transition: `opacity .3s cubic-bezier(0.25,0.8,0.25,1)`
    })
  }

  beforeClose(portal, remove) {
    if (this.tether) {
      this.tether.destroy()
    }
    setTimeout(remove, 10)
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
