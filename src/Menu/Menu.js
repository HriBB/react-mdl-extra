import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './Menu.scss'

import Dropdown from '../Dropdown'
import MenuList from './MenuList'

export default class Menu extends Component {

  static propTypes = {
    align: PropTypes.string,
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    offset: PropTypes.string,
    target: PropTypes.element.isRequired,
    useTargetWidth: PropTypes.bool,
    talign: PropTypes.string,
  }

  render() {
    const { children, className, ...rest } = this.props
    const dropdownClass = classnames('mdl-portalmenu', className)
    return (
      <Dropdown className={dropdownClass} {...rest}>
        <MenuList>
          {children}
        </MenuList>
      </Dropdown>
    )
  }

}
