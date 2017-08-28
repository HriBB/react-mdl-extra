import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import KEYCODE from '../keycodes'

import './OptionList.css'

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
    // add keydown event listener
    document.addEventListener('keydown', this.keyDown, true)
    // scroll into view
    if (!this.props.value) return // no value
    this.scrollTimeout = setTimeout(() => {
      this.scrollTimeout = null
      if (this.list.scrollHeight > this.list.offsetHeight) {
        const [selected] = this.list.getElementsByClassName('mdl-option--selected')
        this.list.scrollTop = selected.offsetTop - (this.list.clientHeight / 2)
      }
    })
  }

  componentWillUnmount() {
    // remove event listener
    document.removeEventListener('keydown', this.keyDown, true)
    // clear scroll timeout if necessary
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout)
    }
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
