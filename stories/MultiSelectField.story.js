import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import faker from 'faker'

import { MultiSelectField, Option } from '../src'

storiesOf('MultiSelectField', module)
  .add('default', () => (
    <MultiSelectField label={'Select me many times'} value={[1,2]}>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </MultiSelectField>
  ))
