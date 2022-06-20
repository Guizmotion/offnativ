import { useReducer } from "react";

const INITIAL_STATE = {
  StylesRecherches: [],
  StylesRecherchesSelected: {},
  AuteursRecherches: [],
  AuteursRecherchesSelected: {},
  limite: 100,
};

function rechercheReducer(stateRecherche = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_LIMITE":
      return {
        ...stateRecherche,

        limite: action.payload,
      };

    case "ADD_STYLES_RECHERCHES":
      return {
        ...stateRecherche,

        StylesRecherches: [
          ...stateRecherche.StylesRecherches,
          action.payload.value,
        ],
      };

    case "DELETE_STYLES_RECHERCHES":
      var array = [...stateRecherche.StylesRecherches];
      var index = array.indexOf(action.payload.value);
      if (index !== -1) {
        array.splice(index, 1);
      }

      return {
        ...stateRecherche,
        StylesRecherches: array,
      };

    case "SELECT_STYLES_RECHERCHES":
      stateRecherche.StylesRecherchesSelected[action.payload] = true;
      return {
        ...stateRecherche,
        StylesRecherchesSelected: {
          ...stateRecherche.StylesRecherchesSelected,
        },
      };

    case "UNSELECT_STYLES_RECHERCHES":
      stateRecherche.StylesRecherchesSelected[action.payload] = false;

      return {
        ...stateRecherche,
      };

    case "ADD_AUTEURS_RECHERCHES":
      return {
        ...stateRecherche,
        AuteursRecherches: [
          ...stateRecherche.AuteursRecherches,
          action.payload.value,
        ],
      };

    case "DELETE_AUTEURS_RECHERCHES":
      var array = [...stateRecherche.AuteursRecherches];
      var index = array.indexOf(action.payload.value);
      if (index !== -1) {
        array.splice(index, 1);
      }

      return {
        ...stateRecherche,
        AuteursRecherches: array,
      };

    case "SELECT_AUTEURS_RECHERCHES":
      stateRecherche.AuteursRecherchesSelected[action.payload] = true;
      return {
        ...stateRecherche,
        AuteursRecherchesSelected: {
          ...stateRecherche.AuteursRecherchesSelected,
        },
      };

    case "UNSELECT_AUTEURS_RECHERCHES":
      stateRecherche.AuteursRecherchesSelected[action.payload] = false;

      return {
        ...stateRecherche,
      };

    default:
      return stateRecherche;
  }
}

export default rechercheReducer;
