import React, { PropTypes } from 'react'
import { Button, Icon } from 'react-mdl'

const Tag = props => {
  const { value, text, readOnly, remove } = props
  const buttonProps = {
    raised: true,
  }
  if (!readOnly) {
    buttonProps.onClick = () => remove(value)
  }
  return (
    <Button {...buttonProps}>
      {text}
      {!readOnly && <Icon name={'clear'}/>}
    </Button>
  )
}

Tag.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
}

export default Tag
