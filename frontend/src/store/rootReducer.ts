import {combineReducers} from "redux";
import {
  InitReducer as InitListReducer
} from '../components/listDuck';
import {Reducer as SignInReducer} from '../components/forms/signInDuck';
import {Reducer as DictsReducer} from '../components/api/dictsDuck';
import {Reducer as AnyFormReducer} from '../components/forms/anyForm/anyFormDuck';

const CompaniesListReducer = InitListReducer('companies');
const PersonsListReducer = InitListReducer('persons');

const rootReducer = combineReducers({
  CompaniesListReducer,
  PersonsListReducer,
  AnyFormReducer,
  SignInReducer,
  DictsReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;