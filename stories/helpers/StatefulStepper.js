import React, { Children, Component } from 'react'

import { Button, Textfield } from 'react-mdl'

import { Stepper, Step } from '../../src'

const styles = {
  content: {
    display: 'flex', flex: '1', flexDirection: 'column',
  },
  buttons: {
    display: 'flex', flexDirection: 'row', justifyContent: 'flex-end',
    marginTop: '20px',
  },
}

export default class StatefulStepper extends Component {

  constructor(props) {
    super(props)
    this.state = { activeStep: null, max: 0 }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.restart = this.restart.bind(this)
    this.onStepTitleClick = this.onStepTitleClick.bind(this)
  }

  nextStep() {
    let activeStep = this.state.activeStep
    if (!activeStep) {
      activeStep = this.props.activeStep || 0
    }
    activeStep++
    let max = this.state.max
    if (activeStep > max) {
      max = activeStep
    }
    this.setState({
      activeStep,
      max,
    })
  }

  previousStep() {
    if (!this.state.activeStep) {
      const activeStep = this.props.activeStep || 0
      this.setState({ activeStep: activeStep - 1 })
    } else {
      this.setState({ activeStep: this.state.activeStep - 1 })
    }
  }

  restart() {
    this.setState({ activeStep: 0 })
  }

  onStepTitleClick(index) {
    const { onStepTitleClick } = this.props
    if (index <= this.state.max) {
      this.setState({ activeStep: index })
    }
    if (onStepTitleClick) {
      onStepTitleClick(index)
    }
  }

  render() {
    const activeStep = this.state.activeStep || this.props.activeStep || 0
    const children = Children.toArray(this.props.children)
    const len = children.length - 1
    const showPrev = activeStep > 0 && activeStep < len
    const showNext = activeStep < len
    const showLast = activeStep === len
    const stepperProps = {
      activeStep,
      onStepTitleClick: this.onStepTitleClick,
    }
    return (
      <Stepper {...this.props} {...stepperProps}>
        {children.map((child, index) => (
          <Step {...child.props} key={`${child.props.title || 'step'}-${index}`}>
            <div style={styles.content}>
              {child.props.children}
              <div style={styles.buttons}>
                {showPrev && <Button onClick={this.previousStep}>Prev</Button>}
                {showNext && <Button primary onClick={this.nextStep}>Next</Button>}
                {showLast && <Button onClick={this.restart}>Restart</Button>}
                {showLast && <Button primary>Finish</Button>}
              </div>
            </div>
          </Step>
        ))}
      </Stepper>
    )
  }

}
