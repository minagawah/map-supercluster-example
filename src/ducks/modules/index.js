import { combineReducers } from 'redux';
import apReducer, { MOUNT as WIFI_MOUNT_POINT } from './wifi_spot';

const rootReducer = combineReducers({
  [WIFI_MOUNT_POINT]: apReducer,
})

export default rootReducer
