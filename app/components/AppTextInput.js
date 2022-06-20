import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import colors from "../config/colors";
import styles from "../config/styles/StyleGeneral";

function AppTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container}>
      <TextInput
        // placeholderTextColor={defaultStyles.colors.medium}
        style={styles.searchTextInput}
        {...otherProps}
      />
    </View>
  );
}

export default AppTextInput;
