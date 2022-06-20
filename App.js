import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import store, { persistor } from "./app/store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import AppNavigator from "./app/navigation/AppNavigator";
import { CartesAbonnementContainer } from "./app/store/storeCartesAbonnement";
import { RootSiblingParent } from "react-native-root-siblings";
import PushService from './app/services/PushService';


function App() {



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <CartesAbonnementContainer>
            <RootSiblingParent>
              <AppNavigator />
              <PushService />
            </RootSiblingParent>
          </CartesAbonnementContainer>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}


export default App;
