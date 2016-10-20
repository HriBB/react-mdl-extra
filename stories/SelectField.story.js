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
  .add('change handler', () => (
    <StatefulSelectField label={'Select me'} onChange={value => alert(`Selected value: ${value}`)}>
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
  .add('zero value', () => (
    <StatefulSelectField label={'Select me'} value={0}>
      <Option value={0}>Zero</Option>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulSelectField>
  ))
  .add('floating label', () => (
    <StatefulSelectField label={'Select me'} floatingLabel>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulSelectField>
  ))
  .add('show menu below', () => (
    <StatefulSelectField label={'Select me'} value={1} showMenuBelow>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulSelectField>
  ))
  .add('read only', () => (
    <StatefulSelectField label={'Select me'} value={3} readOnly>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulSelectField>
  ))
  .add('empty option', () => (
    <StatefulSelectField label={'Select me'}>
      <Option value={undefined} disabled>-- Select value --</Option>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulSelectField>
  ))
  .add('lots of values', () => (
    <StatefulSelectField label={'Select me'} editable>
      {[...Array(45).keys()].map(i =>
        <Option key={i} value={i}>
          {`${faker.name.firstName()} ${faker.name.lastName()}`}
        </Option>
      )}
    </StatefulSelectField>
  ))
  .add('error', () => (
    <StatefulSelectField label={'Select me'} required>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </StatefulSelectField>
  ))
