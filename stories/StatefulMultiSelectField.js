import React, { Component } from 'react'

import { MultiSelectField } from '../src'

export default class StatefulMultiSelectField extends Component {

  constructor(props) {
    super(props)
    this.state = { value: null }
    this.defaultValue = []
    this.onChange = this.onChange.bind(this)
  }

  onChange(value) {
    this.setState({ value })
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    const { children, value, ...props } = this.props
    const val = this.state.value || value || this.defaultValue
    return (
      <MultiSelectField
        {...props}
        value={val}
        onChange={this.onChange}
      >
        {children}
      </MultiSelectField>
    )
  }

}
