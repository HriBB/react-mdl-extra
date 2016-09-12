import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import faker from 'faker'

import { SelectField, Option } from '../src';

storiesOf('SelectField', module)
  .add('default', () => (
    <div>
      <SelectField label={'Select me'}>
        <Option value={1}>One</Option>
        <Option value={2}>Two</Option>
        <Option value={3}>Three</Option>
        <Option value={4}>Four</Option>
        <Option value={5}>Five</Option>
      </SelectField>
      <p style={{width:'300px'}}>
        SelectField in examples is stateless and wont work as expected. Update coming soon ;)
      </p>
    </div>
  ))
  .add('preselected', () => (
    <SelectField label={'Select me'} value={1}>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </SelectField>
  ))
  .add('menu below', () => (
    <SelectField label={'Select me'} value={1} showMenuBelow>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </SelectField>
  ))
  .add('read only', () => (
    <SelectField label={'Select me'} readOnly value={3}>
    <Option value={1}>One</Option>
    <Option value={2}>Two</Option>
    <Option value={3}>Three</Option>
    <Option value={4}>Four</Option>
    <Option value={5}>Five</Option>
    </SelectField>
  ))
  .add('empty option', () => (
    <SelectField label={'Select me'}>
      <Option value={''} disabled>-- Select value --</Option>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </SelectField>
  ))
  .add('floating label', () => (
    <SelectField label={'Select me'} floatingLabel>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </SelectField>
  ))
  .add('lots of values', () => (
    <SelectField label={'Select me'} editable>
      {[...Array(45).keys()].map(i =>
        <Option key={i} value={i}>
          {`${faker.name.firstName()} ${faker.name.lastName()}`}
        </Option>
      )}
    </SelectField>
  ))
  .add('error', () => (
    <SelectField label={'Select me'} error={'Invalid value!'}>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </SelectField>
  ))
  .add('change handler', () => (
    <SelectField label={'Select me'} onChange={value => console.log('value', value)}>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </SelectField>
  ))
  .add('multiple fields', () => (
    <div>
      <SelectField label={'Select field #1'}>
        <Option value={1}>One</Option>
        <Option value={2}>Two</Option>
        <Option value={3}>Three</Option>
        <Option value={4}>Four</Option>
        <Option value={5}>Five</Option>
      </SelectField>
      <SelectField label={'Select field #2'}>
        <Option value={1}>One</Option>
        <Option value={2}>Two</Option>
        <Option value={3}>Three</Option>
        <Option value={4}>Four</Option>
        <Option value={5}>Five</Option>
      </SelectField>
    </div>
  ));
