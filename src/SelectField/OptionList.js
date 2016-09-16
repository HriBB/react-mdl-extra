import React, { Component, PropTypes, Children, cloneElement } from 'react'
import classnames from 'classnames'

import './OptionList.scss'

export default class OptionList extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    closePortal: PropTypes.func,
    onItemClick: PropTypes.func.isRequired,
    value: PropTypes.any,
  }

  componentDidMount() {
    console.log('componentDidMount');
    setTimeout(() => {
      this.list.firstChild.focus()
    }, 30)
  }

  render() {
    const { children, closePortal, className, onItemClick, value } = this.props
    const listClass = classnames('react-mdl-option__list', className)
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
