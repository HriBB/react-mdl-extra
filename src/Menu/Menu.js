import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

import './Menu.scss'

import Dropdown from '../Dropdown'
import MenuList from './MenuList'

export default class Menu extends Component {

  static propTypes = {
    align: PropTypes.oneOf(['left', 'right']),
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    offset: PropTypes.array,
    padding: PropTypes.number,
    target: PropTypes.element.isRequired,
    useTargetWidth: PropTypes.bool,
    valign: PropTypes.oneOf(['bottom', 'top']),
  }

  static defaultProps = {
    align: 'left',
    offset: [0, 0],
    padding: 10,
    valign: 'bottom',
  }

  render() {
    const { children, className, target, ...rest } = this.props
    const dropdownClass = classnames('react-mdl-menu', className)
    return (
      <Dropdown className={dropdownClass} target={target} {...rest}>
        <MenuList>
          {children}
        </MenuList>
      </Dropdown>
    )
  }

}
