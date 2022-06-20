import React, { useEffect } from "react";
import LottieView from "lottie-react-native";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  useEffect(() => console.log("here"), []);
  return (
    <LottieView
      autoplay
      loop
      source={require("../assets/animations/loader.json")}
    />
  );
}

export default ActivityIndicator;
