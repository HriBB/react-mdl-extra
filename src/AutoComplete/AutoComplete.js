import React, { Component, PropTypes } from 'react'
import { Textfield } from 'react-mdl'
import classnames from 'classnames'

import './AutoComplete.scss'

import Dropdown from '../Dropdown'
import OptionList from '../SelectField/OptionList'
import Option from '../SelectField/Option'

export default class AutoComplete extends Component {

  static propTypes = {
    align: PropTypes.string,
    className: PropTypes.string,
    dataIndex: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    floatingLabel: PropTypes.bool,
    forceSelect: PropTypes.bool,
    items: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    offset: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    showMenuBelow: PropTypes.bool,
    value: PropTypes.any,
    valueIndex: PropTypes.string.isRequired,
  }

  static defaultProps = {
    align: 'tl bl',
    offset: '20px 0',
  }

  constructor(props) {
    super(props)
    this.state = { value: null, focused: false }
    this.onItemClick = this.onItemClick.bind(this)
    this.onTextfieldChange = this.onTextfieldChange.bind(this)
    this.onTextfieldFocus = this.onTextfieldFocus.bind(this)
    this.onTextfieldBlur = this.onTextfieldBlur.bind(this)
  }

  onItemClick(newValue) {
    const { value, onChange } = this.props
    this.setState({ value: null })
    if (value !== newValue && onChange) {
      onChange(newValue)
    }
  }

  onTextfieldChange(e) {
    const { forceSelect, onChange } = this.props
    const value = e.target.value
    this.setState({ value })
    if (!forceSelect && onChange) {
      onChange(value)
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
      align, className, dataIndex, disabled, error, floatingLabel, items,
      label, offset, readOnly, value, valueIndex,
    } = this.props
    const { focused, value: stateValue } = this.state

    console.log('items', items);

    const filtered = stateValue
      ? items.filter(i => i[dataIndex].match(stateValue, 'gi'))
      : items

    const children = filtered.map(item => {
      const value = item[valueIndex]
      const data = item[dataIndex]
      return <Option key={value} value={value}>{data}</Option>
    })

    console.log('children', items);

    const empty = !children.length

    const item = items.find(item => item[valueIndex] === value)
    const data = item && item[dataIndex] || ''

    const inputValue = typeof stateValue === 'string'
      ? stateValue
      : data

    const inputProps = {
      disabled,
      error,
      floatingLabel,
      label,
      readOnly: disabled,
      ref: ref => this.input = ref,
      type: 'text',
      onChange: this.onTextfieldChange,
      value: inputValue,
    }
    if (!readOnly) {
      inputProps.onFocus = this.onTextfieldFocus
      inputProps.onBlur = this.onTextfieldBlur
    }

    const mainClass = classnames({
      'mdl-autocomplete': true,
      'mdl-autocomplete': true,
      'mdl-autocomplete--disabled': disabled,
      'mdl-autocomplete--empty': empty,
      'mdl-autocomplete--error': error,
      'mdl-autocomplete--focused': focused,
    }, className)

    if (disabled || readOnly || empty) {
      return (
        <div className={mainClass}>
          <Textfield {...inputProps}/>
          <i className={'mdl-autocomplete__arrow'}/>
        </div>
      )
    }

    const dropdownProps = {
      align,
      offset,
      target: <Textfield {...inputProps}/>,
      useTargetWidth: true,
      className: 'mdl-autocomplete-dropdown',
    }

    return (
      <div className={mainClass}>
        <Dropdown {...dropdownProps}>
          <OptionList value={value} onItemClick={this.onItemClick}>
            {children}
          </OptionList>
        </Dropdown>
        <i className={'mdl-autocomplete__arrow'}/>
      </div>
    )
  }

}
