import React, { Component, Children, PropTypes } from 'react'
import classnames from 'classnames'

import './MultiSelectField.scss'

import SelectField from '../SelectField/SelectField'
import Tag from './Tag'

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
    value: PropTypes.array,
  }

  static defaultProps = {
    value: [],
  }

  constructor(props) {
    super(props)

    // bind event handlers
    this.onSelectFocus = this.onSelectFocus.bind(this)
    this.onSelectBlur = this.onSelectBlur.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
    this.onTagClick = this.onTagClick.bind(this)
  }

  onSelectFocus() {
    const { value, onFocus } = this.props
    if (onFocus) onFocus(value)
  }

  onSelectBlur() {
    const { value, onBlur } = this.props
    if (onBlur) onBlur(value)
  }

  onSelectChange(val) {
    const { value, onChange } = this.props
    if (value.indexOf(val) === -1) {
      const newValue = value.concat([val])
      if (onChange) onChange(newValue)
    }
  }

  onTagClick(val) {
    const { value, onChange } = this.props
    const newValue = value.filter(v => v !== val)
    if (onChange) onChange(newValue)
  }

  render() {
    const {
      className, error, floatingLabel, label, readOnly, value,
    } = this.props

    const children = Children.toArray(this.props.children)

    const mainClass = classnames('mdl-multiselectfield', className)

    const tags = value.map(val => {
      const index = children.findIndex(c => c.props.value === val)
      const child = children[index]
      return {
        value: child.props.value,
        text: child.props.children,
      }
    })

    const options = children.filter(c => value.indexOf(c.props.value) === -1)

    return (
      <div className={mainClass}>

        <SelectField
          floatingLabel={floatingLabel}
          label={label}
          error={error}
          readOnly={readOnly}
          onFocus={this.onSelectFocus}
          onBlur={this.onSelectBlur}
          onChange={this.onSelectChange}
        >
          {options}
        </SelectField>

        <div className={'mdl-taglist'}>
          {tags.map(tag =>
            <Tag
              key={tag.value}
              value={tag.value}
              text={tag.text}
              readOnly={readOnly}
              remove={this.onTagClick}
            />
          )}
        </div>
      </div>
    )
  }

}
