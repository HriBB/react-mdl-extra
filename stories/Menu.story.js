import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import faker from 'faker'

import { Button, IconButton } from 'react-mdl'

import { Menu, MenuItem } from '../src'

storiesOf('Menu', module)
  .add('default', () => (
    <Menu target={<Button raised>Open menu</Button>} align={'top left'} talign={'bottom left'}>
      <MenuItem onClick={() => console.log('select one')}>One</MenuItem>
      <MenuItem onClick={() => console.log('select two')}>Two</MenuItem>
      <MenuItem onClick={() => console.log('select three')}>Three</MenuItem>
    </Menu>
  ))
  .add('left/right top/bottom', () => {
    const styles = {
      center: {
        position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      },
      wrap: {
        textAlign: 'center',
      },
      button: {
        margin: '10px',
      },
    }
    return (
      <div style={styles.center}>
        <div style={styles.wrap}>
          <Menu target={<Button raised style={styles.button}>a=br t=tr</Button>} align={'bottom right'} talign={'top right'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
          <Menu target={<Button raised style={styles.button}>a=bl t=tl</Button>} align={'bottom left'} talign={'top left'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
          <br />
          <Menu target={<Button raised style={styles.button}>a=tr t=br</Button>} align={'top right'} talign={'bottom right'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
          <Menu target={<Button raised style={styles.button}>a=tl t=bl</Button>} align={'top left'} talign={'bottom left'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
        </div>
      </div>
    )
  })
  .add('constrain to viewport', () => {
    const styles = {
      bottomLeft: { position: 'absolute', bottom: '20px', left: '20px' },
      bottomRight: { position: 'absolute', bottom: '20px', right: '20px' },
      topLeft: { position: 'absolute', top: '20px', left: '20px' },
      topRight: { position: 'absolute', top: '20px', right: '20px' },
      options: { padding: '0 10px' },
      center: {
        position: 'absolute', top: '50%', left: '50%', width: '400px',
        marginLeft: '-200px', marginTop: '-20px',
        textAlign: 'center', lineHeight: '24px',
      },
    }
    return (
      <div>
        <div style={styles.center}>
          Menu is always constrained to the viewport,<br />
          Even if "valign" and "align" are set.
        </div>
        <div style={styles.bottomLeft}>
          <Menu target={<Button raised>a=tl t=bl</Button>} align={'top right'} talign={'bottom right'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
        </div>
        <div style={styles.bottomRight}>
          <Menu target={<Button raised>a=tr t=br</Button>} align={'top left'} talign={'bottom left'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
        </div>
        <div style={styles.topLeft}>
          <Menu target={<Button raised>a=bl t=tl</Button>} align={'bottom right'} talign={'top right'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
        </div>
        <div style={styles.topRight}>
          <Menu target={<Button raised>a=br t=tr</Button>} align={'bottom left'} talign={'top left'}>
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
      buttons: { margin: '200px 0 1000px 0' },
      button: { margin: '0 10px' }
    }
    return (
      <div style={styles.center}>
        <p style={styles.info}>
          Long menus are constrained to the viewport.<br />
          Menu will always be shown above or below,<br />
          depending on which area has more space.<br /><br />
          Try scrolling up/down and opening menu.
        </p>
        <div style={styles.buttons}>
          <p>Normal Menu</p>
          <Menu target={<Button raised style={styles.button}>a=bl t=tl</Button>} align={'bottom right'} talign={'top right'}>
            {[...Array(3).keys()].map(i =>
              <MenuItem key={i}>Menu Item {i}</MenuItem>
            )}
          </Menu>
          <Menu target={<Button raised style={styles.button}>a=tl t=bl</Button>} align={'top left'} talign={'bottom left'}>
            {[...Array(3).keys()].map(i =>
              <MenuItem key={i}>Menu Item {i}</MenuItem>
            )}
          </Menu>
          <br /><br />
          <p>Big Menu</p>
          <Menu target={<Button raised style={styles.button}>a=br t=tr</Button>} align={'bottom right'} talign={'top right'}>
            {[...Array(15).keys()].map(i =>
              <MenuItem key={i}>Menu Item {i}</MenuItem>
            )}
          </Menu>
          <Menu target={<Button raised style={styles.button}>a=tl t=bl</Button>} align={'top left'} talign={'bottom left'}>
            {[...Array(15).keys()].map(i =>
              <MenuItem key={i}>Menu Item {i}</MenuItem>
            )}
          </Menu>
        </div>
      </div>

    )
  })
  /*
  .add('parent with hidden overflow', () => {
    const styles = {
      div: { margin: '0 auto', textAlign: 'center' },
      card: { margin: '50px 0 0 0' },
      image: { width: '240px' },
    }
    return (
      <div style={styles.div}>
        <Card style={styles.card}>
          <Image style={styles.image} src={require('./fashion.jpg')} alt={''}>
            <Menu target={<IconButton name={'more_vert'}/>}>
              <MenuItem>One</MenuItem>
              <MenuItem>Two</MenuItem>
              <MenuItem>Three</MenuItem>
              <MenuItem>I</MenuItem>
              <MenuItem>Am</MenuItem>
              <MenuItem>Free</MenuItem>
            </Menu>
          </Image>
        </Card>
      </div>
    )
  })
  */
