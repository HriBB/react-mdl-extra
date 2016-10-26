import React, { Component, Children, PropTypes } from 'react'
import { Textfield } from 'react-mdl'
import classnames from 'classnames'

import './SelectField.scss'

import Dropdown from '../Dropdown'
import OptionList from './OptionList'

export default class SelectField extends Component {

  static propTypes = {
    align: PropTypes.string,
    animate: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    floatingLabel: PropTypes.bool,
    label: PropTypes.string.isRequired,
    offset: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    showMenuBelow: PropTypes.bool,
    value: PropTypes.any,
  }

  static defaultProps = {
    offset: '-20px 0',
  }

  constructor(props) {
    super(props)
    this.state = { focused: false }
    this.onItemClick = this.onItemClick.bind(this)
    this.onTextfieldFocus = this.onTextfieldFocus.bind(this)
    this.onTextfieldBlur = this.onTextfieldBlur.bind(this)
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
    this.setState({ focused: true })
    if (onFocus) onFocus(value)
  }

  onTextfieldBlur() {
    const { value, onBlur } = this.props
    this.setState({ focused: false })
    if (onBlur) onBlur(value)
  }

  render() {
    const {
      align, animate, className, disabled, error, floatingLabel, label,
      offset, readOnly, value,
    } = this.props
    const { focused } = this.state
    const children = Children.toArray(this.props.children)
    const empty = !children.length

    const mainClass = classnames({
      'mdl-selectfield': true,
      'mdl-selectfield--disabled': disabled,
      'mdl-selectfield--empty': empty,
      'mdl-selectfield--error': error,
      'mdl-selectfield--focused': focused,
    }, className)

    const isValue = value !== undefined && value !== null && value !== ''
    const index = isValue && children.findIndex(c => c.props.value === value)
    const inputValue = isValue && index > -1 ? children[index].props.children : ''

    const inputProps = {
      disabled,
      error,
      floatingLabel,
      label,
      readOnly: true,
      ref: ref => this.input = ref,
      type: 'text',
      value: inputValue,
    }
    if (!readOnly) {
      inputProps.onMouseDown = this.onTextfieldMouseDown
      inputProps.onFocus = this.onTextfieldFocus
      inputProps.onBlur = this.onTextfieldBlur
    }

    if (disabled || readOnly || empty) {
      return (
        <div className={mainClass}>
          <Textfield {...inputProps}/>
          <i className={'mdl-selectfield__arrow'}/>
        </div>
      )
    }

    const dropdownProps = {
      align,
      animate,
      offset,
      target: <Textfield {...inputProps}/>,
      useTargetWidth: true,
    }

    return (
      <div className={mainClass}>
        <Dropdown {...dropdownProps}>
          <OptionList value={value} onItemClick={this.onItemClick}>
            {children}
          </OptionList>
        </Dropdown>
        <i className={'mdl-selectfield__arrow'}/>
      </div>
    )
  }

}
