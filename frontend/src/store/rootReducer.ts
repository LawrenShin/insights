import {combineReducers} from "redux";
import {Reducer as CompaniesListReducer} from '../components/listDuck';
import {Reducer as SignInReducer} from '../components/forms/signInDuck';

const rootReducer = combineReducers({
  CompaniesListReducer,
  SignInReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;