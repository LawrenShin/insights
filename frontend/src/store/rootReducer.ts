import {combineReducers} from "redux";
import {Reducer as CompaniesListReducer} from '../components/listDuck';
import {Reducer as SignInReducer} from '../components/forms/signInDuck';
import {Reducer as DictsReducer} from '../components/api/dictsDuck';
import {Reducer as AnyFormReducer} from '../components/forms/anyForm/anyFormDuck';

const rootReducer = combineReducers({
  CompaniesListReducer,
  AnyFormReducer,
  SignInReducer,
  DictsReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;