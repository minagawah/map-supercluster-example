import { MINATO_CITY_WIFI } from './data/minato_city';

export const MOUNT_POINT = 'ap';

const FETCH_ACCESS_POINTS = 'FETCH_ACCESS_POINTS';
const UPDATE_ACCESS_POINTS = 'UPDATE_ACCESS_POINTS';

const initialState = {
  points: [],
};

const mockFetchAccessPoints = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(MINATO_CITY_WIFI.features || []);
  }, 500);
});

// Selectors
export const listAccessPoints = state => state[MOUNT_POINT].points;
export const getAccessPoint = (state, index) => (state[MOUNT_POINT].points || [])[index];

// Reducers
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
  case UPDATE_ACCESS_POINTS:
    const points = (action.payload || []).map((ap, index) => {
      const { geometry: { coordinates }, properties = {} } = ap;
      const name = properties['Acces Point Name'] || 'unknown';
      const no = properties['No'] || index;
      const [lng, lat] = coordinates || [];
      return { key: `minato-${no}`, name, lng, lat };
    });

    return {
      ...state,
      points,
    };
  case FETCH_ACCESS_POINTS:
    return state;
  default:
    return state;
  }
}

// Operations
export const fetchAccessPoints = () => dispatch => {
  return mockFetchAccessPoints()
    .then(response => {
      dispatch({
        type: UPDATE_ACCESS_POINTS,
        payload: response,
      });
    });
}

