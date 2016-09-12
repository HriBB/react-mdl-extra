import React, { Component, PropTypes, Children, cloneElement } from 'react'
import classnames from 'classnames'

import './MenuList.scss'

export default class MenuList extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    closePortal: PropTypes.func,
  }

  render() {
    const { children, closePortal, className } = this.props
    const listClass = classnames('react-mdl-menu__list', className)
    return (
      <ul className={listClass}>
        {Children.map(children, (child, index) => cloneElement(child, {
          tabIndex: index + 1,
          closeMenu: closePortal,
        }))}
      </ul>
    )
  }

}
