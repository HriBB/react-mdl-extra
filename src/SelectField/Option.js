import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'

import './Option.scss'

import KEYCODES from '../keycodes'

export default class Option extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    closeMenu: PropTypes.func,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    tabIndex: PropTypes.number,
    value: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  onClick() {
    const { closeMenu, onClick, value } = this.props
    if (onClick) onClick(value)
    closeMenu()
  }

  onKeyDown(e) {
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

  componentWillUnmount() {
  }

  render() {
    const { children, className, disabled, selected, tabIndex } = this.props
    const itemClass = classnames('mdl-option', className, {
      'mdl-option--selected': selected,
      'mdl-option--disabled': disabled,
    })
    return (
      <li
        className={itemClass}
        tabIndex={tabIndex}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
      >
        {children}
      </li>
    )
  }

}
