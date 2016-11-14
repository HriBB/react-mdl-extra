import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import faker from 'faker'

import { Card, Button, IconButton } from 'react-mdl'

import { Menu, MenuItem } from '../src'

const bigMenuItems = [...Array(35).keys()].map(i =>
  <MenuItem key={i}>Menu Item {i}</MenuItem>
)

const smallMenuItems = [...Array(3).keys()].map(i =>
  <MenuItem key={i}>Menu Item {i}</MenuItem>
)

storiesOf('Menu', module)
  .add('default', () => (
    <Menu target={<Button raised>Open menu</Button>} align={'tl bl'}>
      <MenuItem onClick={() => console.log('select one')}>One</MenuItem>
      <MenuItem onClick={() => console.log('select two')}>Two</MenuItem>
      <MenuItem onClick={() => console.log('select three')}>Three</MenuItem>
    </Menu>
  ))
  .add('position', () => {
    const styles = {
      center: {
        position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      },
      wrap: {},
      button: { margin: '10px', textTransform: 'none' },
    }
    return (
      <div style={styles.center}>
        <div style={styles.wrap}>
          <h4>align</h4>
          <p>
            Uses <a href="http://tether.io/">Tether</a> for positioning.
          </p>
          <p>
            <b>br tr</b> attach <b>bottom right</b> corner of the dropdown to the <b>top right</b> corner of the button<br />
            <b>bl tl</b> attach <b>bottom left</b> corner of the dropdown to the <b>top left</b> corner of the button<br />
          </p>
          <Menu target={<Button raised style={styles.button}>br tr</Button>} align={'br tr'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
          <Menu target={<Button raised style={styles.button}>bl tl</Button>} align={'bl tl'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
          <br />
          <Menu target={<Button raised style={styles.button}>tr br</Button>} align={'tr br'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
          <Menu target={<Button raised style={styles.button}>tl bl</Button>} align={'tl bl'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
          <p>
            <br />
            <b>tr br</b> attach <b>top right</b> corner of the dropdown to the <b>bottom right</b> corner of the button<br />
            <b>tl bl</b> attach <b>top left</b> corner of the dropdown to the <b>bottom left</b> corner of the button<br />
          </p>
        </div>
      </div>
    )
  })
  .add('constrain to viewport', () => {
    const styles = {
      bottomLeft: { position: 'absolute', bottom: '10px', left: '10px' },
      bottomRight: { position: 'absolute', bottom: '10px', right: '10px' },
      topLeft: { position: 'absolute', top: '10px', left: '10px' },
      topRight: { position: 'absolute', top: '10px', right: '10px' },
      options: { padding: '0 10px' },
      center: {
        position: 'absolute', top: '50%', left: '50%', width: '300px',
        marginLeft: '-150px', marginTop: '-20px',
        textAlign: 'center', lineHeight: '24px',
      },
      button: {
        textTransform: 'none',
      },
    }
    return (
      <div>
        <div style={styles.center}>
          <p>
            Menu is always constrained to the viewport.
          </p>
        </div>
        <div style={styles.topLeft}>
          <Menu target={<Button style={styles.button} raised>br tr</Button>} align={'br tr'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
          <br /><br />
          <Menu target={<Button style={styles.button} raised>tr bl</Button>} align={'tr bl'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
        </div>
        <div style={styles.topRight}>
          <Menu target={<Button style={styles.button} raised>bl tl</Button>} align={'bl tl'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
          <br /><br />
          <Menu target={<Button style={styles.button} raised>tl br</Button>} align={'tl br'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
        </div>
        <div style={styles.bottomLeft}>
          <Menu target={<Button style={styles.button} raised>tr bl</Button>} align={'tr bl'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
          <br /><br />
          <Menu target={<Button style={styles.button} raised>tr br</Button>} align={'tr br'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
        </div>
        <div style={styles.bottomRight}>
          <Menu target={<Button style={styles.button} raised>tl br</Button>} align={'tl br'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
          <br /><br />
          <Menu target={<Button style={styles.button} raised>tl bl</Button>} align={'tl bl'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
        </div>
      </div>
    )
  })
  .add('constrain menu height', () => {
    const styles = {
      center: { margin: '0 auto', textAlign: 'center' },
      info: { margin: '40px auto', maxWidth: '400px', lineHeight: '24px' },
      buttons: { margin: '300px 0 1000px 0' },
      button: { margin: '0 10px', minWidth: '80px', textTransform: 'none' },
    }
    return (
      <div style={styles.center}>
        <p style={styles.info}>
          Long menus are constrained to the viewport.<br /><br />
          Try scrolling up/down and opening menu.
        </p>
        <div style={styles.buttons}>
          <p><b>Normal Menu</b></p>
          <Menu target={<Button raised style={styles.button}>br tr</Button>} align={'br tr'}>
            {smallMenuItems}
          </Menu>
          <Menu target={<Button raised style={styles.button}>bl tl</Button>} align={'bl tl'}>
            {smallMenuItems}
          </Menu>
          <br /><br /><br />
          <Menu target={<Button raised style={styles.button}>tr br</Button>} align={'tr br'}>
            {smallMenuItems}
          </Menu>
          <Menu target={<Button raised style={styles.button}>tl bl</Button>} align={'tl bl'}>
            {smallMenuItems}
          </Menu>
          <br /><br /><br />
          <p><b>Big Menu</b></p>
          <Menu target={<Button raised style={styles.button}>br tr</Button>} align={'br tr'}>
            {bigMenuItems}
          </Menu>
          <Menu target={<Button raised style={styles.button}>bl tl</Button>} align={'bl tl'}>
            {bigMenuItems}
          </Menu>
          <br /><br /><br />
          <Menu target={<Button raised style={styles.button}>tr br</Button>} align={'tr br'}>
            {bigMenuItems}
          </Menu>
          <Menu target={<Button raised style={styles.button}>tl bl</Button>} align={'tl bl'}>
            {bigMenuItems}
          </Menu>
          <br /><br /><br />
          <Menu target={<Button raised style={styles.button}>tr mc</Button>} align={'tr mc'}>
            {bigMenuItems}
          </Menu>
          <Menu target={<Button raised style={styles.button}>tl mc</Button>} align={'tl mc'}>
            {bigMenuItems}
          </Menu>
          <br /><br /><br />
          <Menu target={<Button raised style={styles.button}>mr ml</Button>} align={'mr ml'}>
            {bigMenuItems}
          </Menu>
          <Menu target={<Button raised style={styles.button}>ml mr</Button>} align={'ml mr'}>
            {bigMenuItems}
          </Menu>
        </div>
      </div>

    )
  })
  .add('parent with overflow hidden', () => {
    const styles = {
      image: { width: '100%' },
      icon: { position: 'absolute', top: '20px', right: '20px', color: '#fff' },
    }
    return (
        <Card style={styles.card} shadow={0}>
          <img style={styles.image} src={require('./helpers/fashion.jpg')} alt={''}/>
          <Menu target={<IconButton style={styles.icon} name={'more_vert'}/>} align={'tr br'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
            <MenuItem>I</MenuItem>
            <MenuItem>Am</MenuItem>
            <MenuItem>Free</MenuItem>
          </Menu>
        </Card>
    )
  })
