# react-autosave

![Tests](https://github.com/jollyjerr/react-autosave/workflows/Tests/badge.svg)
[![codecov](https://codecov.io/gh/jollyjerr/react-autosave/branch/main/graph/badge.svg?token=K7C88VK5GE)](https://codecov.io/gh/jollyjerr/react-autosave)

> Auto save controlled form values as they are updated.

Credit were credit is due - this library was inspired from [this blog post](https://www.synthace.com/autosave-with-react-hooks/)

```jsx
import React from "react";
import axios from "axios";

import { Autosave } from "react-autosave";

const updateBlog = (data) => axios.post("myapi/blog/123", {text: data});

const EditBlogForm = () => {
   const [blogText, setBlogText] = React.useState("hello world");
   return (
      <div>
        <input
          type="text"
          data-testid="input"
          value={data}
          onChange={(e) => setBlogText(e.target.value)}
        />
        <Autosave
          data={blogText}
          onSave={updateBlog}
        />
      </div>
    );
};
```

react-autosave is an extremely lightweight component that periodically triggers an async callback function if, and only if, the value to update has changed.

## Features

1. Written in typescript. Generic Typescript support out of the box.

2. Callback props for successful and failed api calls.

3. Lightweight and simple.

## API

| Prop                 |      Type                 |  Description |
|----------            |:-------------:            |-------------:|
| data                 |      T                    | The controlled form value to be auto saved       |
| onSave               |    (data: T) => Promise   |   The callback function to save your data        |
| interval (optional)  | number                    |    The number of milliseconds between save attempts. Defaults to 2000        |
| onError (optional)   | Function                  | A callback function for if the save function errors |
| onSuccess (optional) | Function                  | A callback function for if the save function resolves

### Contributing

Issues and PRs are more than welcome. Please clone the repo and setup your environment with:

```sh
yarn
```

The test suite can be run with `yarn test`

### Advanced usage

You can also type the internal mechanics with generics.

```tsx
<Autosave<SomeCustomInterface,boolean>
    data={{} as SomeCustomInterface}
    onSave={(data: SomeCustomInterface) => Promise.resolve(false)} 
/>
```
