import agent from "./agent";
import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  //REGISTER
} from "./constants/actionTypes";

const promiseMiddleware = store => next => action => {
 
  if(action.tab!=="undefined"){
  }


  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        action.error = true;
        action.payload = error.response.body;
        action.payload = error.response;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );
    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === LOGIN) {

    if (!action.error && action.payload[0].user !== "undefined") {

      window.localStorage.setItem("jwt", action.payload[0].user[0].token);
      agent.setToken(action.payload[0].user[0].token);
    }

  } else if (action.type === LOGOUT) {

    window.localStorage.setItem("jwt", "");
    agent.setToken(null);
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === "function";
}

export { promiseMiddleware, localStorageMiddleware };
