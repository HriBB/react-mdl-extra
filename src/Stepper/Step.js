import React, { Children, PropTypes } from 'react' // eslint-disable-line no-unused-vars

const Step = props => {
  return Children.only(props.children)
}

Step.propTypes = {
  children: PropTypes.any.isRequired,
  onTitleClick: PropTypes.func,
  title: PropTypes.string,
}

export default Step
