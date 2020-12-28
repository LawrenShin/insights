import {combineReducers} from "redux";
import {Reducer as CompaniesListReducer} from '../pages/CompaniesDuck';

const rootReducer = combineReducers({
  CompaniesListReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;