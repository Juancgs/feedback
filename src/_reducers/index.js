import alertReducer from './alert.reducer';
import authenticationReducer from './authentication.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    alert:alertReducer,
    authentication:authenticationReducer
});
