import { createStore, actionCreator } from "./tiny-redux.js";

const INIT = "init";
const INC = "inc";
const RESET = "reset";

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

const store = createStore(reducer);

store.subscribe(() => {
  const { count } = store.getState();
  document.querySelector(".count").innerHTML = count;
  console.log(store.getState());
});

function handleOnClickInc() {
  store.dispatch(actionCreator(INC));
}

function handleOnClickReset() {
  store.dispatch(actionCreator(RESET));
}

document.querySelector(".inc-btn").addEventListener("click", handleOnClickInc);
document
  .querySelector(".reset-btn")
  .addEventListener("click", handleOnClickReset);
