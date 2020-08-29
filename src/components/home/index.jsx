import React from 'react';
import tw, { css } from 'twin.macro';

const homeStyle = css`
  height: 100%;
  ${tw`flex flex-row justify-start items-stretch`}
`;

const menuStyle = css`
  width: 30%;
  ${tw`pl-4`}
`;

const mapWrapperStyle = css`
  width: 70%;
  ${tw`bg-gray-200 text-gray-500 text-sm`}
`;

export const Home = () => (
  <div id="home" css={homeStyle}>
    <div id="menu" css={menuStyle}>
      <h2>Menu</h2>
    </div>
    <div id="map-wrapper" css={mapWrapperStyle}>Google Map</div>
  </div>
);
