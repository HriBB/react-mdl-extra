import React, { Component, Children, PropTypes } from 'react'
import { Textfield } from 'react-mdl'
import classnames from 'classnames'

import './SelectField.scss'

import Dropdown from '../Dropdown'
import OptionList from './OptionList'

export default class SelectField extends Component {

  static propTypes = {
    align: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    className: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    floatingLabel: PropTypes.bool,
    label: PropTypes.string.isRequired,
    offset: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    showMenuBelow: PropTypes.bool,
    talign: PropTypes.string,
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
      align, className, error, floatingLabel, label,
      offset, readOnly, talign, value,
    } = this.props

    const { focused } = this.state

    const children = Children.toArray(this.props.children)

    const mainClass = classnames({
      'mdl-selectfield': true,
      'mdl-selectfield--error': error,
      'mdl-selectfield--focused': focused,
    }, className)

    const isValue = value !== undefined && value !== null && value !== ''
    const index = isValue && children.findIndex(c => c.props.value === value)
    const inputValue = isValue && index > -1 ? children[index].props.children : ''

    const inputProps = {
      type: 'text',
      value: inputValue,
      error,
      label,
      floatingLabel,
      readOnly: true,
      ref: ref => this.input = ref,
    }
    if (!readOnly) {
      inputProps.onMouseDown = this.onTextfieldMouseDown
      inputProps.onFocus = this.onTextfieldFocus
      inputProps.onBlur = this.onTextfieldBlur
    }

    const dropdownProps = {
      align,
      offset,
      talign,
      target: <Textfield {...inputProps}/>,
      useTargetWidth: true,
    }

    return (
      <div className={mainClass}>

        {readOnly &&
          <Textfield {...inputProps}/>}

        {!readOnly &&
          <Dropdown {...dropdownProps}>
            <OptionList value={value} onItemClick={this.onItemClick}>
              {children}
            </OptionList>
          </Dropdown>}

        {!readOnly &&
          <i className={'mdl-selectfield__arrow'}/>}

      </div>
    )
  }

}
