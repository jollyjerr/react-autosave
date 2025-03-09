# react-autosave

[![Tests](https://github.com/jollyjerr/react-autosave/actions/workflows/ci.yml/badge.svg)](https://github.com/jollyjerr/react-autosave/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/jollyjerr/react-autosave/branch/main/graph/badge.svg?token=K7C88VK5GE)](https://codecov.io/gh/jollyjerr/react-autosave)
![npm](https://img.shields.io/npm/dm/react-autosave)
![minified size](https://img.shields.io/bundlephobia/min/react-autosave?color=green)

> Auto save controlled form values as they are updated.

react-autosave is a lightweight solution for auto saving controlled form values.
It handles many edge cases and guarantees a good user experience.

## Examples

```tsx
import React from 'react';
import axios from 'axios';

import { Autosave, useAutosave } from 'react-autosave';

const updateBlog = (data) => axios.post('myapi/blog/123', { text: data });

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

| Prop                     |         Type         |                                                        Description |
| ------------------------ | :------------------: | -----------------------------------------------------------------: |
| data                     |        TData         |                         The controlled form value to be auto saved |
| onSave                   | (data: TData) => any |                            The callback function to save your data |
| interval (optional)      |        number        | The number of milliseconds between save attempts. Defaults to 2000 |
| saveOnUnmount (optional) |       boolean        |        Defaults to true. Set to false to prevent saving on unmount |

### Contributing

Issues and PRs are more than welcome. Please clone the repo and setup your environment with:

```sh
pnpm
```

The test suite can be run with `pnpm test`
Buid the library with `pnpm build`
A demo page can be viewed with `pnpm build && pnpm dev`
