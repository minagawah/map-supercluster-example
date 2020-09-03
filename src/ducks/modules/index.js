import { combineReducers } from 'redux';
import wifiReducer, { MOUNT as WIFI_MOUNT_POINT } from './wifi_spot';

const rootReducer = combineReducers({
  [WIFI_MOUNT_POINT]: wifiReducer,
})

export default rootReducer
