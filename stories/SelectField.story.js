import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import faker from 'faker'

import { SelectField, Option } from '../src'

import StatefulSelectField from './StatefulSelectField'

storiesOf('SelectField', module)
  .add('default', () => (
    <StatefulSelectField label={'Select me'}>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulSelectField>
  ))
  .add('preselected', () => (
    <StatefulSelectField label={'Select me'} value={2}>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulSelectField>
  ))
