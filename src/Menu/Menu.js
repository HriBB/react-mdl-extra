import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Dropdown from '../Dropdown'
import MenuList from '../MenuList'

import './Menu.css'

export default class Menu extends Component {

  static propTypes = {
    align: PropTypes.string,
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    offset: PropTypes.string,
    target: PropTypes.element.isRequired,
    useTargetWidth: PropTypes.bool,
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
