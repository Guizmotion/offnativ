import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  DrawerContentScrollView,
  View,
  StyleSheet,
  ScrollViewButton,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";

import { NavigationContainer } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import PhotoExpo from "../screens/PhotoExpo";

export default function Photo({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <PhotoExpo />
    </View>
  );
}
