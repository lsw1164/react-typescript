import { createStore, actionCreator } from "./tiny-redux.js";

const INIT = "init";
const INC = "inc";
const RESET = "reset";
const ASYNC_INC = "async_inc";

const middleware1 = (store) => (dispatch) => (action) => {
  console.log("middleware1");
  console.log(action);
  if (action.type === ASYNC_INC) {
    setTimeout(() => {
      dispatch(actionCreator(INC));
    }, 3000);
  } else {
    dispatch(action);
  }
};

const middleware2 = (store) => (dispatch) => (action) => {
  console.log("middleware2");
  dispatch(action);
};

function reducer(state = {}, { type, payload }) {
  switch (type) {
    case INIT:
      return {
        ...state,
        count: payload.count,
      };
    case INC:
      const prevCount = state.count || 0;
      return {
        ...state,
        count: prevCount + 1,
      };
    case RESET:
      return {
        ...state,
        count: 0,
      };
    default:
      return { ...state };
  }
}

const store = createStore(reducer, [middleware1, middleware2]);

store.subscribe(() => {
  const { count } = store.getState();
  document.querySelector(".count").innerHTML = count;
  console.log(store.getState());
});

function handleOnClickInc() {
  store.dispatch(actionCreator(INC));
}

function handleOnClickAsyncInc() {
  store.dispatch(actionCreator(ASYNC_INC));
}

function handleOnClickReset() {
  store.dispatch(actionCreator(RESET));
}

document.querySelector(".inc-btn").addEventListener("click", handleOnClickInc);
document
  .querySelector(".async-inc-btn")
  .addEventListener("click", handleOnClickAsyncInc);
document
  .querySelector(".reset-btn")
  .addEventListener("click", handleOnClickReset);
