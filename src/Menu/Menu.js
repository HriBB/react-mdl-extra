import React, { Component, PropTypes, cloneElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import Portal from 'react-portal'

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
    const portalClass = classnames('react-mdl-menu', className)
    return (
      <Dropdown className={portalClass} target={target} {...rest}>
        <MenuList>
          {children}
        </MenuList>
      </Dropdown>
    )
  }

}
