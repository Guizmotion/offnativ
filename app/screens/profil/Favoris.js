import React, { useCallback, useEffect, useState } from "react";
import {
  useIsFocused,
  ToastAndroid,
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

import { ListItem } from "react-native-elements";

import axios from "axios";

import { NavigationContainer } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useRoute } from "@react-navigation/native";
// import { StoreContext } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

// import { FavorisContext } from "../../store/storeFavoris";
import ProgrammeCard from "../ProgrammeCard";

export default function Favoris({ navigation }) {
  // const { state, dispatch } = React.useContext(StoreContext);
  const state = useSelector((state) => state.user);
  const stateFavoris = useSelector((state) => state.favoris);

  // const { stateFavoris, dispatchFavoris } = React.useContext(FavorisContext);

  const route = useRoute();
  const [listFavorites, setlistFavorites] = useState([]);
  const [token, setToken] = useState();

  //const filteredData = state.programme;

  const filteredData = state.programme.filter(
    (x) => stateFavoris.SpectaclesSelected[x.id] === true
  );
  // const memoizedValue = useMemo(() => renderItem, [state.programme]);

  return (
    <View>
      <FlatList
        //  ListHeaderComponent={() => { return <ProgrammeHeader />}}

        data={filteredData}
        removeClippedSubviews={true}
        // updateCellsBatchingPeriod={5}
        maxToRenderPerBatch={12}
        initialNumToRender={4}
        // getItemLayout={() => getItemLayout() }

        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd < 0) return;
        }}
        keyExtractor={(item, index) => {
          // console.log("index", index)
          return index.toString();
        }}
        renderItem={({ item }) => {
          // return renderData(item);
          return <ProgrammeCard item={item} />;
        }}
      />
    </View>
  );
}
