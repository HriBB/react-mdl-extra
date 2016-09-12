import React, { Component } from 'react'

import { SelectField } from '../src'

export default class StatefulSelectField extends Component {

  constructor(props) {
    super(props)
    this.state = { value: null }
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
    const val = this.state.value || value
    return (
      <SelectField
        {...props}
        value={val}
        onChange={this.onChange}
      >
        {children}
      </SelectField>
    )
  }

}
