import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { MultiSelectField, Option } from '../src';

storiesOf('MultiSelectField', module)
  .add('default', () => (
    <div>
      <MultiSelectField label={'Select me many times'}>
        <Option value={1}>Value One</Option>
        <Option value={2}>Value Two</Option>
        <Option value={3}>Value Three</Option>
        <Option value={4}>Value Four</Option>
        <Option value={5}>Value Five</Option>
      </MultiSelectField>
      <p style={{width:'300px'}}>
        MultiSelectField in examples is stateless and wont work as expected. Update coming soon ;)
      </p>
    </div>
  ))
  .add('preselected', () => (
    <MultiSelectField label={'Select me many times'} value={[2,4]}>
      <Option value={1}>Value One</Option>
      <Option value={2}>Value Two</Option>
      <Option value={3}>Value Three</Option>
      <Option value={4}>Value Four</Option>
      <Option value={5}>Value Five</Option>
    </MultiSelectField>
  ))
  .add('read only', () => (
    <MultiSelectField label={'Cannot select me'} readOnly value={[1,3,5]}>
      <Option value={1}>Value One</Option>
      <Option value={2}>Value Two</Option>
      <Option value={3}>Value Three</Option>
      <Option value={4}>Value Four</Option>
      <Option value={5}>Value Five</Option>
    </MultiSelectField>
  ))
  .add('change handler', () => (
    <MultiSelectField label={'Select me many times'} value={[3]} onChange={value => console.log('value', value)}>
      <Option value={1}>Value One</Option>
      <Option value={2}>Value Two</Option>
      <Option value={3}>Value Three</Option>
      <Option value={4}>Value Four</Option>
      <Option value={5}>Value Five</Option>
    </MultiSelectField>
  ))
  .add('error', () => (
    <MultiSelectField label={'Select me many times'} error={'Please select some values'}>
      <Option value={1}>Value One</Option>
      <Option value={2}>Value Two</Option>
      <Option value={3}>Value Three</Option>
      <Option value={4}>Value Four</Option>
      <Option value={5}>Value Five</Option>
    </MultiSelectField>
  ));
