import React, { Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Icon } from 'react-mdl'

import './Stepper.css'

const Stepper = props => {
  const { activeStep, horizontal, hideLastTitle, onStepTitleClick } = props
  const children = Children.toArray(props.children)
  const last = hideLastTitle && children.pop()
  const stepperClass = classnames('mdl-stepper', {
    'mdl-stepper--horizontal': horizontal,
    'mdl-stepper--vertical': !horizontal,
  })
  return (
    <div className={stepperClass}>
      <ul className={'mdl-stepper__steps'}>
        {children.map((child, index) => {
          const stepClass = classnames('mdl-stepper__step', {
            'mdl-stepper__step--active': index === activeStep,
            'mdl-stepper__step--completed': index < activeStep,
          })
          const wrapStyle = { cursor: onStepTitleClick ? 'pointer' : 'default' }
          return (
            <li className={stepClass} key={`${child.props.title}${index}`}>
              <div className={'mdl-stepper__title'} onClick={() => onStepTitleClick(index)}>
                <span className={'mdl-stepper__title-wrap'} style={wrapStyle}>
                  <span className={'mdl-stepper__title-text'}>
                    {child.props.title}
                  </span>
                  <span className={'mdl-stepper__title-icon'}>
                    {activeStep > index ? <Icon name={'check'}/> : (index+1)}
                  </span>
                </span>
              </div>
              <div className={'mdl-stepper__content'}>
                {child.props.children}
              </div>
            </li>
          )
        })}
      </ul>
      {hideLastTitle && activeStep === children.length &&
        <div className={'mdl-stepper__last'}>
          {last.props.children}
        </div>}
    </div>
  )
}

Stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired,
  hideLastTitle: PropTypes.bool,
  horizontal: PropTypes.bool,
  onStepTitleClick: PropTypes.func,
}

export default Stepper
