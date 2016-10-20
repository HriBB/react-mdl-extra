import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import Portal from 'react-portal'
import Tether from 'tether'

import './Dropdown.scss'

export default class Dropdown extends Component {

  static propTypes = {
    align: PropTypes.string,
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    closeOnEsc: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    offset: PropTypes.string,
    target: PropTypes.element.isRequired,
    targetNode: PropTypes.any,
    useTargetWidth: PropTypes.bool,
    talign: PropTypes.string,
  }

  static defaultProps = {
    align: 'top left',
    closeOnEsc: true,
    closeOnOutsideClick: true,
    offset: '0 0',
    talign: 'top left',
  }

  constructor(props) {
    super(props)
    this.tether = null
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open(portalNode) {
    const { align, offset, useTargetWidth, talign } = this.props

    // get target node
    let targetNode = this.props.targetNode || findDOMNode(this)

    // set portal max height
    portalNode.firstChild.style.maxHeight = `${innerHeight}px`

    // use target width
    if (useTargetWidth) {
      portalNode.style.width = `${targetNode.getBoundingClientRect().width}px`
    }

    const options = {
      element: portalNode,
      target: targetNode,
      attachment: align,
      targetAttachment: talign,
      offset,
      constraints: [{
        to: 'window',
        attachment: 'together',
        pin: true
      }]
    }

    if (!this.tether) {
      this.tether = new Tether(options)
    } else {
      this.tether.enable()
      this.tether.setOptions(options)
    }

    /*

    let targetNode = this.props.targetNode || findDOMNode(this)
    let target = targetNode.getBoundingClientRect()
    let portal = portalNode.getBoundingClientRect()

    // lets calculate menu position and transform origin
    let menuX, menuY, originX, originY, constrain

    // set max height to original portal height
    let maxHeight = portal.height

    // calculate space above/below target
    let above = target.top
    let below = innerHeight - target.bottom

    // NOTE: the code below is fugly, but it works
    // if you want, you can make it better ;)

    //
    // vertical align
    //
    if (valign === 'top') {
      // show at the top
      menuY = target.top - portal.height + scrollY + offsetY + 5
      originY = 'bottom'
      // out of bounds, move to bottom if there is more space
      if ((menuY - scrollY) < 0 && below > above) {
        menuY = target.bottom + scrollY + offsetY
        originY = 'top'
      }
    } else {
      // show at the bottom
      menuY = target.bottom + scrollY + offsetY
      originY = 'top'
      // out of bounds, move to top if there is more space
      if ((menuY + portal.height) > (innerHeight + scrollY) && above > below) {
        menuY = target.top - portal.height + scrollY + offsetY + 5
        originY = 'bottom'
      }
    }

    //
    // vertical constraint
    //
    if (originY === 'top') {
      // originY is top, show menu at the bottom
      if (portal.height > (innerHeight - target.bottom)) {
        maxHeight = innerHeight - target.bottom - padding - offsetY
        constrain = true
      }
    } else {
      // originY is bottom, show menu at the top
      if (portal.height > target.top) {
        maxHeight = target.top - padding + offsetY
        menuY = scrollY + padding // adjust menu position
        constrain = true
      }
    }

    //
    // apply constraint and recalculate portal and target rect
    //
    if (constrain) {
      portalNode.firstChild.style.maxHeight = `${maxHeight}px`
      portal = portalNode.getBoundingClientRect()
      target = targetNode.getBoundingClientRect()
    }

    //
    // horizontal align
    //
    if (align === 'left') {
      // align left
      menuX = target.left + scrollX + offsetX
      originX = 'left'
      // out of bounds, move to right
      if ((menuX + portal.width) > (innerWidth + scrollX)) {
        menuX = target.right + scrollX - portal.width + offsetX
        originX = 'right'
      }
    } else {
      // align right
      menuX = target.right + scrollX - portal.width + offsetX
      originX = 'right'
      // out of bounds, move to left
      if (menuX < 0) {
        menuX = target.left + scrollX + offsetX
        originX = 'left'
      }
    }

    //
    // set initial style
    //
    if (useTargetWidth) {
      portalNode.style.width = `${target.width}px`
    }
    portalNode.style.height = `0px`
    portalNode.style.left = `${menuX}px`
    portalNode.style.top = `${menuY}px`
    portalNode.style.transform = `scale3d(0.01, 0.01, 1)`
    portalNode.style.transformOrigin = `${originX} ${originY}`

    //
    // set final style with a slight delay so that it animates
    // TODO: figure out how to wait for initial styles
    //
    setTimeout(() => {
      portalNode.style.opacity = `1`
      portalNode.style.height = `${maxHeight}px`
      portalNode.style.transform = `scale3d(1, 1, 1)`
      portalNode.style.transition = `transform 0.2s ease`
    }, 20)

    */
  }

  close() {
    if (this.tether) {
      this.tether.disable()
    }
  }

  render() {
    const { children, className, closeOnEsc, closeOnOutsideClick, target } = this.props
    const portalClass = classnames('mdl-dropdown', className)
    return (
      <Portal
        className={portalClass}
        openByClickOn={target}
        closeOnEsc={closeOnEsc}
        closeOnOutsideClick={closeOnOutsideClick}
        onOpen={this.open}
        onClose={this.close}
      >
        {children}
      </Portal>
    )
  }

}
