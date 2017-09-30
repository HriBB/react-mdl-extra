# React-MDL SelectField

**This project is not maintained anymore. If someone wishes to take over, let me know ;)**

Extra components for [React Material Design Lite](https://github.com/tleunen/react-mdl).

All components use a custom `Dropdown`, that uses [react-portal](https://github.com/tajo/react-portal) to render itself to document `body`, and [Tether](tether.io) for positioning.

## Installation

```
npm install --save react-mdl-extra
```

## Examples

https://hribb.github.io/react-mdl-extra/?down=0

```
git clone https://github.com/HriBB/react-mdl-extra
cd react-mdl-extra
npm install
npm run storybook
open http://localhost:9002/
```

## Usage

### Dropdown

```
import { Dropdown } from 'react-mdl-extra';

<Dropdown target={<Button>Open</Button>} align={'tl bl'} offset={'0 10px'}>
  <div className={'custom-menu'}>
    ...
  </div>
</Dropdown>
```

### SelectField

```
import { SelectField, Option } from 'react-mdl-extra';

<SelectField label={'Select me'} value={3}>
  <Option value={1}>One</Option>
  <Option value={2}>Two</Option>
  <Option value={3}>Three</Option>
  <Option value={4}>Four</Option>
  <Option value={5}>Five</Option>
</SelectField>
```

### MultiSelectField

```
import { MultiSelectField, Option } from 'react-mdl-extra';

<MultiSelectField label={'Select me many times'} value={[1,3]}>
  <Option value={1}>One</Option>
  <Option value={2}>Two</Option>
  <Option value={3}>Three</Option>
  <Option value={4}>Four</Option>
  <Option value={5}>Five</Option>
</MultiSelectField>
```

### Menu

```
import { Menu, MenuItem } from 'react-mdl-extra';

<Menu target={<Button raised>Open menu</Button>}>
  <MenuItem>One</MenuItem>
  <MenuItem>Two</MenuItem>
  <MenuItem>Three</MenuItem>
</Menu>
```

### AutoComplete

```
import { AutoComplete } from 'react-mdl-extra';

const items = [
  { id: 1, name: 'Darth Vader' },
  { id: 2, name: 'Luke Skywalker' },
  { id: 3, name: 'Obi Wan Kenobi' },
]

<AutoComplete
  label={'I will complete you'}
  items={items}
  valueIndex={'id'}
  dataIndex={'name'}
/>
```

## Positioning Dropdown

See [tether](http://tether.io/). Uses shorthand declaration. First two letter are the `attachment` property, followed by a space and second two letters, which are the `targetAttachment` property.

Examples:

**align="tl bl"**

Attach **t**op **l**eft edge of the dropdown to the **b**ottom **l**eft edge of the target.

**align="br tr"**

Attach **b**ottom **r**ight edge of the dropdown to the **t**op **r**ight edge of the target.

## TODO

- [x] Split Dropdown into a separate component
- [x] ~~Use native controls on mobile~~
- [x] ~~Improve AutoComplete on mobile~~
- [x] Improve styles and remove sass
- [x] Improve position declaration
- [x] Create `MultiSelectField`
- [x] Create `AutoCompleteField`
- [x] ~~Create `DatePickerField`~~
- [x] ~~Key and focus handling~~
- [x] ~~Add tests~~
