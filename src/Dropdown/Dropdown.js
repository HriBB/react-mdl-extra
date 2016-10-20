import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import Portal from 'react-portal'

import './Dropdown.scss'

export default class Dropdown extends Component {

  static propTypes = {
    align: PropTypes.oneOf(['left', 'right']),
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    closeOnEsc: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    offset: PropTypes.array,
    padding: PropTypes.number,
    target: PropTypes.element.isRequired,
    targetNode: PropTypes.any,
    useTargetWidth: PropTypes.bool,
    valign: PropTypes.oneOf(['bottom', 'top']),
  }

  static defaultProps = {
    align: 'left',
    closeOnEsc: true,
    closeOnOutsideClick: true,
    offset: [0, 0],
    padding: 10,
    valign: 'bottom',
  }

  constructor(props) {
    super(props)
    this.show = this.show.bind(this)
  }

  show(portalNode) {
    const {
      align,
      offset: [ offsetX, offsetY ],
      padding,
      useTargetWidth,
      valign,
    } = this.props

    const {
      innerWidth,
      innerHeight,
      scrollX,
      scrollY,
    } = window

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
  }

  render() {
    const { children, className, closeOnEsc, closeOnOutsideClick, target } = this.props
    const portalClass = classnames('react-mdl-dropdown', className)
    return (
      <Portal
        className={portalClass}
        openByClickOn={target}
        closeOnEsc={closeOnEsc}
        closeOnOutsideClick={closeOnOutsideClick}
        onOpen={this.show}
      >
        {children}
      </Portal>
    )
  }

}
