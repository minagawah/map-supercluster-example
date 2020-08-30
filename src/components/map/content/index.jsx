import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import tw, { css } from 'twin.macro';

import {
  listAccessPoints,
  getAccessPoint,
} from '../../../ducks/modules/access_point';

import marker from '../../../logo.svg';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const MAP_PROPERTIES = {
  center: { lat: 35.666436, lng: 139.739212 },
  zoom: 12,
};

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
  const [accessPoints, setAccessPoints] = useState(10);
  const mapRef = useRef();
  const points = useSelector(listAccessPoints);

  const { clusters, superCluster } = useSupercluster({
    points: accessPoints,
    bounds,
    zoom,
    options: {
      radius: 75,
      maxZoom: 20,
    },
  });

  useEffect(() => {
    setAccessPoints(
      points.map(({ key: id, name, lat, lng }) => ({
        type: 'Feature',
        properties: {
          cluster: false,
          id,
          name,
        },
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(lng),
            parseFloat(lat)
          ],
        },
      }))
    );
  }, [points]);

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
        {clusters.map(cluster => {
          const [lng, lat] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: cnt,
          } = cluster.properties;

          const size = 10 + (cnt / accessPoints.length) * 20;
          const extraStyle= css`width: ${size}px; height: ${size}px;`;

          return isCluster ? (
            <Marker
              key={`cluster-${cluster.id}`}
              lat={lat}
              lng={lng}
            >
              <div css={[clusterMarkerStyle, extraStyle]} onClick={() => {}}>
                {cnt}
              </div>
            </Marker>
          ) : (
            <Marker
              key={`ap-${cluster.properties.id}`}
              lat={lat}
              lng={lng}
            >
              <button css={markerStyle}>
                <img
                  src={marker}
                  alt="marker"
                  css={markerIconStyle}
                />
              </button>
            </Marker>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
