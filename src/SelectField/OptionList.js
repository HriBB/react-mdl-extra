import React, { Component, PropTypes, Children, cloneElement } from 'react'
import classnames from 'classnames'

import KEYCODE from '../keycodes'

import './OptionList.scss'

export default class OptionList extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    closePortal: PropTypes.func,
    onItemClick: PropTypes.func.isRequired,
    value: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.keyDown = this.keyDown.bind(this)
  }

  keyDown(e) {
    if (e.keyCode === KEYCODE.ESC) {
      // prevent esc bubbling
      e.preventDefault()
      e.stopPropagation()
      this.props.closePortal()
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDown, true)
    // scroll into view
    if (!this.props.value) return // no value
    const parent = this.list.parentNode
    if (parent.clientHeight >= parent.scrollHeight) return // no scroller
    const [selected] = this.list.getElementsByClassName('mdl-option--selected')
    parent.scrollTop = selected.offsetTop - (parent.clientHeight / 2)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown, true)
  }

  render() {
    const { children, closePortal, className, onItemClick, value } = this.props
    const listClass = classnames('mdl-option__list', className)
    return (
      <ul className={listClass} ref={ref => this.list = ref}>
        {Children.map(children, (child, index) => cloneElement(child, {
          closeMenu: closePortal,
          onClick: onItemClick,
          selected: child.props.value === value,
          tabIndex: index + 1,
        }))}
      </ul>
    )
  }

}
