import React, { Children } from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

const Step = props => {
  return Children.only(props.children)
}

Step.propTypes = {
  children: PropTypes.any.isRequired,
  onTitleClick: PropTypes.func,
  title: PropTypes.string,
}

export default Step
