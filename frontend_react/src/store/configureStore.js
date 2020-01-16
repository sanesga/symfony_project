import { createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const enhancer = applyMiddleware(thunkMiddleware);
export default function configureStore(initialState){
  const store = createStore(reducer,initialState,enhancer);
  return store;
}
