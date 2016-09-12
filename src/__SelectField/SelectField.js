import React, { Component, Children, PropTypes } from 'react'
import { Textfield, Menu, Icon } from 'react-mdl'
import classnames from 'classnames'

import './SelectField.scss'

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

    // generate selectfield id
    this.id = `mdl-selectfield-${selectFieldIndex}`
    selectFieldIndex++

    // override material menu if needed
    // this needs to be done only once
    // and it needs to be done in the constructor
    // otherwise menu does not work properly
    if (!overrideApplied) applyOverride()

    // bind methods
    this.showMenu = this.showMenu.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
    this.onMenuItemClick = this.onMenuItemClick.bind(this)
    this.onTextfieldFocus = this.onTextfieldFocus.bind(this)
    this.onTextfieldBlur = this.onTextfieldBlur.bind(this)
    this.onTextfieldKeyDown = this.onTextfieldKeyDown.bind(this)
  }

  getInputNode() {
    return this.input.refs.input
  }

  getMenu() {
    return this.getMenuNode().MaterialMenu
  }

  getMenuNode() {
    if (!this.menuNode) {
      this.menuNode = document.querySelectorAll(`[data-mdl-for="${this.id}"]`)[0]
    }
    return this.menuNode
  }

  menuVisible() {
    return hasClass(this.getMenuNode().parentNode, 'is-visible')
  }

  showMenu() {
    const menu = this.getMenu()
    if (menuOpenCurrent && menu !== menuOpenCurrent) {
      menuOpenCurrent.hide()
      menuOpenCurrent = null
    }
    if (!this.menuVisible()) {
      menu.show()
      menuOpenCurrent = menu
    }
  }

  hideMenu() {
    this.getMenu().hide()
    menuOpenCurrent = false
  }

  onMenuItemClick(child) {
    const { value, onChange } = this.props
    if (value !== child.props.value) {
      if (onChange) onChange(child.props.value)
    }
    this.hideMenu()
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

    const mainClass = classnames('mdl-selectfield', {
      'mdl-selectfield--menu-below': showMenuBelow,
      'mdl-selectfield--floating-label': floatingLabel,
      'mdl-selectfield--empty': !children.length,
      'mdl-selectfield--error': error,
    }, className)

    const index = children.findIndex(c => c.props.value === value)
    const inputValue = index > -1 ? children[index].props.children : ''

    const inputProps = {
      id: this.id,
      className: menuSkipForClass,
      type: 'text',
      value: inputValue,
      error,
      label,
      floatingLabel,
      readOnly: true,
      ref: ref => this.input = ref,
    }

    if (!readOnly) {
      inputProps.onFocus = this.onTextfieldFocus
      inputProps.onBlur = this.onTextfieldBlur
      inputProps.onKeyDown = this.onTextfieldKeyDown
    }

    return (
      <div className={mainClass}>

        <Textfield {...inputProps}/>

        {!readOnly &&
          <Icon
            className={'mdl-selectfield__arrow'}
            name={`arrow_drop_${this.state.focused ? 'up' : 'down'}`}
            onClick={this.showMenu}
          />}

        {!readOnly &&
          <Menu target={this.id}>
            {children.map(child => {
              const className = classnames({
                'mdl-menu__item--selected': child.props.value === value,
                'mdl-menu__item--disabled': child.props.disabled,
              })
              return React.cloneElement(child, {
                className,
                onClick: () => this.onMenuItemClick(child),
              })
            })}
          </Menu>}

      </div>
    )
  }

}

/**
 * MDL v1 is hard to extend with react ...
 */

/**
 * Increment selectfield id for automatic menu target
 *
 * @type {Number}
 */
let selectFieldIndex = 0

/**
 * Has override been applied?
 *
 * @type {Boolean}
 */
let overrideApplied = false

/**
 * Currently open menu
 *
 * @type {Boolean|String}
 */
let menuOpenCurrent = false

/**
 * Skip menu for click class
 *
 * @type {String}
 */
const menuSkipForClass = 'mdl-menu--skip-for-click'

/**
 * Check if element has class
 *
 * @param  {HTMLElement} node
 * @param  {String}  cls
 * @return {Boolean}
 */
function hasClass(node, cls) {
    return (' ' + node.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

/**
 * Override MaterialMenu
 *
 * @see https://github.com/google/material-design-lite/issues/4450#issuecomment-228093633
 */
function applyOverride() {
  overrideApplied = true
  window.MaterialMenu.prototype.handleForClick_ = function(evt) {
    // START OVERRIDE
    if (hasClass(evt.target.parentNode, menuSkipForClass)) {
      evt.stopPropagation()
      evt.preventDefault()
      return false
    }
    // END OVERRIDE
    if (this.element_ && this.forElement_) {
      var rect = this.forElement_.getBoundingClientRect();
      var forRect = this.forElement_.parentElement.getBoundingClientRect();

      if (this.element_.classList.contains(this.CssClasses_.UNALIGNED)) {
        // Do not position the menu automatically. Requires the developer to
        // manually specify position.
      } else if (this.element_.classList.contains(
          this.CssClasses_.BOTTOM_RIGHT)) {
        // Position below the "for" element, aligned to its right.
        this.container_.style.right = (forRect.right - rect.right) + 'px';
        this.container_.style.top =
            this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
      } else if (this.element_.classList.contains(this.CssClasses_.TOP_LEFT)) {
        // Position above the "for" element, aligned to its left.
        this.container_.style.left = this.forElement_.offsetLeft + 'px';
        this.container_.style.bottom = (forRect.bottom - rect.top) + 'px';
      } else if (this.element_.classList.contains(this.CssClasses_.TOP_RIGHT)) {
        // Position above the "for" element, aligned to its right.
        this.container_.style.right = (forRect.right - rect.right) + 'px';
        this.container_.style.bottom = (forRect.bottom - rect.top) + 'px';
      } else {
        // Default: position below the "for" element, aligned to its left.
        this.container_.style.left = this.forElement_.offsetLeft + 'px';
        this.container_.style.top =
            this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px';
      }
    }

    this.toggle(evt);
  };
}
