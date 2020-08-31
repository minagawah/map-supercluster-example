# map-supercluster-example

A sample React app to demonstrate the use of useSupercluster for Google Map.

[1. About](#about)  
[2. What I Did](#what)  
[3. Run](#run)  
[4. Notes](#notes)  
[5. LICENSE](#license)  


<a id="about"></a>
## 1. About

A sample app plotting cluster markers on Google Maps.  
Simply, followed [Leigh Halliday's blog post](https://www.leighhalliday.com/google-maps-clustering).  

Features:

- Made with CRA (Create React App)
- CSS-in-JS using `twin.macro` (comprises of `emotion` and `tailwind`).
- ["ducks" (Redux Reducers))](https://github.com/erikras/ducks-modular-redux) to manage WiFi spot data.



<a id="what"></a>
## 2. What I Did

### 2-1. CRA

```shell
yarn create react-app map-supercluster-example
```

### 2-2. Override

- `react-app-rewired`
- `customize-cra`

```shell
yarn add --dev react-app-rewired customize-cra
```

### 2-3. Google API Key

In `.env`:
```
REACT_APP_GOOGLE_API_KEY={My Google API Key}
```
and now I can look it up:  
`process.env.REACT_APP_GOOGLE_API_KEY`

(`.env` is not tracked in this Git repo)


### 2-4. Subdirectory Path

`package.json`
```json
"homepage": "/mina/map-supercluster",
```

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

Now, the path becomes:  
``` 
http://localhost:3000/mina/map-supercluster/
```


### 2-5. React Route

- `react-router-dom`

```shell
yarn add react-router-dom
```

### 2-6. Redux

- `redux`
- `react-redux`
- `redux-thunk`

```shell
yarn add redux react-redux redux-thunk
```

In ["ducks"](https://github.com/erikras/ducks-modular-redux), Redux state is managed per feature, is actually a file which contains its reducers/selectors/actions.

```
src
└── ducks/
    ├── modules/
    │   ├── data/
    │   │   └── minato_city.js ---> WiFi Spot Data
    │   ├── index.js ---> provides "rootReducer"
    │   └── wifi_spot.js ---> One of the features.
    └── index.js ---> provides "createStore"
```

### 2-7. Emotion + Tailwind

**[Step1] Install NPM packages**  

- `@emotion/core`
- `@emotion/styled` (this is optional)
- `@emotion/babel-preset-css-prop`
- `tailwindcss`
- `twin.macro`

```shell
yarn add --dev @emotion/core @emotion/styled @emotion/babel-preset-css-prop tailwindcss twin.macro
```

Because CRA now understands macro syntax, you no longer need `babel-plugin-macros`.

[twin.macro](https://github.com/ben-rogerson/twin.macro) allows you to write CSS-in-JS (Emotion or Styled Components) easily.  
Also, `@emotion/babel-preset-css-prop` is needed for `css={}` in your JSX to work ([more](https://github.com/emotion-js/emotion/issues/1237)).


**[Step2] Config**  

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


