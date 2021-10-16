# react-autosave

![Tests](https://github.com/jollyjerr/react-autosave/workflows/Tests/badge.svg)
[![codecov](https://codecov.io/gh/jollyjerr/react-autosave/branch/main/graph/badge.svg?token=K7C88VK5GE)](https://codecov.io/gh/jollyjerr/react-autosave)
![npm](https://img.shields.io/npm/dm/react-autosave)
![minified size](https://img.shields.io/bundlephobia/min/react-autosave?color=green)

> An automagic component and hook to auto save controlled form values as they are updated.

react-autosave is an extremely lightweight component or hook that periodically triggers a callback function if, and only if, the value to update has changed.
Typically, this is used to make API calls when a user stops typing for a second in some input, but you could technically use this for any side effect you wanted to debounce. 🎉

## Examples

```jsx
import React from 'react';
import axios from 'axios';

import { Autosave, useAutosave } from 'react-autosave';

const updateBlog = (data) => axios.post('myapi/blog/123', { text: data });

// Via component
const EditBlogForm = () => {
  const [blogText, setBlogText] = React.useState('hello world');
  return (
    <div>
      <input
        type="text"
        value={blogText}
        onChange={(e) => setBlogText(e.target.value)}
      />
      <Autosave data={blogText} onSave={updateBlog} />
    </div>
  );
};

// Via hook
const EditBlogFormWithHook = () => {
  const [blogText, setBlogText] = React.useState('hello world');
  useAutosave({ data: blogText, onSave: updateBlog });
  return (
    <div>
      <input
        type="text"
        value={blogText}
        onChange={(e) => setBlogText(e.target.value)}
      />
    </div>
  );
};
```

Notice that the callback function **needs to be memoized**. If you are declaring the function within your component, wrap it in a use callback:

```tsx
const EditBlogFormWithHook = () => {
  const [blogText, setBlogText] = React.useState('hello world');

  // https://reactjs.org/docs/hooks-reference.html#usecallback
  const updateBlog = React.useCallback((newText: string) => {
    axios.post('myapi/blog/123', { text: newText }).catch(console.error);
  }, []);

  useAutosave({ data: blogText, onSave: updateBlog });
  return (
    <div>
      <input
        type="text"
        value={blogText}
        onChange={(e) => setBlogText(e.target.value)}
      />
    </div>
  );
};
```

## Installation

```sh
yarn add react-autosave
# or with npm...
npm i react-autosave
```

## Features

1. Written in typescript.

2. Lightweight and simple.

3. No dependencies.

## API

| Prop                |         Type         |                                                        Description |
| ------------------- | :------------------: | -----------------------------------------------------------------: |
| data                |        TData         |                         The controlled form value to be auto saved |
| onSave              | (data: TData) => any |                            The callback function to save your data |
| interval (optional) |        number        | The number of milliseconds between save attempts. Defaults to 2000 |

### Contributing

Issues and PRs are more than welcome. Please clone the repo and setup your environment with:

```sh
yarn
```

The test suite can be run with `yarn test`
