import { configure } from '@kadira/storybook';

import 'react-mdl/extra/material.js'
import 'react-mdl/extra/material.css'
import './storybook.scss'

function loadStories () {
  require('../stories/AutoComplete.story');
  require('../stories/Menu.story');
  require('../stories/MultiSelectField.story');
  require('../stories/SelectField.story');
  require('../stories/Stepper.story');
}

configure(loadStories, module);
