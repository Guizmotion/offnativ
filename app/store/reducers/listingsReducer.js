const INITIAL_STATE = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  date: "",
  tko_id: "",
};

function addToCart(state = INITIAL_STATE, action) {
  let nextState;
  switch (action.type) {
    case "cart":
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        nextState = {
          ...state,
          cartItems: state.cartItems.map((item, index) => {
            if (index === existingIndex) {
              item.price[0].quantity = item.price[0].quantity + 1;
            }
            return item;
          }),
        };
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        nextState = {
          ...state,
          cartItems: [...state.cartItems, tempProductItem],
        };
      }
      return nextState || state;
    case "addTkoId":
      nextState = {
        ...state,
        tko_id: action.payload,
      };
      return nextState || state;
    case "cartAbonnement":
      const existingIndexAbonnement = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      nextState = {
        ...state,
        cartItems: state.cartItems.map((item, index) => {
          if (index === existingIndexAbonnement) {
            item.price[1].quantity = item.price[1].quantity + 1;
          }
          return item;
        }),
      };

      return nextState || state;
    case "cartTarifMoins":
      const existingIndexTarifMoins = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      nextState = {
        ...state,
        cartItems: state.cartItems.map((item, index) => {
          if (index === existingIndexTarifMoins) {
            item.price[2].quantity = item.price[2].quantity + 1;
          }
          return item;
        }),
      };

      return nextState || state;
    case "cartTarifJeuneAbonne":
      const existingIndexJeuneAbonne = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      nextState = {
        ...state,
        cartItems: state.cartItems.map((item, index) => {
          if (index === existingIndexJeuneAbonne) {
            item.price[3].quantity = item.price[3].quantity + 1;
          }
          return item;
        }),
      };

      return nextState || state;
    case "removeCart":
      console.log(action.payload);
      const cartIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (cartIndex !== -1) {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          cartItems: state.cartItems.filter(
            (item, index) => index !== cartIndex
          ),
        };
      }
      return nextState || state;

    case "decreaseCart":
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].price[0].quantity > 0) {
        state.cartItems[itemIndex].price[0].quantity -= 1;
        nextState = {
          ...state,
        };
      }
      return nextState || state;
    case "resetCart":
      const resetItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[resetItemIndex].price[0].quantity > 0) {
        state.cartItems[resetItemIndex].price[0].quantity = 0;
        nextState = {
          ...state,
        };
      }
      return nextState || state;
    case "decreaseCartTarifAbonnement":
      const resetItemIndexTarifAbonnement = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndexTarifAbonnement].price[1].quantity > 0) {
        state.cartItems[itemIndexTarifAbonnement].price[1].quantity -= 1;
        nextState = {
          ...state,
        };
      }
      return nextState || state;
    case "resetCartTarifAbonnement":
      const resettItemIndexTarifAbonnement = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (
        state.cartItems[resettItemIndexTarifAbonnement].price[1].quantity > 0
      ) {
        state.cartItems[resettItemIndexTarifAbonnement].price[1].quantity = 0;
        nextState = {
          ...state,
        };
      }
      return nextState || state;
    case "decreaseCartTarifMoins":
      const itemIndexTarifMoins = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndexTarifMoins].price[2].quantity > 0) {
        state.cartItems[itemIndexTarifMoins].price[2].quantity -= 1;
        nextState = {
          ...state,
        };
      }
      return nextState || state;
    case "resetCartTarifMoins":
      const resetItemIndexTarifMoins = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[resetItemIndexTarifMoins].price[2].quantity > 0) {
        state.cartItems[resetItemIndexTarifMoins].price[2].quantity = 0;
        nextState = {
          ...state,
        };
      }
      return nextState || state;
    case "decreaseCartTarifJeuneAbonne":
      const itemIndexTarifJeuneAbonne = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndexTarifJeuneAbonne].price[3].quantity > 0) {
        state.cartItems[itemIndexTarifJeuneAbonne].price[3].quantity -= 1;
        nextState = {
          ...state,
        };
      }
      return nextState || state;
    case "resetCartTarifJeuneAbonne":
      const resetItemIndexTarifJeuneAbonne = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (
        state.cartItems[resetItemIndexTarifJeuneAbonne].price[3].quantity > 0
      ) {
        state.cartItems[resetItemIndexTarifJeuneAbonne].price[3].quantity = 0;
        nextState = {
          ...state,
        };
      }
      return nextState || state;

    case "addDateToCart":
      const dateIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (dateIndex >= 0) {
        console.log("hi2");
        nextState = {
          ...state,
          cartItems: state.cartItems.map((item, index) => {
            if (index === dateIndex) {
              item.date = action.payload.date;
            }
            return item;
          }),
        };
      }
      return nextState || state;

    default:
      return state;
  }
}

export default addToCart;
