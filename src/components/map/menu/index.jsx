import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import tw, { css } from 'twin.macro';

import {
  spotListSelector,
  fetchSpotListDispatcher,
  setSpotId,
} from '../../../ducks/modules/wifi_spot';

const menuStyle = css`
  width: 30%;
  overflow-y: auto;
  ${tw`pl-4`}
`;

export const MapMenu = () => {
  const list = useSelector(spotListSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpotListDispatcher());
  }, [dispatch]);

  return (
    <div id="menu" css={menuStyle}>
      <h2>Minato City WiFi Spots</h2>

      {list && list.length && list.map(spot => {
        const { id, name, lng, lat } = spot;
        return (
          <div key={id} tw="mt-4 cursor-pointer" onClick={e => {
            e.preventDefault();
            dispatch(setSpotId(id));
          }}>
            <div tw="font-bold">{name}</div>
            <div>{lat}, {lng}</div>
          </div>
        );
      })}
    </div>
  );
}

