import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";
import editorsReducer from "./slices/editorSlice";

// create root configuration (how data store and how read out data from store)
const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  blacklist: ["editors"],
};

// create combine reducer
const rootReducer = combineReducers({
  app: appReducer,
  editors: editorsReducer,
});

export { rootPersistConfig, rootReducer };
