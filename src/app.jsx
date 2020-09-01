import React from 'react';
import { Route, Link } from 'react-router-dom';
import tw, { css } from 'twin.macro';

import { Home } from './components/home';
import { About } from './components/about';

import logo from './logo.svg';
import './styles.css';

const appStyle = css`
  height: 100vh;
  a {
    color: #0080ff;
    &:hover, &:visited, &:active {
      color: #e53e3e;
    }
  }
  ${tw`text-gray-800`}
`;

const headerStyle = css`
  background-color: #282c34;
  min-height: 60px;
  ${tw`flex flex-row justify-start items-center text-white`}
`;

const linkStyle = tw`no-underline text-white! hover:text-red-600!`;
const srcLinkStyle = tw`ml-6 text-sm underline`;

export const App = () => (
  <div css={appStyle}>
    <header css={headerStyle}>
      <Link to='/'>
        <img src={logo} alt="logo" css={css`height:45px; pointer-events:none;`} />
      </Link>
      <Link to='/about' css={linkStyle}>About</Link>
      <a href="https://github.com/minagawah/map-supercluster-example" css={[linkStyle, srcLinkStyle]}>source</a>
    </header>
    <div id="container" css={css`height:100%`}>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
    </div>
  </div>
);
