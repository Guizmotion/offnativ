import React, { useEffect, useState } from "react";
import {
  Linking,
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

import { useRoute } from "@react-navigation/native";

import styles from "../config/styles/StyleGeneral";

import axios from "axios";

// import { StoreContext } from "../store/store";
// import { FavorisContext } from "../store/storeFavoris";
import { useDispatch, useSelector } from "react-redux";

export default function ProfilMenu({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  // const { state, dispatch } = React.useContext(StoreContext);
  // const { stateFavoris, dispatchFavoris } = React.useContext(FavorisContext);

  const route = useRoute();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [nom, setNom] = useState("");
  const [isLogged, setIsLogged] = useState("");

  const deconnexion = async () => {
    try {
      console.log("dispatch logout");
      dispatch({
        type: "LOGOUT",
      });
      navigation.navigate("Login");
    } catch (exception) {
      console.log(exception);
    }
  };

  const favoris = () => {
    navigation.navigate("Favoris");
  };

  useEffect(() => {
    axios
      .get("https://api.festivaloffavignon.com/favorite", {
        headers: {
          "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
          token: state.token,
        },
      })
      .then((response) => {
        console.log("query fav: " + response.data.favoris);

        dispatch({
          type: "SET_FAVORITES",
          //SET_FAVORITE
          payload: response.data.favoris,
        });

        dispatch({
          type: "SELECT_FAVORITES",
          //SET_FAVORITE
          payload: response.data.favoris,
        });
      });
    console.log("favoris enregistrés");
  }, []);

  //test test 2 test Teste2

  return (
    <View style={{ width: "100%", backgroundColor: "#fff", padding:20, height: '100%',  paddingTop: 0}}>
         

<ScrollView style={{height: '100%', width: '100%', display: 'flex'}}>

      {/*
  {state.isAuthenticated && (
    <Text style={{fontSize: 20}}>Bonjour {state.user.prenom}</Text>
    
  )}*/}

      <View style={[styles.blocGris, styles.flexColumn]}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={[styles.colorOrange, styles.ParagraphBold]}>
            Personnel
          </Text>
        </View>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <Pressable
            onPress={() => {
              navigation.navigate("ModifierProfil");
            }}
            style={{
              width: "100%",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                resizeMode: "cover",
                height: 35,
                width: 35,
                alignItems: "flex-start",
              }}
              source={require("../assets/profil-profil.png")}
            />
            <Text style={{ alignItems: "center" }}>Mon profil</Text>
            <Image
              style={{
                resizeMode: "cover",
                height: 35,
                width: 35,
                position: "absolute",
                right: 0,
              }}
              source={require("../assets/next.png")}
            />
          </Pressable>
        </View>

        <View style={styles.SeparateurSmall}></View>
        <View>
          <Pressable
            onPress={favoris}
            style={{
              width: "100%",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                resizeMode: "cover",
                height: 35,
                width: 35,
                alignItems: "flex-start",
              }}
              source={require("../assets/profil-favoris.png")}
            />
            <Text style={{ alignItems: "center" }}>Mes favoris</Text>
            <Image
              style={{
                resizeMode: "cover",
                height: 35,
                width: 35,
                position: "absolute",
                right: 0,
              }}
              source={require("../assets/next.png")}
            />
          </Pressable>
        </View>
      </View>

      <View >
        <View style={[styles.blocGris, styles.flexColumn]}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={[styles.colorOrange, styles.ParagraphBold]}>
              Mes réservations & cartes
            </Text>
          </View>

          <View style={{ width: "100%", flexDirection: "row" }}>
            <Pressable
              onPress={() => {
                navigation.navigate("ShoppingCart");
              }}
              style={{
                width: "100%",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  resizeMode: "cover",
                  height: 35,
                  width: 35,
                  alignItems: "flex-start",
                }}
                source={require("../assets/profil-panier.png")}
              />
              <Text style={{ alignItems: "center" }}>Mon panier</Text>
              <Image
                style={{
                  resizeMode: "cover",
                  height: 35,
                  width: 35,
                  position: "absolute",
                  right: 0,
                }}
                source={require("../assets/next.png")}
              />
            </Pressable>
          </View>
          <View style={styles.SeparateurSmall}></View>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <Pressable
              onPress={() => {
                navigation.navigate("PlacesSpectacles");
              }}
              style={{
                width: "100%",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  resizeMode: "cover",
                  height: 35,
                  width: 35,
                  alignItems: "flex-start",
                }}
                source={require("../assets/profil-ticketoff.png")}
              />
              <Text style={{ alignItems: "center" }}>
                {" "}
                Mes places de spectacles
              </Text>
              <Image
                style={{
                  resizeMode: "cover",
                  height: 35,
                  width: 35,
                  position: "absolute",
                  right: 0,
                }}
                source={require("../assets/next.png")}
              />
            </Pressable>
          </View>

          <View style={styles.SeparateurSmall}></View>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <Pressable
              onPress={() => {
                navigation.navigate("CartesAbonnement");
              }}
              style={{
                width: "100%",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  resizeMode: "cover",
                  height: 35,
                  width: 35,
                  alignItems: "flex-start",
                }}
                source={require("../assets/profil-carte.png")}
              />
              <Text style={{ alignItems: "center" }}>
                {" "}
                Mes cartes d'abonnement
              </Text>
              <Image
                style={{
                  resizeMode: "cover",
                  height: 35,
                  width: 35,
                  position: "absolute",
                  right: 0,
                }}
                source={require("../assets/next.png")}
              />
            </Pressable>
          </View>
          <View style={styles.SeparateurSmall}></View>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <Pressable
              onPress={() => {
                navigation.navigate("Factures");
              }}
              style={{
                width: "100%",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  resizeMode: "cover",
                  height: 35,
                  width: 35,
                  alignItems: "flex-start",
                }}
                source={require("../assets/profil-factures.png")}
              />
              <Text style={{ alignItems: "center" }}>Mes factures</Text>
              <Image
                style={{
                  resizeMode: "cover",
                  height: 35,
                  width: 35,
                  position: "absolute",
                  right: 0,
                }}
                source={require("../assets/next.png")}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={[styles.blocGris, styles.flexColumn]}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <Pressable
            onPress={() =>
              Linking.openURL("https://appli.ovh/off/programme2022.pdf")
            }
            style={{
              width: "100%",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                resizeMode: "cover",
                height: 35,
                width: 35,
                alignItems: "flex-start",
              }}
              source={require("../assets/profil-pdf.png")}
            />
            <Text style={{ alignItems: "center" }}>Programme PDF</Text>

            <Image
              style={{
                resizeMode: "cover",
                height: 35,
                width: 35,
                position: "absolute",
                right: 0,
              }}
              source={require("../assets/next.png")}
            />
          </Pressable>
        </View>
      </View>

      {/*state.isAuthenticated && (
    
    <Text style={{fontSize: 20}}>Token : {state.token}</Text>
    
  )*/}

</ScrollView>
<View style={{   flex: 2, position: 'absolute', bottom: 120, width: '80%', marginLeft: '15%' }} >
    <Image
          source={require("../assets/logo.png")}
          style={{
            position: "absolute",
            right: 10,
            width: 100,
            height: 100,
            bottom: 20,
          }}
        />

        <Pressable
          onPress={deconnexion}
          style={[styles.labelCard, styles.labelAchat, styles.bigButton]}
        >
          <Text style={styles.textBigButton}>Déconnexion</Text>
        </Pressable>

        {/*<Button title="Déconnexion" onPress={deconnexion} /> */}
      </View>
    </View>
  );
}
