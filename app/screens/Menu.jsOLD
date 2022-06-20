// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  Dimensions,
  Share,
  SafeAreaView,
  View,
  Pressable,
  StyleSheet,
  Image,
  Button,
  Text,
  Linking,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";

import axios from "axios";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../config/styles/StyleGeneral";

import { version_app_offnativ } from "../../package.json";
import { useDispatch, useSelector } from "react-redux";

//var pkg = require('../package.json');
//console.log(pkg.version_app_offnativ);

const Menu = (props) => {
  const state = useSelector((state) => state.user);

  const [Publicite, setPublicite] = useState([]);

  const BASE_PATH = "https://www.appli.ovh/off/web/img/";
  const proileImage = "logo.png";

  function share() {
    Share.share(
      {
        message:
          "Voici le lien vers la nouvelle application du festival off avignon",
        url: "https://play.google.com/store/apps/details?id=com.nympheastudio.off",
        title: "Application Android",
      },
      {
        // Android only:
        dialogTitle: "Partager l'application du festival off avignon",
        // iOS only:
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
      }
    );
  }

  function redirectUser() {
    if (state.isAuthenticated) {
      return props.navigation.navigate("ProfilMenu");
    } else {
      return props.navigation.navigate("Login");
    }
  }

  async function getPublicite() {
    // exact raw URL, no need to append an extra .json extension
    const { data } = await axios.get(
      "https://appli.ovh/off/app/api2022.php?a=16"
    );

    return data;
  }

  const delayChangePub = 5000;

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      getPublicite().then((data) => {
        const rndIdPub = Math.floor(Math.random() * 3);
        //console.log("rndIdPub : " + rndIdPub);

        let pub = data[rndIdPub].split("|");

        if (pub) {
          let image = "https://appli.ovh/off/app/img/" + pub[0];
          let url = pub[1];

          setPublicite(
            <Pressable
              onPress={() => Linking.openURL(url)}
              style={{ width: "100%" }}
            >
              <Image
                style={{
                  width: "100%",
                  height: 140,
                }}
                source={{ uri: image }}
              />
            </Pressable>
          );
        }
      });
    }, delayChangePub);
    return () => clearInterval(interval);
  }, [Publicite]);

  return (
    <View
      {...props}
      style={{
        width: "100%",
        height: "100%",
        bottom: 0,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingTop: "20%",
      }}
    >
      {/*Top Large Image */}

      <Pressable
        onPress={() => props.navigation.closeDrawer()}
        style={styles.closeMenu}
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

      <Image
        source={{ uri: BASE_PATH + proileImage }}
        style={styles.sideMenuProfileIcon}
      />

      {/*   <DrawerItemList {...props} /> */}

      <View style={{ marginTop: -15, width: "85%", marginLeft: 10 }}>
        <Pressable
          onPress={async () => {
            await redirectUser();
          }}
        >
          <View style={[styles.labelCard, styles.btnBig, styles.labelAchat]}>
            <Text style={styles.textBigButton}> Mon compte</Text>
            <Image
              style={{
                resizeMode: "cover",
                height: 25,
                width: 25,
              }}
              source={require("../assets/next-white.png")}
            />
          </View>
        </Pressable>
      </View>

      <DrawerItem
        style={styles.lienMenu}
        label="Programme / Billetterie"
        onPress={() => props.navigation.navigate("Programme")}
      />

      <DrawerItem
        style={styles.lienMenu}
        label="Actualités / Agenda"
        onPress={() => props.navigation.navigate("Actualites")}
      />

      <DrawerItem
        style={styles.lienMenu}
        label="Plan interactif"
        onPress={() => props.navigation.navigate("Carte")}
      />

      <DrawerItem
        style={styles.lienMenu}
        label="Carte d'abonnement"
        onPress={() => props.navigation.navigate("CarteAbonnementWebview")}
      />

      <DrawerItem
        style={styles.lienMenu}
        label="La fondation"
        onPress={() => props.navigation.navigate("Fondation")}
      />

      {/*         

         <DrawerItem
      style={styles.lienMenu}
      label="Panier"
      onPress={() => props.navigation.navigate('CartPage')}
      />
        
        <DrawerItem
        style={styles.lienMenu}
        label="lien externe"
        onPress={() => Linking.openURL('https://google.com/')}
        />
        
        
        
        <View style={styles.customItem}>
        <Text
        onPress={() => {
          ToastAndroid.show('Afficher un Toast',2000);
        }}>
        Afficher un Toast
        </Text>
        <Image
        source={{uri: BASE_PATH + 'star_filled.png'}}
        style={styles.iconStyle}
        />
        </View>
      */}

      <View style={{ flex: 1, justifyContent: "flex-end" }}></View>
      <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 230 }}>
        <View
          style={{
            flexDirection: "row",
            width: "70%",
            marginLeft: "10%",
            justifyContent: "space-between",
            paddingBottom: 10,
          }}
        >
          <Pressable
            onPress={async () => {
              await share();
            }}
            style={styles.iconStyle}
          >
            <Image
              style={{
                resizeMode: "cover",
                width: 35,
                height: 35,
              }}
              source={require("../assets/partage.png")}
            />
          </Pressable>

          <Pressable
            onPress={() => props.navigation.navigate("Partenaires")}
            style={styles.iconStyle}
          >
            <Image
              style={{
                resizeMode: "cover",
                width: 35,
                height: 35,
              }}
              source={require("../assets/partenaires.png")}
            />
          </Pressable>
          <Pressable onPress={async () => {}} style={styles.iconStyle}>
            <Image
              style={{
                resizeMode: "cover",
                width: 35,
                height: 35,
              }}
              source={require("../assets/programme.png")}
            />
          </Pressable>
          <Pressable
            // onPress={() => props.navigation.navigate("Annonces")}
            onPress={() =>
              Linking.openURL(
                "https://www.festivaloffavignon.com/plateforme-solidaire/"
              )
            }
            style={styles.iconStyle}
          >
            <Image
              style={{
                resizeMode: "cover",
                width: 35,
                height: 35,
              }}
              source={require("../assets/sociaux.png")}
            />
          </Pressable>

          <Pressable
            // onPress={() => props.navigation.navigate("Archives")}
            onPress={() =>
              Linking.openURL(
                "https://www.festivaloffavignon.com/archives-et-ressources/"
              )
            }
            style={styles.iconStyle}
          >
            <Image
              style={{
                resizeMode: "cover",
                width: 35,
                height: 35,
              }}
              source={require("../assets/download.png")}
            />
          </Pressable>
        </View>
        <Pressable
          onPress={() =>
            Linking.openURL(
              "https://www.festivaloffavignon.com/mentions-legales/"
            )
          }
        >
          <Text style={[styles.smallTextNoir, styles.alignCenter]}>
            festivaloffavignon - V {version_app_offnativ} - Mentions légales
          </Text>
        </Pressable>
        <View
          style={{
            width: "90%",
            height: "auto",
            margin: 0,
            marginTop: 20,
            marginLeft: "5%",
            // marginRight: "5%",
            borderTopLeftRadius: 15,
            overflow: "hidden",
            borderTopRightRadius: 15,
            bottom: 0,
            // backgroundColor: "red",
          }}
        >
          {Publicite}
          {/* <Pressable onPress={() => Linking.openURL('https://www.festivaloffavignon.com/')}  >
           
              <Image
                style={{
                  resizeMode: "cover",
                  width: 260,
                  height: 110,
                }}
                source={require("../assets/off-les-murs-bandeau.jpg")}
              />

              </Pressable>
              */}
        </View>
      </View>
    </View>
  );
};

export default Menu;
