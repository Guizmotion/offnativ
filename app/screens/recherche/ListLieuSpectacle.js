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

export default function ListLieuSpectacle({ navigation }) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  // const { stateRecherche, dispatchRecherche } = React.useContext(RechercheContext);

  const data = [
    { key: 0, value: "11  AVIGNON", checked: false },
    { key: 1, value: "3 RAISINS", checked: false },
    { key: 2, value: "3 SOLEILS (THÉÂTRE / GALERIE)", checked: false },
    { key: 3, value: "95. AU VERBE FOU, THÉÂTRE LITTÉRAIRE", checked: false },
    { key: 4, value: "ACTUEL (THÉÂTRE)", checked: false },
    { key: 5, value: "ADRESSE (L')", checked: false },
    { key: 6, value: "AF&C TEST", checked: false },
    { key: 7, value: "AL ANDALUS", checked: false },
    { key: 8, value: "ALBATROS", checked: false },
    { key: 9, value: "ALIZÉ ", checked: false },
    { key: 10, value: "ALYA, L'ESPACE", checked: false },
    { key: 11, value: "ALYA, LE CHAPEAU D'ÉBÈNE", checked: false },
    { key: 12, value: "ALYA, LE THÉÂTRE", checked: false },
    { key: 13, value: "AMANTS (THÉÂTRE DES) ", checked: false },
    { key: 14, value: "AMBIGU THÉÂTRE", checked: false },
    { key: 15, value: "ANGE (THÉÂTRE DE L')", checked: false },
    { key: 16, value: "ARCHIPEL THÉÂTRE ", checked: false },
    { key: 17, value: "ARRACHE-CUR (THÉÂTRE DE L')", checked: false },
    { key: 18, value: "ARTÉPHILE", checked: false },
    { key: 19, value: "ARTO", checked: false },
    { key: 20, value: "ATELIER (L') (La Manutention)", checked: false },
    { key: 21, value: "ATELIER 44 (L')", checked: false },
    { key: 22, value: "ATELIER FLORENTIN (THÉÂTRE DE L')", checked: false },
    { key: 23, value: "ATYPIK THÉÂTRE ", checked: false },
    { key: 24, value: "AU BOUT LÀ-BAS (THÉÂTRE)", checked: false },
    { key: 25, value: "AU COIN DE LA LUNE", checked: false },
    { key: 26, value: "AU VIEUX BALANCIER", checked: false },
    { key: 27, value: "AUTRE CARNOT (THÉÂTRE L')", checked: false },
    { key: 28, value: "AVIGNON-REINE BLANCHE", checked: false },
    { key: 29, value: "BALCON (THÉÂTRE DU)", checked: false },
    { key: 30, value: "BARRETTA (THÉÂTRE)", checked: false },
    { key: 31, value: "BARRIQUES (THÉÂTRE DES)", checked: false },
    { key: 32, value: "BÉLIERS (THÉÂTRE DES)", checked: false },
    { key: 33, value: "BO (THÉÂTRE)", checked: false },
    { key: 34, value: "Boulodrome de lIle Piot ", checked: false },
    { key: 35, value: "BOURSE DU TRAVAIL CGT (THÉÂTRE DE LA)", checked: false },
    { key: 36, value: "BRUNES (THÉÂTRE DES)", checked: false },
    { key: 37, value: "BUFFON", checked: false },
    { key: 38, value: "CABESTAN (THÉÂTRE LE)", checked: false },
    { key: 39, value: "CARMES ANDRÉ BENEDETTO (THÉÂTRE DES)", checked: false },
    { key: 40, value: "CARNOT (THÉÂTRE)", checked: false },
    { key: 41, value: "CARRETERIE (THÉÂTRE DE LA)", checked: false },
    { key: 42, value: "CASERNE DES POMPIERS (LA)", checked: false },
    { key: 43, value: "CASTELET (THÉÂTRE LE)", checked: false },
    { key: 44, value: "CENTRE (THÉÂTRE DU) ", checked: false },
    { key: 45, value: "CHAPEAU ROUGE THÉÂTRE", checked: false },
    { key: 46, value: "Chapelle de l'Oratoire", checked: false },
    { key: 47, value: "CHAPELLE DES ITALIENS (LA)", checked: false },
    { key: 48, value: "Chapelle des Templiers", checked: false },
    { key: 49, value: "CHAPELLE DU VERBE INCARNÉ", checked: false },
    {
      key: 50,
      value: "CHÊNE NOIR (THÉÂTRE DU) - Direction Julien Gelas",
      checked: false,
    },
    { key: 51, value: "CHIEN QUI FUME (THÉÂTRE DU) ", checked: false },
    { key: 52, value: "CINÉVOX THÉÂTRE (LE)", checked: false },
    { key: 53, value: "Collection Lambert", checked: false },
    { key: 54, value: "COMÉDIE DU FORUM (LA)", checked: false },
    { key: 55, value: "COMÉDIE DAVIGNON (LA)", checked: false },
    { key: 56, value: "CONDITION DES SOIES", checked: false },
    { key: 57, value: "CONFIDENTIEL THÉÂTRE", checked: false },
    { key: 58, value: "CONTRE COURANT (FESTIVAL)", checked: false },
    { key: 59, value: "CORPS SAINTS (THÉÂTRE DES)", checked: false },
    { key: 60, value: "Cour des Notaires", checked: false },
    { key: 61, value: "COUR DU BAROUF - COUR DES PLATANES", checked: false },
    { key: 62, value: "COUR DU SPECTATEUR (LA)", checked: false },
    { key: 63, value: "DOMS (THÉÂTRE DES)", checked: false },
    { key: 64, value: "ENTREPÔT (L') - Cie Mises en Scène", checked: false },
    { key: 65, value: "ESPACE ROSEAU TEINTURIERS", checked: false },
    { key: 66, value: "ESPACE SAINT MARTIAL", checked: false },
    { key: 67, value: "ESSAÏON-AVIGNON ", checked: false },
    { key: 68, value: "ÉPISCÈNE (THÉÂTRE)", checked: false },
    { key: 69, value: "ÉTINCELLE (THÉÂTRE DE L)", checked: false },
    { key: 70, value: "ÉTOILES (LES)", checked: false },
    { key: 71, value: "FABRIK THÉÂTRE", checked: false },
    { key: 72, value: "FACTORY (LA) - 1-Théâtre de l'Oulle", checked: false },
    { key: 73, value: "FACTORY (LA) - 2-Salle Tomasi", checked: false },
    {
      key: 74,
      value: "FACTORY (LA) - 3-Chapelle des Antonins",
      checked: false,
    },
    { key: 75, value: "GÉMEAUX (THÉÂTRE DES)", checked: false },
    { key: 76, value: "GIRASOLE (THÉÂTRE DU)", checked: false },
    { key: 77, value: "GOLOVINE (THÉÂTRE)", checked: false },
    { key: 78, value: "GRAND PAVOIS (THÉÂTRE LE)", checked: false },
    { key: 79, value: "HALLES (THÉÂTRE DES)", checked: false },
    { key: 80, value: "HIVERNALES (LES) - CDCN d'Avignon", checked: false },
    { key: 81, value: "Hôtel Tonduty de Malijaque", checked: false },
    { key: 82, value: "HUMANUM", checked: false },
    { key: 83, value: "ISLE 80 ", checked: false },
    { key: 84, value: "ÎLOT CHAPITEAUX ", checked: false },
    { key: 85, value: "Jardin de Fogasses", checked: false },
    { key: 86, value: "KABAROUF & Alchimique Village Circus", checked: false },
    { key: 87, value: "LAURETTE THÉÂTRE AVIGNON", checked: false },
    {
      key: 88,
      value: "LÀ ! C'EST DE LA MUSIQUE (CONCERTS EN PLEIN AIR)",
      checked: false,
    },
    {
      key: 89,
      value: "LE FIGUIER POURPRE (Maison de la Poésie d'Avignon)",
      checked: false,
    },
    { key: 90, value: "LE GRENIER À SEL  AIRES NUMÉRIQUES #3", checked: false },
    { key: 91, value: "LE TOTEM - ART, ENFANCE, JEUNESSE", checked: false },
    { key: 92, value: "LE VIEUX SAGE (THÉÂTRE)", checked: false },
    { key: 93, value: "LILA'S (THÉÂTRE DES) ", checked: false },
    { key: 94, value: "LUCIOLES (THÉÂTRE DES)", checked: false },
    { key: 95, value: "LUNA (THÉÂTRE LA)", checked: false },
    { key: 96, value: "MAISON DE LA PAROLE", checked: false },
    { key: 97, value: "MANUFACTURE (LA)", checked: false },
    { key: 98, value: "MARELLE DES TEINTURIERS", checked: false },
    { key: 99, value: "Médiathèque Ceccano", checked: false },
    { key: 100, value: "Mon bar", checked: false },
    { key: 101, value: "NOTRE DAME (THÉÂTRE) ", checked: false },
    { key: 102, value: "NOUVEAU GRENIER (LE)", checked: false },
    { key: 103, value: "OBSERVANCE (THEATRE DE L') ", checked: false },
    {
      key: 104,
      value: "OCCITANIE FAIT SON CIRQUE EN AVIGNON ",
      checked: false,
    },
    { key: 105, value: "OPTIMIST (THÉÂTRE L')", checked: false },
    { key: 106, value: "ORIFLAMME (L')", checked: false },
    { key: 107, value: "PALACE (THÉÂTRE LE)", checked: false },
    { key: 108, value: "PALAIS DU RIRE", checked: false },
    { key: 109, value: "PARADISE RÉPUBLIQUE", checked: false },
    { key: 110, value: "PARENTHÈSE (LA)", checked: false },
    { key: 111, value: "PARIS (LE)", checked: false },
    { key: 112, value: "PETIT CHIEN (THÉÂTRE LE)", checked: false },
    { key: 113, value: "PETIT LOUVRE (TEMPLIERS)", checked: false },
    { key: 114, value: "PETIT LOUVRE (Van Gogh)", checked: false },
    { key: 115, value: "PETITE CASERNE (LA)", checked: false },
    {
      key: 116,
      value: "PETITES FORMES (MONTFAVET - FESTIVAL LES)",
      checked: false,
    },
    { key: 117, value: "PIERRE DE LUNE", checked: false },
    { key: 118, value: "PIXEL AVIGNON", checked: false },
    { key: 119, value: "PIXEL AVIGNON SALLE BAYAF", checked: false },
    { key: 120, value: "POLE CULTUREL JEAN FERRAT", checked: false },
    { key: 121, value: "PORTE SAINT MICHEL (THÉÂTRE DE LA)", checked: false },
    { key: 122, value: "Pôle Théâtre et Marionnette", checked: false },
    { key: 123, value: "PRÉSENCE PASTEUR", checked: false },
    { key: 124, value: "REMPART (THÉÂTRE DU)", checked: false },
    { key: 125, value: "ROI RENÉ (THÉÂTRE DU)", checked: false },
    { key: 126, value: "ROTONDE (THÉÂTRE DE LA)", checked: false },
    { key: 127, value: "ROUGE GORGE", checked: false },
    { key: 128, value: "SCALA PROVENCE (LA)", checked: false },
    { key: 129, value: "SCIERIE (LA)", checked: false },
    { key: 130, value: "SHAM'S THÉÂTRE", checked: false },
    { key: 131, value: "TACHE D'ENCRE (THÉÂTRE DE LA)", checked: false },
    { key: 132, value: "TRAIN BLEU (THÉÂTRE DU)", checked: false },
    { key: 133, value: "TRANSVERSAL (THÉÂTRE)", checked: false },
    { key: 134, value: "TREMPLIN - Salle Les Baladins", checked: false },
    { key: 135, value: "TREMPLIN - Salle Molière ", checked: false },
    { key: 136, value: "VENTS (THÉÂTRE DES)", checked: false },
    { key: 137, value: "VILLENEUVE EN SCÈNE (FESTIVAL)", checked: false },
  ];

  const bgColor = "#f5f5f5";

  const handleLieusRecherches = () => {
    stateData.map((item, index) => {
      //console.log(item.checked);

      if (item.checked === true) {
        dispatch({
          type: "ADD_LIEUS_RECHERCHES",
          payload: item,
        });
      } else {
        dispatch({
          type: "DELETE_LIEUS_RECHERCHES",
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
    console.log(item.value);

    if (item.checked === false) {
      // 1. Make a shallow copy of the array
      let temp_state = [...stateData];

      // 2. Make a shallow copy of the element you want to mutate
      let temp_element = { ...temp_state[item.key] };

      // 3. UpAuteur the property you're interested in
      temp_element.checked = true;

      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      //temp_state[0] = temp_element;
      //console.log(	temp_element);
      temp_state[item.key] = temp_element;

      // 5. Set the state to our new copy
      setState(uniq(temp_state));
    } else {
      let temp_state = [...stateData];

      // 2. Make a shallow copy of the element you want to mutate
      let temp_element = { ...temp_state[item.key] };

      // 3. UpAuteur the property you're interested in
      temp_element.checked = false;

      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      //temp_state[0] = temp_element;
      // console.log(	temp_element);
      temp_state[item.key] = temp_element;

      // 5. Set the state to our new copy
      setState(uniq(temp_state));
    }
  };

  /*
  
  let fil = '';
  useEffect(() => {
    //fil = data;
    
    
  }, {stateData});
  
  */

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
            handleLieusRecherches();
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
