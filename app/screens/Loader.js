import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { ActivityIndicator, Colors } from "react-native-paper";

import styles from "../config/styles/StyleGeneral";
// import { StoreContext } from "../store/store";

export default function Loader({ navigation }) {
  // const { state, dispatch } = React.useContext(StoreContext);

  return (
    <View style={styles.loader}>
      <ActivityIndicator
        animating={true}
        color={Colors.red800}
        hidesWhenStopped={true}
      />
    </View>
  );
}
