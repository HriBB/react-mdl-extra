import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import faker from 'faker'

import { Button, IconButton } from 'react-mdl'

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
  .add('left/right top/bottom', () => {
    const styles = {
      center: {
        position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      },
      wrap: {
        //textAlign: 'center',
      },
      button: {
        margin: '10px',
        textTransform: 'none',
      },
    }
    return (
      <div style={styles.center}>
        <div style={styles.wrap}>
          <h4>align</h4>
          <p>
            Uses <a href="http://tether.io/">Tether</a> for positioning.
          </p>
          <p>
            <b>br-tr</b> attachment <b>bottom right</b> targetAttachment <b>top right</b><br />
            <b>bl-tl</b> attachment <b>bottom left</b> targetAttachment <b>top left</b>
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
            <b>tr-br</b> attachment <b>top right</b> targetAttachment <b>bottom right</b><br />
            <b>tl-bl</b> attachment <b>top left</b> targetAttachment <b>bottom left</b><br />
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
        position: 'absolute', top: '50%', left: '50%', width: '400px',
        marginLeft: '-200px', marginTop: '-20px',
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
            Menu is always constrained to the window.
          </p>
          <p>
            <b>tl-bl</b> attachment <b>top left</b> targetAttachment <b>bottom left</b><br />
          </p>
        </div>
        <div style={styles.bottomLeft}>
          <Menu target={<Button style={styles.button} raised>tl bl</Button>} align={'tl bl'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
        </div>
        <div style={styles.bottomRight}>
          <Menu target={<Button style={styles.button} raised>tl bl</Button>} align={'tl bl'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
        </div>
        <div style={styles.topLeft}>
          <Menu target={<Button style={styles.button} raised>tr br</Button>} align={'tr br'}>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
          </Menu>
        </div>
        <div style={styles.topRight}>
          <Menu target={<Button style={styles.button} raised>tr br</Button>} align={'tr br'}>
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
      span: { display: 'inline-block', margin: '0 10px' },
      button: { textTransform: 'none' },
    }
    return (
      <div style={styles.center}>
        <p style={styles.info}>
          Long menus are constrained to the viewport.<br /><br />
          Try scrolling up/down and opening menu.
        </p>
        <div style={styles.buttons}>
          <p><b>Normal Menu</b></p>
          <span style={styles.span}>
            <Menu target={<Button raised style={styles.button}>br tr</Button>} align={'br tr'}>
              {smallMenuItems}
            </Menu>
          </span>
          <span style={styles.span}>
            <Menu target={<Button raised style={styles.button}>tl bl</Button>} align={'tl bl'}>
              {smallMenuItems}
            </Menu>
          </span>
          <br /><br /><br />
          <p><b>Big Menu</b></p>
          <span style={styles.span}>
            <Menu target={<Button raised style={styles.button}>tl tl</Button>} align={'tl tl'}>
              {bigMenuItems}
            </Menu>
          </span>
          <span style={styles.span}>
            <Menu target={<Button raised style={styles.button}>tr tr</Button>} align={'tr tr'}>
              {bigMenuItems}
            </Menu>
          </span>
          <br /><br /><br />
          <span style={styles.span}>
            <Menu target={<Button raised style={styles.button}>bl bl</Button>} align={'bl bl'}>
              {bigMenuItems}
            </Menu>
          </span>
          <span style={styles.span}>
            <Menu target={<Button raised style={styles.button}>br br</Button>} align={'br br'}>
              {bigMenuItems}
            </Menu>
          </span>
          <br /><br /><br />
          <span style={styles.span}>
            <Menu target={<Button raised style={styles.button}>tl bl</Button>} align={'tl bl'}>
              {bigMenuItems}
            </Menu>
          </span>
          <span style={styles.span}>
            <Menu target={<Button raised style={styles.button}>tr br</Button>} align={'tr br'}>
              {bigMenuItems}
            </Menu>
          </span>
          <br /><br /><br />
          <span style={styles.span}>
            <Menu target={<Button raised style={styles.button}>bl tl</Button>} align={'bl tl'}>
              {bigMenuItems}
            </Menu>
          </span>
          <span style={styles.span}>
            <Menu target={<Button raised style={styles.button}>br tr</Button>} align={'br tr'}>
              {bigMenuItems}
            </Menu>
          </span>
          <br /><br /><br />
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
