import React from 'react';
import tw, { css } from 'twin.macro';

import { MapMenu } from '../map/menu';
import { MapContent } from '../map/content';

const homeStyle = css`
  height: 100%;
  ${tw`flex flex-row justify-start items-stretch`}
`;

export const Home = () => (
  <div id="home" css={homeStyle}>
    <MapMenu />
    <MapContent />
  </div>
)
