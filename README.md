# map-supercluster-example

A sample React app to demonstrate plotting cluster markers on Google Maps.

[1. About](#about)  
[2. What I Did](#what)  
[3. Run](#run)  
[4. Notes](#notes)  
[5. LICENSE](#license)  

See [Demo](http://tokyo800.jp/mina/map-supercluster/)

![screenshot](screenshot.jpg "Screenshot")


<a id="about"></a>
## 1. About

A sample app plotting cluster markers on Google Maps.
Simply followed [Leigh Halliday's blog post](https://www.leighhalliday.com/google-maps-clustering).
The hook `useSupercluster` is also made by the same author.

Some features may interest you:

- CRA
- CSS-in-JS  
[Emotion](https://github.com/emotion-js/emotion) + [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) (using [twin.macro](https://github.com/ben-rogerson/twin.macro))
- Redux in Ducks!  
When clicking a WiFi spot from the list, it lets you navigate the main map,
and I needed a clever design for Redux state management.
So, I followed one of the Ducks proposals [(Ducks: Redux Reducer Bundles)](https://github.com/erikras/ducks-modular-redux).
Yes. "Ducks" isn't obsolete. It is still powerful.


<a id="what"></a>
## 2. What I Did

### 2-1. CRA

```shell
yarn create react-app map-supercluster-example
```

### 2-2. Override CRA

To add a Babel preset `@emotion/babel-preset-css-prop`) for [Emotion](https://github.com/emotion-js/emotion).

- `react-app-rewired`
- `customize-cra`

```shell
yarn add --dev react-app-rewired customize-cra
```

### 2-3. Redux

- `redux`
- `react-redux`
- `redux-thunk`

```shell
yarn add redux react-redux redux-thunk
```

There are several proposals for "ducks" patterns, but the idea is essentially to mange Redux state per feature.  
For this app, I am follwing [Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux).

As the structure bellow illustrates,
I have `ducks/modules/wifi_spot.js` in which I have reducers, selectors, and actions for Redux state management associated with WiFi spot data retrieved from the server.

```
src
└── ducks/
    ├── modules/
    │   ├── data/
    │   │   └── minato_city.js
    │   │        WiFi Spot Data
    │   ├── index.js
    │   │    Provides "rootReducer"
    │   └── wifi_spot.js
    │        Reducers, selectors, actions, etc...
    └── index.js
         Provides "createStore"
```


### 2-4. React Route

- `react-router-dom`

```shell
yarn add react-router-dom
```

### 2-5. Subdirectory Path

CRA has a smart feature that you can specify a subdirectory to `"homepage"` in your `package.json`,
and CRA automatically sets it to `process.env.PUBLIC_URL`.

`package.json`
```json
"homepage": "/mina/map-supercluster",
```

and in the routes:

`src/index.jsx`
```jsx
ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
```

Now, the app is served at the specified path:  
http://tokyo800.jp/mina/map-supercluster/



### 2-6. Google API Key

In `.env`:  
(not tracked in this Git repo)

```
REACT_APP_GOOGLE_API_KEY={My Google API Key}
```
and now I can look up:  
`process.env.REACT_APP_GOOGLE_API_KEY`


### 2-7. Emotion + Tailwind CSS

With [twin.macro](https://github.com/ben-rogerson/twin.macro), things are getting easier now.

**[Step1] Install NPM packages**  

- `@emotion/core`
- `@emotion/styled` (this is optional)
- `@emotion/babel-preset-css-prop`
- `tailwindcss`
- `twin.macro`

```shell
yarn add --dev @emotion/core @emotion/styled @emotion/babel-preset-css-prop tailwindcss twin.macro
```

Because CRA now understands Babel macro syntax, you no longer need `babel-plugin-macros`.
However, you still need `@emotion/babel-preset-css-prop` for `css={}` in your JSX codes to work ([more info](https://github.com/emotion-js/emotion/issues/1237)).


**[Step2] Configs**  

`config-overrides.js`
```js
const { override, addBabelPresets } = require('customize-cra');

module.exports = override(
  addBabelPresets(
    '@emotion/babel-preset-css-prop'
  )
)
```

`babel-plugin-macros.config.js`
```js
module.exports = {
  twin: {
    preset: 'emotion',
    config: './src/tailwind.config.js',
  },
}
```

`src/tailwind.config.js`
```js
module.exports = {
  theme: {},
  variants: {},
  plugins: [],
}
```

**[Step3] Use them!!**  

```js
import css from '@emotion/css/macro'
import tw from 'twin.macro';

const homeStyle = tw`flex flex-row pt-4 bg-gray-100 text-gray-800`;

export const Home => () => ({
  <div css={homeStyle}>
    <h1>Home</h1>
  </div>
})
```


### 2-8. Google Maps + Cluster Markers

- `google-map-react`
- `supercluster`
- `use-supercluster`

```shell
yarn add google-map-react supercluster use-supercluster
```

Followed [Leigh Halliday's blog post](https://www.leighhalliday.com/google-maps-clustering).


<a id="run"></a>
## 3. Run

### dev

```shell
yarn start
```

### prod

```shell
yarn build
```


<a id="notes"></a>
## 4. Notes


<a id="license"></a>
## 5. License

Dual-licensed under either of the followings.  
Choose at your option.

- The UNLICENSE ([LICENSE.UNLICENSE](LICENSE.UNLICENSE))
- MIT license ([LICENSE.MIT](LICENSE.MIT))

For the part utilizing `useSupercluster` is credited to [Leigh Halliday](https://www.leighhalliday.com/google-maps-clustering).

Minato-city WiFi Spot Data  
CC BY 4.0  
Provided by Minato-city, Tokyo.  
https://catalog.data.metro.tokyo.lg.jp/dataset/t131032d0000000022

WiFi Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/).
