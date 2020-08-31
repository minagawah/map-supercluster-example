import { MINATO_CITY_WIFI } from './data/minato_city';

export const MOUNT = 'wifi';

const FETCH_SPOT_LIST = 'FETCH_SPOT_LIST';
const SET_SPOT_LIST = 'SET_SPOT_LIST';
const SET_SPOT_ID = 'SET_SPOT_ID';

const initialState = {
  spots: [],
  spot_id: null,
};

const int = Math.trunc;

const mockFetchSpots = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(MINATO_CITY_WIFI.features || []);
  }, 500);
});

// --------------------------------------------------------
// Selectors
// --------------------------------------------------------

export const spotListSelector = state => state[MOUNT].spots;

export const spotIdSelector = state => state[MOUNT].spot_id;

export const spotInfoSelector = id => state => (state[MOUNT].spots || [])[id];

export const formattedSpotListSelector = state =>
  state[MOUNT].spots.map(({ id, name, lat, lng }) => {
    return {
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
    };
  })

// --------------------------------------------------------
// Reducers
// --------------------------------------------------------

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
  case FETCH_SPOT_LIST:
    return state;
  case SET_SPOT_LIST:
    return {
      ...state,
      spots: (action.payload || []).map((spot, index) => {
        const { geometry: { coordinates }, properties = {} } = spot;
        const name = properties['Acces Point Name'] || 'unknown';
        const no = properties['No'] || index;
        const [lng, lat] = coordinates || [];

        return {
          id: int(no),
          name,
          lng,
          lat,
        };
      }),
    };
  case SET_SPOT_ID:
    return {
      ...state,
      spot_id: action.payload,
    };
  default:
    return state;
  }
}

// --------------------------------------------------------
// Actions
// --------------------------------------------------------
export const setSpotId = id => {
  return {
    type: SET_SPOT_ID,
    payload: id,
  };
}

// --------------------------------------------------------
// Operations
// --------------------------------------------------------

export const fetchSpotListDispatcher = () => dispatch => {
  return mockFetchSpots()
    .then(res => {
      dispatch({
        type: SET_SPOT_LIST,
        payload: res,
      });
    });
}

