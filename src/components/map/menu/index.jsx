import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import tw, { css } from 'twin.macro';

import {
  listAccessPoints,
  fetchAccessPoints,
} from '../../../ducks/modules/access_point';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const menuStyle = css`
  width: 30%;
  overflow-y: auto;
  ${tw`pl-4`}
`;

export const MapMenu = () => {
  const points = useSelector(listAccessPoints);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccessPoints());
  }, [dispatch]);

  return (
    <div id="menu" css={menuStyle}>
      <h2>Minato City WiFi Access Points</h2>
      <div>
        Click the name to show it on the map.
      </div>

      {points && points.length && points.map(ap => {
        const { key, name, lng, lat } = ap;
        return (
          <div key={key} tw="mt-4">
            <div tw="font-bold">{name}</div>
            <div>{lat}, {lng}</div>
          </div>
        );
      })}
    </div>
  );
}
