import { useReducer } from "react";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
  token: null,
  favorites: [], //[27722,29126,28685,28895,27916,27977,28749,28194,28770,28832,28942],
  programme: [],
  carteAbonnement: [],
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "addData":
      return { ...state, programme: action.payload };

    case "GET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };
    case "SET_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "SET_CARTE_ABONNEMENT":
      return {
        ...state,
        carteAbonnement: [...state.carteAbonnement, action.payload],
      };

    case "LOGIN":
      // AsyncStorage.setItem("user", JSON.stringify(action.payload.profil));
      // AsyncStorage.setItem("token", JSON.stringify(action.payload.token));

      console.log("user payload : " + JSON.stringify(action.payload.profil));

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.profil,
        token: action.payload.token,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

export default userReducer;
