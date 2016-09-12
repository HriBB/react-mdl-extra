import React, { PropTypes } from 'react'
import { MenuItem } from 'react-mdl'

const Option = props => {
  const { className, onClick, children } = props
  return (
    <MenuItem className={className} onClick={onClick}>
      {children || ''}
    </MenuItem>
  )
}

Option.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.string,
}

export default Option
