import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import tw, { css } from 'twin.macro';

import {
  spotIdSelector,
  formattedSpotListSelector,
  spotSelector,
  setSpotId,
} from '../../ducks/modules/wifi_spot';

import marker from '../../wifi.svg';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const MAP_PROPERTIES = {
  center: {
    lng: 139.751303,
    lat: 35.669865,
  },
  zoom: 13,
};

const mapContentStyle = css`
  width: 70%;
  height: 90%;
  ${tw`bg-gray-200 text-gray-500 text-sm`}
`;

const clusterMarkerStyle = css`
  border-radius: 50%;
  opacity: 0.75;
  padding: 60px;
  ${tw`
    flex flex-row justify-center items-center
    bg-hotmagenta text-white font-bold text-xl
  `}
`;

const fontSize = 15;
const iconSize = 40;

const markerWrapperStyle = tw`relative`;
const markerStyle = css`background: none; border: none; ${tw`absolute`}`;
const markerIconStyle = css`height: ${iconSize}px; pointer-events: none;`

const activeTextStyle = css`
  top: ${fontSize * -2}px;
  left: ${iconSize + 10}px;
  font-size: ${fontSize}px;
  width: 120px;
  opacity: 0.8;
  ${tw`absolute p-2 bg-black text-white font-bold`}
`;

const inactiveTextStyle = css`
  top: -10px;
  left: ${iconSize + 10}px;
  font-size: ${fontSize - 2}px;
  opacity: 0.8;
  text-align: center;
  opacity: 0.8;
  ${tw`absolute p-1 bg-hotmagenta text-white font-bold`}
`;

const Marker = ({ children }) => children;

export const MapContent = () => {
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [idle, setIdle] = useState(false);

  const list = useSelector(formattedSpotListSelector);
  const spotId = useSelector(spotIdSelector);
  const spot = useSelector(spotSelector(spotId));

  const dispatch = useDispatch();

  const { clusters, supercluster } = useSupercluster({
    points: list,
    bounds,
    zoom,
    options: {
      radius: 75,
      maxZoom: 20,
    },
  });

  const mapRef = useRef();

  useEffect(() => {
    const { lat, lng } = spot || {};
    if (lat && lng && !idle) {
      if (zoom <= 15) {
        mapRef.current.setZoom(15);
      }
      mapRef.current.panTo({ lat, lng });
    }
  }, [spot, zoom]);

  const onMapIdle = e => {
    setIdle(true);
    setTimeout(() => setIdle(false), 1000);
  };

  const markerPlotter = ({ id, geometry, properties }) => {
    const [lng, lat] = geometry.coordinates;
    const {
      id: rawId,
      name,
      cluster: isCluster,
      point_count: count,
    } = properties;

    const size = 10 + (count / list.length) * 20;
    const moreStyle = css`width: ${size}px; height: ${size}px;`;

    return isCluster ? (
      <Marker key={`cluster-${id}`} lat={lat} lng={lng}>
        <div
          css={[clusterMarkerStyle, moreStyle]}
          onClick={() => {
            const nextZoom = Math.min(
              supercluster.getClusterExpansionZoom(id),
              20
            );
            mapRef.current.setZoom(nextZoom);
            mapRef.current.panTo({ lat, lng });
          }}
        >
          {count}
        </div>
      </Marker>
    ) : (
      <Marker key={`spot-${rawId}`} lat={lat} lng={lng}>
        <div css={markerWrapperStyle} onClick={() => {
          dispatch(setSpotId(rawId));
        }}>
          <button css={markerStyle}>
            <img src={marker} alt="marker" css={markerIconStyle} />
          </button>
          {spotId === rawId ? (
            <div css={activeTextStyle}>
              [{rawId}] {name}
            </div>
          ) : (
            <div css={inactiveTextStyle}>{rawId}</div>
          )}
        </div>
      </Marker>
    );
  };

  return (
    <div id="map-content" css={mapContentStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        defaultCenter={MAP_PROPERTIES.center}
        defaultZoom={MAP_PROPERTIES.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
          mapRef.current.addListener('idle', onMapIdle);
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat
          ]);
        }}
      >
        {clusters.map(markerPlotter)}
      </GoogleMapReact>
    </div>
  );
}
