import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import tw, { css } from 'twin.macro';

import {
  spotListSelector,
  spotIdSelector,
  fetchSpotListDispatcher,
  setSpotId,
} from '../../ducks/modules/wifi_spot';

const menuStyle = css`
  width: 30%;
  overflow-y: auto;
  ${tw`pl-4`}
`;

const spotStyle = css`
  ${tw`mt-3 p-2 cursor-pointer`}
`;

export const MapMenu = () => {
  const list = useSelector(spotListSelector);
  const spotId = useSelector(spotIdSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpotListDispatcher());
  }, [dispatch]);

  return (
    <div id="menu" css={menuStyle}>
      <h2>Minato City WiFi Spots</h2>

      {list && list.length && list.map(spot => {
        const { id, name, lng, lat } = spot;
        const moreStyle = spotId === id ? tw`bg-hotmagenta` : tw`bg-white`;
        return (
          <div key={id} css={[spotStyle, moreStyle]} onClick={() => {
            dispatch(setSpotId(id));
          }}>
            <div tw="font-bold">[{id}] {name}</div>
            <div>{lat}, {lng}</div>
          </div>
        );
      })}
    </div>
  );
}

