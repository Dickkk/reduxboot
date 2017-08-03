import { combineReducers } from 'redux';

// Reducers
import diclist from '../trade/dic_data/reducer';

// Combine Reducers
var reducers = combineReducers({
    diclist:diclist
});

export default reducers;
