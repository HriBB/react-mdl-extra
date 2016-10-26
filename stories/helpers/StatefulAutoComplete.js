import React, { Component } from 'react'

import { AutoComplete } from '../../src'

export default class StatefulAutoComplete extends Component {

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
    const { value, ...props } = this.props
    const val = this.state.value || value
    return (
      <AutoComplete
        {...props}
        value={val}
        onChange={this.onChange}
      />
    )
  }

}
