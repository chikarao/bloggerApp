import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data, 'id');
    // need { 4: {} }

  case FETCH_POST:
    // const post = action.payload.data;
    // const newState = { ...state };
    // newState[post.id]: post;
    // return newState;
    return { ...state, [action.payload.data.id]: action.payload.data };
    //with ES6, use key interpolation [] to create key value pair

  case DELETE_POST:
    return _.omit(state, action.payload);
    //if state object has key of payload.id, just drop it
    // and return new object without the payload
    // if we had used [], had to do
    //return _.reject(state, post.id === action.payload.id)
  default:
    return state;
  }
}
