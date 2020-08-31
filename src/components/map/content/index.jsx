import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import tw, { css } from 'twin.macro';

import {
  spotIdSelector,
  formattedSpotListSelector,
  spotInfoSelector,
} from '../../../ducks/modules/wifi_spot';

import marker from '../../../logo.svg';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const MAP_PROPERTIES = { center: { lat: 35.666436, lng: 139.739212 }, zoom: 12 };

const mapContentStyle = css`
  width: 70%;
  height: 90%;
  ${tw`bg-gray-200 text-gray-500 text-sm`}
`;

const clusterMarkerStyle = css`
  border-radius: 50%;
  ${tw`flex flex-row justify-center items-center p-10 bg-red-600 text-white text-lg`}
`;

const markerStyle = css`background: none; border: none;`;
const markerIconStyle = css`height: 40px; pointer-events: none;`

const Marker = ({ children }) => children;

export const MapContent = () => {
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);

  const list = useSelector(formattedSpotListSelector);
  const spotId = useSelector(spotIdSelector);
  const spotInfo = useSelector(spotInfoSelector(spotId));

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
    const { lat, lng } = spotInfo || {};
    if (lat && lng) {
      mapRef.current.panTo({ lat, lng });
    }
  }, [spotInfo]);

  const plotter = ({ id, geometry, properties }) => {
    const [lng, lat] = geometry.coordinates;
    const { cluster: isCluster, point_count: count } = properties;
    const size = 10 + (count / list.length) * 20;
    const moreStyle = css`width: ${size}px; height: ${size}px;`;

    return isCluster ? (
      <Marker key={`cluster-${id}`} lat={lat} lng={lng}>
        <div
          css={[clusterMarkerStyle, moreStyle]}
          onClick={e => {
            e.preventDefault();
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
      <Marker key={`access-spot-${properties.id}`} lat={lat} lng={lng}>
        <button css={markerStyle}>
          <img src={marker} alt="marker" css={markerIconStyle} />
        </button>
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
        {clusters.map(plotter)}
      </GoogleMapReact>
    </div>
  );
}

