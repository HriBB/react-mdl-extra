import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import faker from 'faker'

import { Textfield } from 'react-mdl'

import { Stepper, Step } from '../src'
import StatefulStepper from './helpers/StatefulStepper'

const styles = {
  content: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    flex: '1', background: '#eee', borderRadius: '2px',
  },
}

storiesOf('Stepper', module)
  .add('default', () => (
    <StatefulStepper>
      <Step title={'Title of step 1'}>
        <div style={styles.content}>
          <h1>Step 1</h1>
        </div>
      </Step>
      <Step title={'Title of step 2 is very long'}>
        <div style={styles.content}>
          <h1>Step 2</h1>
        </div>
      </Step>
      <Step title={'Title of step 3'}>
        <div style={styles.content}>
          <h1>Step 3</h1>
        </div>
      </Step>
    </StatefulStepper>
  ))
  .add('horizontal', () => (
    <StatefulStepper horizontal>
      <Step title={'Title of step 1'}>
        <div style={styles.content}>
          <h1>Step 1</h1>
        </div>
      </Step>
      <Step title={'Title of step 2 is very long'}>
        <div style={styles.content}>
          <h1>Step 2</h1>
        </div>
      </Step>
      <Step title={'Title of step 3'}>
        <div style={styles.content}>
          <h1>Step 3</h1>
        </div>
      </Step>
    </StatefulStepper>
  ))
  .add('onStepTitleClick', () => (
    <StatefulStepper horizontal onStepTitleClick={index => console.log('click', index)}>
      <Step title={'Title of step 1'}>
        <div style={styles.content}>
          <h1>Step 1</h1>
        </div>
      </Step>
      <Step title={'Title of step 2 is very long'}>
        <div style={styles.content}>
          <h1>Step 2</h1>
        </div>
      </Step>
      <Step title={'Title of step 3'}>
        <div style={styles.content}>
          <h1>Step 3</h1>
        </div>
      </Step>
    </StatefulStepper>
  ))
  .add('hideLastTitle', () => (
    <StatefulStepper hideLastTitle horizontal>
      <Step title={'Title of step 1'}>
        <div style={styles.content}>
          <h1>Step 1</h1>
        </div>
      </Step>
      <Step title={'Title of step 2 is very long'}>
        <div style={styles.content}>
          <h1>Step 2</h1>
        </div>
      </Step>
      <Step title={'Title of step 3'}>
        <div style={styles.content}>
          <h1>Step 3</h1>
        </div>
      </Step>
      <Step last>
        <div style={styles.content}>
          <h1>Done!</h1>
        </div>
      </Step>
    </StatefulStepper>
  ))
