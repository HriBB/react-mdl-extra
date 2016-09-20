import React, { Component, Children, PropTypes } from 'react'
import { Textfield, Chip } from 'react-mdl'
import classnames from 'classnames'

import './MultiSelectField.scss'

import Dropdown from '../Dropdown'
import OptionList from '../SelectField/OptionList'

export default class MultiSelectField extends Component {

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    className: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    floatingLabel: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    showMenuBelow: PropTypes.bool,
    value: PropTypes.array,
  }

  constructor(props) {
    super(props)
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
    if (onFocus) onFocus(value)
  }

  onTextfieldBlur() {
    const { value, onBlur } = this.props
    if (onBlur) onBlur(value)
  }

  render() {
    const {
      className, error, floatingLabel, label, showMenuBelow, readOnly, value,
    } = this.props

    const children = Children.toArray(this.props.children)

    const mainClass = classnames('react-mdl-multiselectfield', {
      'react-mdl-multiselectfield--error': error,
    }, className)

    const chips = children
      .filter(c => value.indexOf(c.props.value) > -1)
      .map(c => ({ value: c.props.value, text: c.props.children }))

    /*
    const isValue = value !== undefined && value !== null && value !== ''
    const index = isValue && children.findIndex(c => c.props.value === value)
    const inputValue = isValue && index > -1 ? children[index].props.children : ''
    */

    const inputProps = {
      type: 'text',
      value: '',
      readOnly: true,
      ref: ref => this.input = ref,
    }

    console.log('value', value);
    console.log('chips', chips);

    /*
    if (!readOnly) {
      inputProps.onMouseDown = this.onTextfieldMouseDown
      inputProps.onFocus = this.onTextfieldFocus
      inputProps.onBlur = this.onTextfieldBlur
    }

    const offset = showMenuBelow ? [0, -20] : [0, -49]
    */

    return (
      <div className={mainClass}>

        <div className={''}>
          {chips.map(c =>
            <Chip key={c.value} onClose={e => console.log('close')}>{c.text}</Chip>
          )}
          <Dropdown target={<input {...inputProps}/>} offset={offset} useTargetWidth>
            <OptionList value={value} onItemClick={this.onItemClick}>
              {children}
            </OptionList>
          </Dropdown>

        </div>

      </div>
    )
  }

}
