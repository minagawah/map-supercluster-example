# map-supercluster-example

A sample React app to demonstrate the use of useSupercluster for Google Map.

[1. About](#about)  
[2. What I Did](#what)  
[3. Run](#run)  
[4. Notes](#notes)  
[5. LICENSE](#license)  

<a id="about"></a>
## 1. About

A sample React app to illustrate the use of `useSupercluster` for making marker clusters for Google Map.

- CRA (Create React App)
- Overrides React configuration with `react-app-rewired` and `customize-cra`.
- CSS-in-JS using `twin.macro` (comprises of `emotion` and `tailwind`).
- Redux structure with ["ducks" ("Redux Reducer Bundles")](https://github.com/erikras/ducks-modular-redux).
- Google Map React + `useSuperCluster`


<a id="what"></a>
## 2. What I Did

### 2-1. CRA + Override

```shell
yarn create react-app map-supercluster-example
# Override CRA
yarn add --dev react-app-rewired customize-cra
```

### 2-2. Google API Key

I have the following in `.env`:
```
REACT_APP_GOOGLE_API_KEY={My Google API Key}
```
so that CRA allows me to access it as `process.env.REACT_APP_GOOGLE_API_KEY`.
Since `.env` is not tracked by Git in this repository,
you should prepare your own `.env` to set your Google API key.


### 2-3. Project Subdirectory Path

With the following in `package.json`:
```json
  "homepage": "/minagawah/map-supercluster-example",
```
CRA adds the path to `process.env.PUBLIC_URL`,
and my URL becomes:
``` 
http://localhost:3000/minagawah/map-supercluster-example/
```

### 2-4. Emotion + Tailwind

```shell
yarn add --dev @emotion/core @emotion/styled @emotion/babel-preset-css-prop
yarn add --dev tailwindcss
# For tailwind macro syntax.
yarn add --dev twin.macro
```
where `@emotion/styled` is optional.
If you like [these features](https://emotion.sh/docs/@emotion/styled), install it.

[twin.macro](https://github.com/ben-rogerson/twin.macro)
allows you to write CSS-in-JS using macro syntax with Emotion (you can use Styled Components as well).

**## [Step1] Install `twin.macro`**  

Along with `@emotion/core` and `tailwindcss`, install  and `twin.macro`.
Also, you need `@emotion/babel-preset-css-prop` in order for `css={}` syntax to works ([more info](https://github.com/emotion-js/emotion/issues/1237)).
Since CRA now allows you to write macro syntax, you no longer need `babel-plugin-macros`.

**## [Step2] Prepare Config Files**  
Create 3 config files:

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

**## [Step3] Use Emotion + Tailwind macro syntax!**  
Use them in your components:
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

### 2-5. React Route + Redux

```shell
yarn add react-router-dom redux react-redux redux-thunk
```

### 2-6. Google Map React + `useSuperCluster`

```shell
yarn add google-map-react supercluster use-supercluster
```

Implemented as instructed in the following blog article:

Google Maps Marker Clustering | Leigh Halliday  
https://www.leighhalliday.com/google-maps-clustering


<a id="notes"></a>
## 4. Notes


<a id="license"></a>
## 5. License

Dual-licensed under either of the followings.  
Choose at your option.

- The UNLICENSE ([LICENSE.UNLICENSE](LICENSE.UNLICENSE))
- MIT license ([LICENSE.MIT](LICENSE.MIT))
