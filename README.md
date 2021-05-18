# react-autosave

![Tests](https://github.com/jollyjerr/react-autosave/workflows/Tests/badge.svg)
[![codecov](https://codecov.io/gh/jollyjerr/react-autosave/branch/main/graph/badge.svg?token=K7C88VK5GE)](https://codecov.io/gh/jollyjerr/react-autosave)
![npm](https://img.shields.io/npm/dm/react-autosave)

> A super simple debouncing component/hook to auto save controlled form values as they are updated.

```jsx
import React from "react";
import axios from "axios";

import { Autosave, useAutosave } from "react-autosave";

const updateBlog = (data) => axios.post("myapi/blog/123", { text: data });

// Via component
const EditBlogForm = () => {
  const [blogText, setBlogText] = React.useState("hello world");
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
  const [blogText, setBlogText] = React.useState("hello world");
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

react-autosave is an extremely lightweight component that periodically triggers an async callback function if, and only if, the value to update has changed.

## Features

1. Written in typescript.

2. Lightweight and simple.

3. No external libraries.

## API

| Prop                |         Type         |                                                        Description |
| ------------------- | :------------------: | -----------------------------------------------------------------: |
| data                |          T           |                         The controlled form value to be auto saved |
| onSave              | (data: T) => Promise |                            The callback function to save your data |
| interval (optional) |        number        | The number of milliseconds between save attempts. Defaults to 2000 |

### Contributing

Issues and PRs are more than welcome. Please clone the repo and setup your environment with:

```sh
yarn
```

The test suite can be run with `yarn test`
