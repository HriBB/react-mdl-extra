import React, { Component, Children, PropTypes, cloneElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Textfield, Icon } from 'react-mdl'
import classnames from 'classnames'

import './SelectField.scss'

import Dropdown from '../Dropdown'
import OptionList from './OptionList'

export default class SelectField extends Component {

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    className: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    floatingLabel: PropTypes.bool,
    label: PropTypes.string.isRequired,
    showMenuBelow: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    value: PropTypes.any,
  }

  static defaultProps = {
    showMenuBelow: false,
  }

  constructor(props) {
    super(props)

    // focused state
    this.state = { focused: false }

    // bind methods
    this.onItemClick = this.onItemClick.bind(this)
  }

  getInputNode() {
    return this.input.refs.input
  }

  onItemClick(newValue) {
    const { value, onChange } = this.props
    if (value !== newValue) {
      if (onChange) onChange(newValue)
    }
  }

  onTextfieldFocus() {
    const { value, onFocus } = this.props
    this.showMenu()
    this.setState({ focused: true })
    if (onFocus) onFocus(value)
  }

  onTextfieldBlur() {
    const { value, onBlur } = this.props
    this.setState({ focused: false })
    if (onBlur) onBlur(value)
  }

  onTextfieldKeyDown(e) {
    const TAB = 9
    const ESCAPE = 27

    switch (e.which) {
      case TAB:
        this.hideMenu()
        break
      case ESCAPE:
        this.getInputNode().blur()
        this.hideMenu()
        break
    }
  }

  render() {
    const {
      className, error, floatingLabel, label, showMenuBelow, readOnly, value,
    } = this.props

    const children = Children.toArray(this.props.children)

    const mainClass = classnames('react-mdl-selectfield', {
      'react-mdl-selectfield--menu-below': showMenuBelow,
      'react-mdl-selectfield--floating-label': floatingLabel,
      'react-mdl-selectfield--empty': !children.length,
      'react-mdl-selectfield--error': error,
    }, className)

    const index = children.findIndex(c => c.props.value === value)
    const inputValue = index > -1 ? children[index].props.children : ''

    const inputProps = {
      type: 'text',
      value: inputValue,
      error,
      label,
      floatingLabel,
      readOnly: true,
      ref: ref => this.input = ref,
    }

    /*
    if (!readOnly) {
      inputProps.onFocus = this.onTextfieldFocus
      inputProps.onBlur = this.onTextfieldBlur
      inputProps.onKeyDown = this.onTextfieldKeyDown
    }
    */

    return (
      <div className={mainClass}>

        <Dropdown target={<Textfield {...inputProps}/>} offset={[0, -49]} useTargetWidth>
          <OptionList value={value} onItemClick={this.onItemClick}>
            {children}
          </OptionList>
        </Dropdown>

        {!readOnly &&
          <Icon
            className={'react-mdl-selectfield__arrow'}
            name={`arrow_drop_${this.state.focused ? 'up' : 'down'}`}
            onClick={this.showMenu}
          />}

      </div>
    )
  }

}
