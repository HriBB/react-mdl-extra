import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'

import './MenuItem.scss'

import KEYCODES from '../keycodes'

export default class MenuItem extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string.isRequired,
    closeMenu: PropTypes.func,
    onClick: PropTypes.func,
    tabIndex: PropTypes.number,
  }

  onClick = () => {
    const { closeMenu, onClick } = this.props
    if (onClick) onClick(this.props)
    setTimeout(closeMenu, 10)
  }

  onKeyDown = (e) => {
    if (e.keyCode === KEYCODES.UP || e.keyCode === KEYCODES.DOWN) {
      const node = findDOMNode(this)
      const children = node.parentNode.children
      const i = [].indexOf.call(children, node)
      const len = children.length
      const next = e.keyCode === KEYCODES.DOWN ? (i+1)%len : (i+len-1)%len
      e.stopPropagation()
      e.preventDefault()
      children[next].focus()
    } else if (e.keyCode === KEYCODES.ENTER || e.keyCode === KEYCODES.SPACE) {
      e.stopPropagation()
      e.preventDefault()
      this.onClick()
    }
  }

  render() {
    const { children, className, tabIndex } = this.props
    const itemClass = classnames('mdl-portalmenu__item', className)
    return (
      <li className={itemClass} tabIndex={tabIndex} onClick={this.onClick} onKeyDown={this.onKeyDown}>
        {children}
      </li>
    )
  }

}
