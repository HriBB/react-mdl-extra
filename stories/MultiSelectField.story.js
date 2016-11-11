import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import faker from 'faker'

import { MultiSelectField, Option } from '../src'

import StatefulMultiSelectField from './helpers/StatefulMultiSelectField'

storiesOf('MultiSelectField', module)
  .add('default', () => (
    <StatefulMultiSelectField label={'Select me many times'}>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulMultiSelectField>
  ))
  .add('preselected', () => (
    <StatefulMultiSelectField label={'Select me many times'} value={[1,2,3]}>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulMultiSelectField>
  ))
  .add('show chips inside before input (default)', () => (
    <StatefulMultiSelectField label={'Select me many times'} value={[1,2,3]}>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulMultiSelectField>
  ))
  .add('show chips inside after input', () => (
    <StatefulMultiSelectField label={'Select me many times'} value={[1,2,3]} chipsAfter>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulMultiSelectField>
  ))
  .add('show chips outside before input', () => (
    <StatefulMultiSelectField label={'Select me many times'} value={[1,2,3]} chipsOutside>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulMultiSelectField>
  ))
  .add('show chips outside after input', () => (
    <StatefulMultiSelectField label={'Select me many times'} value={[1,2,3]} chipsOutside chipsAfter>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulMultiSelectField>
  ))
  .add('zero value', () => (
    <StatefulMultiSelectField label={'Select me many times'} value={[0]}>
      <Option value={0}>Zero</Option>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulMultiSelectField>
  ))
  .add('change handler', () => (
    <StatefulMultiSelectField label={'Select me many times'} onChange={val => console.log(val)}>
      <Option value={0}>Zero</Option>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulMultiSelectField>
  ))
  .add('lots of values', () => (
    <StatefulMultiSelectField label={'Select me many times'} editable>
      {[...Array(45).keys()].map(i =>
        <Option key={i} value={i}>
          {`${faker.name.firstName()} ${faker.name.lastName()}`}
        </Option>
      )}
    </StatefulMultiSelectField>
  ))
  .add('error', () => (
    <StatefulMultiSelectField label={'Select me many times'} required>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulMultiSelectField>
  ))
