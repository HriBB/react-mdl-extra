import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import faker from 'faker'

import { Button, IconButton } from 'react-mdl'

import { AutoComplete } from '../src'
import StatefulAutoComplete from './helpers/StatefulAutoComplete'

const items1 = [...Array(5).keys()].map(i => ({
  id: i+1,
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
}))

const items2 = [...Array(5).keys()].map(i => ({
  id: i+1,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
}))

const items3 = [...Array(45).keys()].map(i => ({
  id: i+1,
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
}))

storiesOf('AutoComplete', module)
  .add('default', () => (
    <StatefulAutoComplete
      label={'I will complete you'}
      items={items1}
      valueIndex={'id'}
      dataIndex={'name'}
    />
  ))
  .add('change handler', () => (
    <StatefulAutoComplete
      label={'I will complete you'}
      items={items1}
      valueIndex={'id'}
      dataIndex={'name'}
      onChange={value => alert(`Selected value: ${value}`)}
    />
  ))
  .add('preselected', () => (
    <StatefulAutoComplete
      label={'I will complete you'}
      items={items1}
      value={2}
      valueIndex={'id'}
      dataIndex={'name'}
    />
  ))
  .add('empty', () => (
    <StatefulAutoComplete
      label={'I will complete you'}
      items={[]}
      valueIndex={'id'}
      dataIndex={'name'}
    />
  ))
  .add('floating label', () => (
    <StatefulAutoComplete
      label={'I will complete you'}
      items={items1}
      valueIndex={'id'}
      dataIndex={'name'}
      floatingLabel
    />
  ))
  .add('read only', () => (
    <StatefulAutoComplete
      label={'I will complete you'}
      items={items1}
      valueIndex={'id'}
      dataIndex={'name'}
      readOnly
    />
  ))
  .add('disabled', () => (
    <StatefulAutoComplete
      label={'I will complete you'}
      items={items1}
      valueIndex={'id'}
      dataIndex={'name'}
      disabled
    />
  ))
  .add('lots of values', () => (
    <StatefulAutoComplete
      label={'I will complete you'}
      items={items3}
      value={33}
      valueIndex={'id'}
      dataIndex={'name'}
    />
  ))
  .add('error', () => (
    <StatefulAutoComplete
      label={'I will complete you'}
      items={items3}
      valueIndex={'id'}
      dataIndex={'name'}
      required
    />
  ))
