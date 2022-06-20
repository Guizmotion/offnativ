import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import listingsReducer from "./reducers/listingsReducer";
import userReducer from "./reducers/userReducer";
import thunk from "redux-thunk";
import rechercheReducer from "./reducers/rechercheReducer";
import favorisReducer from "./reducers/favorisReducer";

const persistConfig = {
  key: "app", //any unique key to identify your storage data
  storage: AsyncStorage,
  //whitelist: ["listings.cartItems.cartQuantity"], // array: which reducers you want to store
};

const rootReducer = combineReducers({
  listings: listingsReducer,
  user: userReducer,
  recherche: rechercheReducer,
  favoris: favorisReducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export default store;
