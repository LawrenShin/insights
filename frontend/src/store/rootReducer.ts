import {combineReducers} from "redux";
import {Reducer as CompaniesListReducer} from '../components/listDuck';
import {Reducer as SignInReducer} from '../components/forms/signInDuck';
import {Reducer as DictsReducer} from '../components/api/dictsDuck';

const rootReducer = combineReducers({
  CompaniesListReducer,
  SignInReducer,
  DictsReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;