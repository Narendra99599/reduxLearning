import { createStore } from "redux";

const store = createStore(reducer);

function reducer(state = { amount: 0 }, action) {
    if(action.type === 'increment'){
        return {amount : state.amount + action.payload}
    }else if(action.type === 'decrement'){
        return {amount : state.amount - action.payload};
    }
  return state;
}

console.log(store.getState());

let action = { type: "increment", payload: 200 };
let action2 = {type : 'decrement', payload : 200};

store.dispatch(action);

console.log(store.getState());

store.dispatch(action2);

console.log(store.getState())

//Action creators
function increment(value){
    return {
        type : 'increment',
        payload : value
    }
}