import React from "react";
import { Text } from "react-native";

// headin component
function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
