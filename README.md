<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/glintonliao/king-of-bots">
    <img src="https://user-images.githubusercontent.com/37015336/197306751-03e09775-91c4-403c-ad9a-79077521f4e5.jpg" alt="Logo" width="80" height="80">
  </a>
  
  

  <h3 align="center">King of Bots</h3>

  <p align="center">
    An AI battle platform supports PvE and PvP system
    <br />
    <a href="https://www.titongpaolu.run/">Website</a>
    ·
    <a href="https://github.com/glintonliao/titongpaolu-site/issues">Report Bug</a>
    ·
    <a href="https://github.com/glintonliao/titongpaolu-site/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

Under Construction...

## Tech Stacks

+ Front-end: 
  + Vue.js
    + TypeScript
    + Composition API
    + Vue-Router
  + UnoCSS
  + Pinia
  + Vite
  + Vitest
+ Back-end: 
  + SpringBoot & Java
  + MyBatis-Plus
  + SpringCloud
  + Lombok
  + Docker
  + Redis
  
## Key Concepts

Under Construction...

---

### Static Site Generation (SSG)

+ #### Data Fetching
  
  next.js supports ssg for each page, to use this feature, add:
  ```javascript
  // page/index.js
  export async function getStaticProps() {
    // call the api
    // you can also write specific logic directly inside this funciton
    const database = await queryDatabase();
    const content = await queryContent(database.results);
    return {
      props: {
        content,
      },
    };
  }
  
  // and the page can receive the return value as props
  export default function Home({ content }) {
    ...
  }
   ```
   next will call this function from the server side during the building process, and for a headless CMS which users cannot call the api directly from the page, this feature will be a perfect match for such scenario.

  > **notice**: in api/xxx.js, the handler function should be "export **default** async function handler", otherwise will throw an error.
  
+ #### Data Parsing

  In this project, objects returned from notion are complex and have many restrictions. For example:
  
  + Query a notion database will return a list of objects, but for each property in the database, the returning obj only contains its id, not the value.
  + The path to find a text is: database -> page obj[list] -> results[list] -> block -> children[list] -> type == 'image' -> file -> url
  
  Next time, I will use **TypeScript** to reduce the debug time ==.

### Dynamic Routing

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/someapi.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

We need to export a handler function:

```javascript
// api/xx.js
export default async function handler(req, res) {
  ...
  return res.json("Success");
}
```

When we call api like this:

```javascript
const res = fetch('api/xx');
```

the handler function will be called.

### Dark Mode

Tailwind CSS supports [dark mode](https://tailwindcss.com/docs/dark-mode) natively, all we need is to add `dark:` to the Tailwind attributes, and then add `dark` to the classList.

For this project, I chose to use a external library [next-theme](https://www.npmjs.com/package/next-themes).

to enable dark mode, just wrap every child components with `<ThemeProvider />` in `_app.js`:

```javascript
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Context Hook

Because we have a gallery page using dynamic routing:

```javascript
<Link href="/gallery">
  <button>
    ...
  </button>
</Link>
```

and we cannot pass props using `<Link />`, so we need to use either third-party state management tools like redux, or the native context API of React.

to use context api, in `context/` folder, we can create a context provider:

```javascript
import { createContext } from "react";
import React, { useState } from "react";
export const Context = createContext();

function ContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  return (
    <Context.Provider value={[posts, setPosts]}>
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
```

and warp the root component with the provider:

```javascript
// _app.js
function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
        <Component {...pageProps} />
    </ContextProvider>
  );
}
```

and in each page, we can access context and update context:

```javascript
// /pages/gallery.js
const Gallery = () => {
  const [posts, setPosts] = useContext(Context);
  console.log(posts);
  setPosts(...);
}
```

### Masonary Layout

By setting different flex direction, we can easily achieve such effect:

<img width="500" alt="flex img" src="https://user-images.githubusercontent.com/37015336/186587949-e3c7f679-d1e4-4089-b8cf-fcc677a33e53.png">

## Run on Your Local Machine

First, clone the project source code from your terminal:

```bash
git clone git@github.com:GlintonLiao/titongpaolu-site.git
cd titongpaolu-site
```

Second, install the dependencies:

```sh
npm install
# or
yarn add
```

> If you haven't install any package manager, make sure you install it first.

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
