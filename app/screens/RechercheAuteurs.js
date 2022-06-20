import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  SectionList,
  View,
  StyleSheet,
  searchText,
  ScrollViewButton,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import { ActivityIndicator, ToastAndroid } from "react-native";
import { Image as ImgLazy } from "react-native-elements";
import { Detail } from "./Detail";
import { Card, List } from "react-native-paper";

import WebView from "react-native-webview";
import styles from "../config/styles/StyleGeneral";

export default function RechercheAuteurs() {
  console.log("rechercheauteurs");
  return (
    <View style={{ width: "100%", backgroundColor: "#fff", height: "100%" }}>
      <View
        style={{
          padding: 20,
          paddingTop: 40,
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View style={{ width: "20%" }}>
          <Image
            style={{
              resizeMode: "cover",
              height: 25,
              width: 25,
            }}
            source={require("../assets/recherche-black.png")}
          />
        </View>
        <View style={{ width: "60%", alignItems: "center" }}>
          <Text style={[styles.titrePage, styles.alignCenter]}>Rechercher</Text>
        </View>

        <View style={{ width: "30%", alignItems: "flex-end", right: 0 }}>
          <Pressable
            style={styles.alignCenter}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Image
              style={{
                resizeMode: "cover",
                height: 25,
                width: 25,
              }}
              source={require("../assets/closemenu.png")}
            />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          padding: 0,
          paddingTop: 40,
          flexDirection: "row",
          width: "100%",
          backgroundColor: "#e8e8e8",
          flex: 1,
        }}
      >
        <SectionList
          sections={[
            { title: "A", data: ["Andrew", "Anabelle", "Annie"] },
            { title: "B", data: ["Bernard", "Benoit", "Boris"] },
            { title: "C", data: ["Carl", "Carole", "Cris"] },
            { title: "D", data: ["Devin", "Dan", "Dominic"] },
            { title: "E", data: ["Elene", "Eléanore"] },
            { title: "F", data: ["Fabrice", "Fil", "Faucette"] },
            { title: "G", data: ["Gabriel", "Gab", "Georges"] },
            { title: "H", data: ["Henri", "Harry"] },
            { title: "I", data: ["Ismael", "Isidore", "Ignace"] },
            {
              title: "J",
              data: [
                "Jackson",
                "James",
                "Jillian",
                "Jimmy",
                "Joel",
                "John",
                "Julie",
              ],
            },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          // Ajouter la version selectionnée avec class : selectItem
          keyExtractor={(item, index) => index}
        />
      </View>
      <View style={styles.rechInitGlobal}>
        <FlatList
          data={[
            { key: "A" },
            { key: "B" },
            { key: "C" },
            { key: "D" },
            { key: "E" },
            { key: "F" },
            { key: "G" },
            { key: "H" },
            { key: "I" },
            { key: "J" },
            { key: "K" },
            { key: "L" },
            { key: "M" },
            { key: "N" },
            { key: "O" },
            { key: "P" },
            { key: "Q" },
            { key: "R" },
            { key: "S" },
            { key: "T" },
            { key: "U" },
            { key: "V" },
            { key: "W" },
            { key: "X" },
            { key: "Y" },
            { key: "Z" },
          ]}
          renderItem={({ item }) => (
            <Text style={[styles.item, styles.itemInit]}>{item.key}</Text>
          )}
        />
      </View>

      <View style={{ justifyContent: "flex-end", backgroundColor: "none" }}>
        <View style={[styles.labelCard, styles.labelAchat, styles.btnFixed]}>
          <Text style={styles.textBigButton}> Afficher les résultats</Text>
        </View>
      </View>
    </View>
  );
}
