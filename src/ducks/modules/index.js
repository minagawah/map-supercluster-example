import { combineReducers } from 'redux';
import apReducer, { MOUNT_POINT as WAP_MOUNT_POINT } from './access_point';

const rootReducer = combineReducers({
  [WAP_MOUNT_POINT]: apReducer,
})

export default rootReducer
