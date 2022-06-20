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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from 'expo-storage';


import {CartesAbonnementContext} from "../../store/storeCartesAbonnement";
import { NavigationContainer } from "@react-navigation/native";

import RNPickerSelect from "react-native-picker-select";
import styles from "../../config/styles/StyleGeneral";

import * as ImagePicker from 'expo-image-picker';

export default function CreerCarteAbonnement({ navigation }) {
  
  
  const { stateCartesAbonnement, dispatchCartesAbonnement } = React.useContext( CartesAbonnementContext );
  
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [CodePostal, setCodePostal] = useState("");
  const [Ville, setVille] = useState("");
  const [Pays, setPays] = useState("France");
  const [Telephone, setTelephone] = useState("");
  const [livraison, setLivraison] = useState("");
  const [photo, setPhoto] = useState("");
  const [image, setImage] = useState(null);
 const [statut, setStatut] = useState("");
 const [numero_carte, setNumeroCarte] = useState("");
 const [code_promo, setCodePromo] = useState("");
 const [structure, setStructure] = useState("");
 const [birthday, setBirthday] = useState("");
 const [card_type_id, setCard_type_id] = useState("");
 const [skip_step, setSkip_step] = useState("");
 const [transport_card, setTransport_card] = useState("");
 const [culture_card, setCulture_card] = useState("");
 const [partner_festival, setPartner_festival] = useState("");
 const [reduced_card, setReduced_card] = useState("");

  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    //  let result = await ImagePicker.launchImageLibraryAsync({
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.3,
      base64: true,
      
    });
    
    console.log(result);
    
    if (!result.cancelled) {
      setImage( result.uri);
      setPhoto(result.base64);
      //'data:image/jpeg;base64,'
    }
  };
  
  
  const addCarteAbonnement = async() => {
    
    // AsyncStorage.setItem("CartesAbonnement", JSON.stringify(stateCartesAbonnement.Cartes));
    
    
    console.log("CartesAbonnement saved");
    
    
    const carteAbonnement = {

      "fes_id": 22,
      "id": stateCartesAbonnement.Cartes.length + 1,
      "statut" : statut,
      "numero_carte" : numero_carte,
      "code_promo": code_promo,
      "structure": structure,
      "nom" : Nom,
      "prenom" : Prenom,
      "adresse" : Adresse,
      "ville" : Ville,
      "codePostal" : CodePostal,
      "telephone" : Telephone,
      "pays" : Pays,
      "livraison" : livraison,
      "photo": photo,

      "birthday" : birthday,
      "card_type_id" : card_type_id,
      "skip_step" : skip_step,
      
      "transport_card" : transport_card,
      "culture_card" :culture_card,
      "partner_festival" : partner_festival,
      "reduced_card" :reduced_card
    }
    
    dispatchCartesAbonnement({type: "ADD_CARTE_ABONNEMENT", payload: carteAbonnement})
    
    
      
    
    
    
    navigation.navigate("CartesAbonnement");
  }
  
  useEffect(() => {
    
    
    //add values to async storage
    
    
    
    
  }, [stateCartesAbonnement.Cartes]);
  
  
  
/*
Le fonctionnement serait le suivant :

CARTES PANIER  Obtention pour obtenir les cartes en cours

CARTES PANIER Choix carte (Qui en fonction des critères , détermine la carte à créer : normale, 12/15, transport, tarif réduit, culture et le tarif associé)

CARTES PANIER Ajout carte pour ajouter la carte au panier en cours

CARTES PANIER Validation  pour verrouiller la panier et interdire l’ajout de nouvelles cartes avant paiement

Après il faudrait basculer sur la page de paiement à créer

 

CARTES PANIER Annulation permet de déverrouiller le panier et ajouter à nouveau des cartes

*/





return (
  
  <View
  
  style={{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: "0%",
  }}
  
  key="creerCartesAbonnement"
  >
  <ScrollView>
  <Text style={{ fontSize: 20 }}>Créer une carte d'abonnement</Text>
  <Text style={{ fontSize: 20 }}>Type de carte</Text>
  
  <RNPickerSelect
  
  
  value={card_type_id}
  onValueChange={(value) =>
    {
      setCard_type_id(value);
      //setFieldValue("type_public", value)
      
    }
  }
  
  items={[
    { label: "Normale", value: "Normale," },
    { label: "12/15", value: "12/15" },
    { label: "transport", value: "transport" },
    { label: "tarif réduit", value: "tarif réduit" },
    { label: "culture", value: "culture" },
  ]}
  />

  <Text style={{ fontSize: 20 }}>Nom</Text>
  <TextInput
  
  style={{
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
  }}
  onChangeText={(text) => setNom(text)}
  value={Nom}
  />
  
  <Text style={{ fontSize: 20 }}>Prenom</Text>
  <TextInput
  
  style={{
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
  }}
  onChangeText={(text) => setPrenom(text)}
  value={Prenom}
  />
  
  <Text style={{ fontSize: 20 }}>Adresse</Text>
  <TextInput
  style={{
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
  }}
  onChangeText={(text) => setAdresse(text)}
  value={Adresse}
  />
  
  <Text style={{ fontSize: 20 }}>Code postal</Text>
  <TextInput
  style={{
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
  }}
  onChangeText={(text) => setCodePostal(text)}
  value={CodePostal}
  />
  
  <Text style={{ fontSize: 20 }}>Ville</Text>
  <TextInput
  style={{
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
  }}
  onChangeText={(text) => setVille(text)}
  value={Ville}
  />
  <Text style={{ fontSize: 20 }}>Telephone</Text>
  <TextInput
  keyboardType={'phone-pad'}
  style={{
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
  }}
  onChangeText={(text) => setTelephone(text)}
  value={Telephone}
  />
  <Text style={{ fontSize: 20 }}>Pays</Text>
  
  <RNPickerSelect
  //style={pickerStyle}
  
  
  placeholder={{
    label: Pays,
    value: Pays,
  }}
  
  
  value={Pays}
  onValueChange={(value) =>
    {
      setPays(value);
      //setFieldValue("type_public", value)
      
    }
  }
  
  items={[
    { label: "France", value: "France" },
    { label: "Belgique", value: "Belgique" },
    { label: "USA", value: "USA" },
    // { label: "Public non francophone", value: "Public non francophone", },
  ]}
  />
  
  
  
  <Text style={{ fontSize: 20 }}>Livraison</Text>
  
  <RNPickerSelect
  //style={pickerStyle}
  
  
  placeholder={{
    label: livraison,
    value: livraison,
  }}
  
  
  value={livraison}
  onValueChange={(value) =>
    {
      setLivraison(value);
      //setFieldValue("type_public", value)
      
    }
  }
  
  items={[
    { label: "Sur place", value: "Sur place" },
    { label: "A distance", value: "A distance" },
    { label: "test", value: "test" },
    // { label: "Public non francophone", value: "Public non francophone", },
  ]}
  />
  <Button 
  title="Prendre une photo" onPress={pickImage} />
  {image && <Image source={{ uri: image }} style={{ width: 20, height: 20 }} />}
  <Button
  title="Créer"
  onPress={() => {
    
    addCarteAbonnement();
    
  }}
  />
  </ScrollView>
  </View>
  
  
  
  );
  
}