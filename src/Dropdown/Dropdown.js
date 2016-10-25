import React, { Component, PropTypes } from 'react'
import { setValueForStyles as applyStyles } from 'react/lib/CSSPropertyOperations'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import Portal from 'react-portal'
import Tether from 'tether'

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
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open(portalNode) {
    const { align, animate, fade, offset, useTargetWidth } = this.props

    // get target node
    const targetNode = this.props.targetNode || findDOMNode(this)
    const targetRect = targetNode.getBoundingClientRect()

    // get position
    const [ay,ax,ty,tx] = align.split('').map(a => a && POS[a]).filter(a => a)
    const attachment = `${ay} ${ax}`
    const targetAttachment = `${ty} ${tx}`

    // use target width
    if (useTargetWidth) {
      applyStyles(portalNode, {
        width: `${targetRect.width}px`,
      }, this._reactInternalInstance)
    }

    // constrain portal height
    applyStyles(portalNode.firstChild, {
      maxHeight: `${window.innerHeight}px`,
      minHeight: `${targetRect.height}px`,
    }, this._reactInternalInstance)

    // tether options
    const options = {
      element: portalNode,
      target: targetNode,
      attachment,
      targetAttachment,
      offset,
      constraints: [{
        to: 'window',
        attachment: 'together together',
        pin: true,
      }],
    }

    // run tether
    if (!this.tether) {
      this.tether = new Tether(options)
    } else {
      this.tether.setOptions(options)
    }

    // fade in
    if (fade) {
      applyStyles(portalNode, {
        opacity: `1`,
        transition: `opacity .3s cubic-bezier(0.25,0.8,0.25,1)`
      }, this._reactInternalInstance)
    }

    // run animation
    if (animate) {
      const transform = portalNode.style.transform

      const prect = portalNode.getBoundingClientRect()
      const trect = targetNode.getBoundingClientRect()

      const fixLeft  = ax === 'left' && tx === 'left' && prect.left + 1 < trect.left
      const fixRight = ax === 'right' && tx === 'right' && trect.right + 1 < prect.right

      const originX = prect.bottom + 1 <= trect.top ? 'bottom': 'top'
      const originY = fixLeft && 'right' || fixRight && 'left' || ax

      const from = {
        transform: `${transform} scale(0.01, 0.01)`,
        transformOrigin: `${originX} ${originY}`
      }

      const to = {
        opacity: `1`,
        transform: `${transform} scale(1, 1)`,
        transition: `transform .2s cubic-bezier(0.25,0.8,0.25,1)`
      }

      applyStyles(portalNode, from, this._reactInternalInstance)

      this.timeout = setTimeout(() => {
        this.timeout = null
        applyStyles(portalNode, to, this._reactInternalInstance)
      }, 20)
    }
  }

  close() {
    if (this.tether) {
      this.tether.disable()
    }
  }

  componentWillUnmount() {
    if (this.tether) {
      this.tether.destroy()
    }
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
        onOpen={this.open}
        onClose={this.close}
      >
        {children}
      </Portal>
    )
  }

}
