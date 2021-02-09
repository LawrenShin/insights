import {combineReducers} from "redux";
import {
  InitReducer as InitListReducer
} from '../components/listDuck';
import {Reducer as SignInReducer} from '../components/forms/signInDuck';
import {Reducer as DictsReducer} from '../components/api/dictsDuck';
import {Reducer as AnyFormReducer} from '../components/forms/anyForm/anyFormDuck';

const CompaniesListReducer = InitListReducer('companies');
const PeopleListReducer = InitListReducer('people');

const rootReducer = combineReducers({
  CompaniesListReducer,
  PeopleListReducer,
  AnyFormReducer,
  SignInReducer,
  DictsReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;