import { useReducer } from "react";

const INITIAL_STATE = {
  Spectacles: [],
  SpectaclesSelected: {},
};

function favorisReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_FAVORITES":
      // console.log(action.payload);
      return {
        ...state,
        //  Spectacles: [...state.Spectacles, action.payload],
      };

    case "SET_FAVORITES":
      //   console.log(action.payload);
      return {
        ...state,
        Spectacles: [...state.Spectacles, action.payload],
      };

    case "ADD_FAVORIS":
      //console.log('action.payload.value' + action.payload);

      return {
        ...state,

        Spectacles: [...state.Spectacles, action.payload],
      };

    case "DELETE_FAVORIS":
      var array = [...state.Spectacles];
      var index = array.indexOf(action.payload);
      if (index !== -1) {
        array.splice(index, 1);
      }

      return {
        ...state,
        Spectacles: array,
      };

    case "SELECT_FAVORITES":
      action.payload.map((id) => {
        state.SpectaclesSelected[id] = true;
      });

      return {
        ...state,
        SpectaclesSelected: { ...state.SpectaclesSelected },
      };

    case "SELECT_FAVORIS":
      state.SpectaclesSelected[action.payload] = true;
      return {
        ...state,
        SpectaclesSelected: { ...state.SpectaclesSelected },
      };

    case "UNSELECT_FAVORIS":
      state.SpectaclesSelected[action.payload] = false;

      return {
        ...state,
      };

    default:
      return state;
  }
}

export default favorisReducer;
