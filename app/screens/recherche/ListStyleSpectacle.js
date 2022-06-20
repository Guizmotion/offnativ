import React, { useEffect, useState, useMemo } from "react";
import { Pressable, View, Text } from "react-native";

import { ActivityIndicator, Colors } from "react-native-paper";

import { AlphabetList } from "react-native-section-alphabet-list";
import axios from "axios";

// import { RechercheContext } from "../../store/storeRecherche";
import styles from "../../config/styles/StyleGeneral";
import { useDispatch, useSelector } from "react-redux";

export default function ListStyleSpectacle({ navigation }) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  // const { stateRecherche, dispatchRecherche } =
  //   React.useContext(RechercheContext);

  const data = [
    { key: 0, checked: false, value: "Art du récit" },
    { key: 1, checked: false, value: "Atelier" },
    { key: 2, checked: false, value: "Boulevard" },
    { key: 3, checked: false, value: "Café-théâtre" },
    { key: 4, checked: false, value: "Chanson" },
    { key: 5, checked: false, value: "Cirque contemporain" },
    { key: 6, checked: false, value: "Clown" },
    { key: 7, checked: false, value: "Comédie" },
    { key: 8, checked: false, value: "Concert" },
    { key: 9, checked: false, value: "Conférence" },
    { key: 10, checked: false, value: "Conférence-spectacle" },
    { key: 11, checked: false, value: "Conte" },
    { key: 12, checked: false, value: "Cycle d'événements" },
    { key: 13, checked: false, value: "Danse" },
    { key: 14, checked: false, value: "Danse-théâtre" },
    { key: 15, checked: false, value: "Débat" },
    { key: 16, checked: false, value: "Improvisation" },
    { key: 17, checked: false, value: "Lecture" },
    { key: 18, checked: false, value: "Lecture / Causerie" },
    { key: 19, checked: false, value: "Magie" },
    { key: 20, checked: false, value: "Marionnette-objet" },
    { key: 21, checked: false, value: "Mime" },
    { key: 22, checked: false, value: "Performance" },
    { key: 23, checked: false, value: "Pluridisciplinaire" },
    { key: 24, checked: false, value: "Poésie" },
    { key: 25, checked: false, value: "Projection" },
    { key: 26, checked: false, value: "Rencontre" },
    { key: 27, checked: false, value: "Rencontre débat" },
    { key: 28, checked: false, value: "Scène ouverte" },
    { key: 29, checked: false, value: "Seul.e en scène" },
    { key: 30, checked: false, value: "Sketch" },
    { key: 31, checked: false, value: "Spectacle" },
    { key: 32, checked: false, value: "Spectacle musical" },
    { key: 33, checked: false, value: "Stand-up" },
    { key: 34, checked: false, value: "Tables rondes" },
    { key: 35, checked: false, value: "Théâtre citoyen" },
    { key: 36, checked: false, value: "Théâtre classique" },
    { key: 37, checked: false, value: "Théâtre contemporain" },
    { key: 38, checked: false, value: "Théâtre d'objet" },
    { key: 39, checked: false, value: "Théâtre expérimental" },
    { key: 40, checked: false, value: "Théâtre masqué" },
    { key: 41, checked: false, value: "Théâtre musical" },
    { key: 42, checked: false, value: "Tragédie" },
    { key: 43, checked: false, value: "Web TV" },
  ];

  const bgColor = "#f5f5f5";

  const handleStylesRecherches = () => {
    stateData.map((item, index) => {
      //  console.log(item.checked);

      if (item.checked === true) {
        dispatchRecherche({
          type: "ADD_STYLES_RECHERCHES",
          payload: item,
        });
      } else {
        dispatchRecherche({
          type: "DELETE_STYLES_RECHERCHES",
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

  const initialState = [
    { name: "foo", counter: 0 },
    { name: "far", counter: 0 },
    { name: "faz", counter: 0 },
  ];

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
    if (item.checked === false) {
      // 1. Make a shallow copy of the array
      let temp_state = [...stateData];

      // 2. Make a shallow copy of the element you want to mutate
      let temp_element = { ...temp_state[item.key] };

      // 3. Update the property you're interested in
      temp_element.checked = true;

      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      temp_state[item.key] = temp_element;

      // 5. Set the state to our new copy
      setState(uniq(temp_state));
    } else {
      let temp_state = [...stateData];

      // 2. Make a shallow copy of the element you want to mutate
      let temp_element = { ...temp_state[item.key] };

      // 3. Update the property you're interested in
      temp_element.checked = false;

      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      temp_state[item.key] = temp_element;

      // 5. Set the state to our new copy
      setState(uniq(temp_state));
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <AlphabetList
        data={stateData}
        style={{
          padding: 0,
          paddingTop: 40,
          width: "100%",
          backgroundColor: "#e8e8e8",
          flex: 1,
          height: "100%",
          paddingBottom: 200,
        }}
        letterListContainerStyle={{
          height: "50%",
          top: "25%",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "nowrap",
        }}
        indexLetterStyle={{
          fontSize: 12,
          color: "#221f1f",
        }}
        renderCustomItem={(item) => {
          return (
            <View key={item.key}>
              <Pressable
                onPress={() => {
                  //handleStylesRecherches(item)
                  clickButton(item);
                }}
              >
                <View
                  key="container_{item.key} "
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                    //
                    backgroundColor: item.checked
                      ? "#f26522"
                      : "rgba(255,255,255,0)",
                    // backgroundColor: bgColor
                    // backgroundColor: 'rgba(255,255,255,0)'
                  }}
                >
                  <Text style={styles.listItemLabel}>{item.value}</Text>
                </View>
              </Pressable>
            </View>
          );
        }}
        renderCustomSectionHeader={(section) => (
          <View key="section_{section.key}">
            <Text style={styles.sectionHeader}>{section.title}</Text>
          </View>
        )}
      />

      <View
        style={{
          justifyContent: "flex-end",
          flex: 3,
          position: "absolute",
          bottom: 130,
          width: "80%",
          marginLeft: "10%",
        }}
        key="btn_select"
      >
        <Pressable
          onPress={() => {
            handleStylesRecherches();
          }}
        >
          <View style={[styles.labelCard, styles.labelAchat, styles.bigButton]}>
            <Text style={styles.textBigButton}>Valider ma sélection</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
