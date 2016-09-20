import { configure } from '@kadira/storybook';

import 'normalize.css'
import 'react-mdl/extra/material.js'
import 'react-mdl/extra/material.css'
import './storybook.scss'

function loadStories () {
  require('../stories/Menu.story');
  require('../stories/SelectField.story');
  require('../stories/MultiSelectField.story');
}

configure(loadStories, module);
