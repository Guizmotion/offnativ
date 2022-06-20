import React, { useEffect, useState, useMemo } from "react";
import { SectionList, Pressable, View, Text } from "react-native";

import { ActivityIndicator, Colors } from "react-native-paper";

import { AlphabetList } from "react-native-section-alphabet-list";
import axios from "axios";

// import { StoreContext } from "../../store/store";
// import { RechercheContext } from "../../store/storeRecherche";
import styles from "../../config/styles/StyleGeneral";

import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

export default function ListDateSpectacle({ navigation }) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  // const { stateRecherche, dispatchRecherche } =
  //   React.useContext(RechercheContext);

  const data = [
    { key: 0, value: "", checked: false },
    { key: 1, value: "", checked: false },
    { key: 2, value: "", checked: false },
    { key: 3, value: "", checked: false },
    { key: 4, value: "", checked: false },
    { key: 5, value: "", checked: false },
    { key: 6, value: "", checked: false },
    { key: 7, value: "07/07/2022", checked: false },
    { key: 8, value: "08/07/2022", checked: false },
    { key: 9, value: "09/07/2022", checked: false },
    { key: 10, value: "10/07/2022", checked: false },
    { key: 11, value: "11/07/2022", checked: false },
    { key: 12, value: "12/07/2022", checked: false },
    { key: 13, value: "13/07/2022", checked: false },
    { key: 14, value: "14/07/2022", checked: false },
    { key: 15, value: "15/07/2022", checked: false },
    { key: 16, value: "16/07/2022", checked: false },
    { key: 17, value: "17/07/2022", checked: false },
    { key: 18, value: "18/07/2022", checked: false },
    { key: 19, value: "19/07/2022", checked: false },
    { key: 20, value: "20/07/2022", checked: false },
    { key: 21, value: "21/07/2022", checked: false },
    { key: 22, value: "22/07/2022", checked: false },
    { key: 23, value: "23/07/2022", checked: false },
    { key: 24, value: "24/07/2022", checked: false },
    { key: 25, value: "25/07/2022", checked: false },
    { key: 26, value: "26/07/2022", checked: false },
    { key: 27, value: "27/07/2022", checked: false },
    { key: 28, value: "28/07/2022", checked: false },
    { key: 29, value: "29/07/2022", checked: false },
    { key: 30, value: "30/07/2022", checked: false },
    { key: 31, value: "31/07/2022", checked: false },
  ];

  const bgColor = "#f5f5f5";

  const handleDatesRecherches = () => {
    stateData.map((item, index) => {
      //console.log(item.checked);

      if (item.checked === true) {
        dispatch({
          type: "ADD_DATES_RECHERCHES",
          payload: item,
        });
      } else {
        dispatch({
          type: "DELETE_DATES_RECHERCHES",
          payload: item,
        });
      }
    });

    navigation.navigate("RechercheModal");
  };

  function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  const [stateData, setState] = useState(data);

  function uniq(a) {
    return Array.from(new Set(a));
  }

  function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }

  const clickButton = (item) => {
    let temp_state = [...stateData];
    let temp_element = { ...temp_state[item.key] };

    if (item.checked === false) {
      temp_element.checked = true;
      temp_state[item.key] = temp_element;
      setState(temp_state);
    } else {
      temp_element.checked = false;
      temp_state[item.key] = temp_element;
      setState(temp_state);
    }

    //return false;
  };

  return (
    <View
      style={{
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        width: "90%",
        height: "100%",
        margin: "5%",
      }}
    >
      {stateData
        .filter((item) => item.value !== "")
        .map((item, i) => (
          <View
            key={item.key}
            style={{
              // flex: 1,
              height: 60,
              width: 60,
              borderRadius: 60,
              flexGrow: 1,
              margin: 5,
              backgroundColor: item.checked ? "#f26522" : "rgba(255,255,255,0)",
            }}
          >
            <Pressable
              onPress={() => {
                //handleStylesRecherches(item)
                clickButton(item);
              }}
            >
              <Text style={{ textAlign: "center", padding: 15, fontSize: 24 }}>
                {item.value.replace("/07/2022", "")}
              </Text>
            </Pressable>
          </View>
        ))}

      <View
        style={{
          justifyContent: "flex-end",
          flex: 3,
          position: "absolute",
          bottom: 30,
          width: "80%",
          marginLeft: "10%",
        }}
        key="btn_select"
      >
        <Pressable
          onPress={() => {
            handleDatesRecherches();
          }}
        >
          <View style={[styles.labelCard, styles.labelAchat, styles.bigButton]}>
            <Text style={styles.textBigButton}> Valider ma sélection </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
