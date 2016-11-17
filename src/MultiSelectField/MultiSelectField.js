import React, { Component, Children, PropTypes } from 'react'
import { Chip } from 'react-mdl'
import classnames from 'classnames'

import Dropdown from '../Dropdown'
import OptionList from '../OptionList'
import Option from '../Option'

import './MultiSelectField.scss'

export default class MultiSelectField extends Component {

  static propTypes = {
    align: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    className: PropTypes.string,
    chipsAfter: PropTypes.bool,
    chipsOutside: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    //floatingLabel: PropTypes.bool,
    label: PropTypes.string.isRequired,
    offset: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    showChipsBelow: PropTypes.bool,
    value: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = { focused: false }
    this.onItemClick = this.onItemClick.bind(this)
    this.onTextfieldFocus = this.onTextfieldFocus.bind(this)
    this.onTextfieldBlur = this.onTextfieldBlur.bind(this)
    this.onChipClose = this.onChipClose.bind(this)
    if (props.showChipsBelow) {
      // eslint-disable-next-line no-console
      console.warn('Prop showChipsBelow is deprecated! Use chipsBelow instead.')
    }
  }

  onItemClick(val) {
    const { value, onChange } = this.props
    if (value.indexOf(val) === -1) {
      if (onChange) onChange([...value,val])
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

  onChipClose(val) {
    const { value, onChange } = this.props
    const index = value.indexOf(val)
    if (index > -1) {
      if (onChange) onChange([...value.slice(0,index), ...value.slice(index+1)])
    }
  }

  render() {
    const {
      align, className, chipsAfter, chipsOutside, showChipsBelow,// eslint-disable-line no-unused-vars
      error, label, offset, readOnly, value,
    } = this.props

    const { focused } = this.state

    const allChildren = Children.toArray(this.props.children)

    const children = allChildren
      .filter(c => value && value.indexOf(c.props.value) === -1)

    const options = children.length ? children : <Option disabled>Empty</Option>

    const chips = value
      .map(v => allChildren.find(c => c.props.value === v))
      .map(({props}) => (
        <Chip key={props.value} onClose={() => this.onChipClose(props.value)}>
          {props.children}
        </Chip>
      ))

    const inputProps = {
      type: 'text',
      value: '',
      readOnly: true,
      ref: ref => this.input = ref,
    }
    if (!readOnly) {
      inputProps.onMouseDown = this.onTextfieldMouseDown
      inputProps.onFocus = this.onTextfieldFocus
      inputProps.onBlur = this.onTextfieldBlur
    }

    const input = (
      <div className={'mdl-multiselect__textfield'}>
        <input className={'mdl-multiselect__input'} {...inputProps}/>
        <label className={'mdl-multiselect__label'}>{label}</label>
        <i className={'mdl-multiselect__arrow'}/>
      </div>
    )

    const dropdownProps = {
      align,
      offset,
      target: input,
      targetNode: this.container,
      useTargetWidth: true,
      useTargetMinHeight: !chipsOutside,
    }

    const mainClass = classnames('mdl-multiselect', {
      'mdl-multiselect--error': error,
      'mdl-multiselect--focused': focused,
      'mdl-multiselect--chips-after': chipsAfter,
      'mdl-multiselect--chips-outside': chipsOutside,
    }, className)

    return (
      <div className={mainClass}>

        {chipsOutside && !chipsAfter &&
          <div className={'mdl-multiselect__chips'}>{chips}</div>}

        <div className={'mdl-multiselect__container'} ref={ref => this.container = ref}>

          {!chipsOutside && !chipsAfter && chips}

          <Dropdown {...dropdownProps}>
            <OptionList value={value} onItemClick={this.onItemClick}>
              {options}
            </OptionList>
          </Dropdown>

          {!chipsOutside && chipsAfter && chips}

        </div>

        {error &&
          <span className={'mdl-textfield__error'}>{error}</span>}

        {chipsOutside && chipsAfter &&
          <div className={'mdl-multiselect__chips'}>{chips}</div>}

      </div>
    )
  }

}
