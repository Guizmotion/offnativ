import { combineReducers } from "redux";
import favorisReducer from "./favorisReducer";
import listingsReducer from "./listingsReducer";
import rechercheReducer from "./rechercheReducer";
import userReducer from "./userReducer";

export default combineReducers({
  listings: listingsReducer,
  user: userReducer,
  recherche: rechercheReducer,
  favoris: favorisReducer,
});
