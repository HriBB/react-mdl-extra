# React-MDL SelectField

Selectfield component for [React Material Design Lite](https://github.com/tleunen/react-mdl)

## Installation

```
npm install --save react-mdl-selectfield
```

## Examples

I am in a process of rewriting `SelectField` and `MultiSelectField` to be completely stateless.
Because of this, examples wont work as expected. I will update them soon ;)

https://hribb.github.io/react-mdl-selectfield/

```
git clone https://github.com/HriBB/react-mdl-selectfield
cd react-mdl-selectfield
npm install
npm run storybook
open http://localhost:9002/
```

## Usage

```
import { SelectField, Option } from 'react-mdl-selectfield';

render() {
  return() (
    <SelectField label={'Select me'} value={3}>
      <Option value={1}>One</Option>
      <Option value={2}>Two</Option>
      <Option value={3}>Three</Option>
      <Option value={4}>Four</Option>
      <Option value={5}>Five</Option>
    </SelectField>
  );
}
```

`<Option>` component requires a string `children` prop for filtering to work.
This sucks, because you cannot put anything complex (such as `Icon`) inside `Option`.
That is why `AutoCompleteField` component is on its way ;)
Until then you should stringify your `<Option>` children:

```
<SelectField label={'Select me'}>
  {users.map(user =>
    <Option key={user.id} value={user.id}>
      {`${user.first_name} ${user.last_name}`}
    </Option>
  )}
</SelectField>
```

## TODO

- [x] Add `readOnly` prop to `SelectField` and `MultiSelectField`
- [x] Make `SelectField` and `MultiSelectField` completely stateless
- [ ] Create `AutoCompleteField`
- [x] Pray for a good `Selectfield` in [`mdl v2`](https://github.com/google/material-design-lite/issues/4475)

## Component boilerplate

Using [react-component-boilerplate](https://github.com/ritz078/react-component-boilerplate)
with some modifications and improvements.
