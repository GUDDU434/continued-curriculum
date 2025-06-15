import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer as loginReducer } from "./auth/auth.reducer";
import { reducer as NoteReducer } from "./note/note.reducer";

let rootReducer = combineReducers({
  loginReducer,
  NoteReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
