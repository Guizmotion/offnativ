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
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from "react-native-picker-select";
import styles from "../../config/styles/StyleGeneral";

import * as ImagePicker from 'expo-image-picker';
import Checkbox from "expo-checkbox";
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

 const [modalVisible, setModalVisible] = useState(false);

 const [ModalJustifVisible, setModalJustifVisible] = useState(false);
  
 
 const handleJustificatif = (event) => {
  setModalVisible(!modalVisible);
  let m = "Génération de nouveau mot de passe en cours...";
  "ios" === Platform.OS
  ? Toast.show(m, Toast.SHORT)
  : ToastAndroid.show(m, ToastAndroid.SHORT);
};


 const pickerStyle = {
  inputIOS: {
    textAlign: "right",
    marginRight: 20,
    height: 50,
  },
};
const [date, setDate] = useState('20-06-2022');
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
    flexDirection: "column",
    width: "90%",
    margin: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    height: "100%",
  }}
  
  key="creerCartesAbonnement"
  >
  <ScrollView style={{ flex: 1 }}>
  <Text style={styles.ParagraphBold}>Vos informations</Text>
  
  
  <TextInput
  style={styles.inputStyle}
  onChangeText={(text) => setPrenom(text)}
  value={Prenom}
  placeholder="Prénom * "  placeholderTextColor="rgba(0,0,0,0.3)" 
  />
  <TextInput
  style={styles.inputStyle}
  onChangeText={(text) => setNom(text)}
  value={Nom}
  placeholder="Nom * "  placeholderTextColor="rgba(0,0,0,0.3)" 
  />
<DatePicker
        style={styles.inputStyle}
        //date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirmer"
        cancelBtnText="Annuler"
        customStyles={{
          dateIcon: {
            display: 'none',
          },
          dateInput: {
            borderColor: 'rgba(0,0,0,0)',
          },
          placeholderText: {
            textAlign: 'left',
            width: '100%',
          },
          // ... You can check the source to find the other keys.
        }}
        //onDateChange={(date) => {this.setState({date: date})}}
      />

  <TextInput
  style={styles.inputStyle}
  onChangeText={(text) => setCodePostal(text)}
  value={CodePostal}
  placeholder="Code postal * "  placeholderTextColor="rgba(0,0,0,0.3)" 
  />
  
  <View
    style={{
      padding: 15,
      flexDirection: "row",
      alignContent: "space-between",
      alignItems: "center",
      width: '100%',
      height: 45,
      borderRadius: 35,
      backgroundColor: '#e9e8e8',
      paddingRight:  20,
      paddingLeft: 20,
      marginTop: 10,
      marginBottom: 10,
    }}
  >
    <Text>Pays</Text>
    <View
      style={{
        width: "70%",
        right: 0,
        position: "absolute",
        minHeight: 30,
      }}
    >
      <RNPickerSelect
      style={pickerStyle}
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
      placeholder={{
        label: "Sélectionner votre Pays",
        value: "",
      }}
      
      items={[
        { label: "France", value: "France" },
        { label: "Belgique", value: "Belgique" },
        { label: "USA", value: "USA" },
        // { label: "Public non francophone", value: "Public non francophone", },
      ]}
      />
    </View>
  </View>


  <View
    style={{
      padding: 15,
      flexDirection: "row",
      alignContent: "space-between",
      alignItems: "center",
      width: '100%',
      height: 45,
      borderRadius: 35,
      backgroundColor: '#e9e8e8',
      paddingRight:  20,
      paddingLeft: 20,
      marginTop: 10,
      marginBottom: 10,
    }}
  >
    <Text>Carte *</Text>
    <View
      style={{
        width: "90%",
        right: 0,
        position: "absolute",
        minHeight: 30,
      }}
    >
      <RNPickerSelect
      style={pickerStyle}
        value={card_type_id}
        onValueChange={(value) =>
          {
            setCard_type_id(value);
            //setFieldValue("type_public", value)

            
          }
        }
        placeholder={{
          label: "Je bénéficie d'un tarif préférentiel ?",
          value: "",
        }}
        
        items={[
          { label: "Plein tarif", value: "Plein tarif" },
          { label: "Résidents (Gd Avignon, Vaucluse & ORIZO)", value: "Residents" },
          { label: "Jeunes 12-25 ans", value: "Jeunes" },
          { label: "Tarif réduit (RSA, PSH, Sans emploi)", value: "reduit" },
          { label: "Pass Culture / Patch Culture", value: "culture" },
        ]}
        />

    </View>
  </View>





  <Pressable
  // A MASQUER SI ON CLIQUE SUR PLEIN TARIF SUR LE CHAMP card-type_id
  onPress={() => setModalJustifVisible(!ModalJustifVisible)}
  >
    <View  style={[styles.labelCard,styles.bigButton, {marginBottom: 10}]} >
                <Text style={{color: '#fff', textAlign: 'center', width: '100%'}}>Ajouter mon justificatif </Text></View>
</Pressable>
            


  <Modal
            animationType={'slide'}
            hardwareAccelerated={true}
            transparent={false}
            visible={ModalJustifVisible}
            
            onRequestClose={() => {
              //Alert.alert('Modal has been closed.');
              setModalJustifVisible(!ModalJustifVisible);
              
            }}>
            
            
            <View style={{ margin: 0, height: '100%', padding: 30, paddingTop: 100 }}>
            <Text  style={{fontSize: 16,width: "100%",fontWeight: "bold", textAlign: "center"}}>Télécharger mon justificatif</Text>
            
            
            <TextInput
            style={styles.inputStyle}
            //onChangeText={(text) => DownloadJustificatif(text)}
            //value={DownloadJustificatif}
            placeholder="Charger le justificatif"  placeholderTextColor="rgba(0,0,0,0.3)" 
            />



<View style={{backgroundColor: '#e8e8e8', padding: 15, borderRadius: 15, marginBottom: 10}}>
<Text style={[styles.ParagraphBold, styles.smallTextNoirDix]}>Attention ! Cliquer sur Valider vaut acceptation de ceci :</Text>
<Text style={styles.smallTextNoirDix}>• J’accepte de fournir un scan de mon justificatif domicile de moins de 3 mois pour accéder à ce tarif. </Text>
<Text style={styles.smallTextNoirDix}>• Tous les justificatifs sont vérifiés avant édition de la carte et vous devrez payer un complément si ceux-ci ne sont pas valables.</Text>
<Text style={styles.smallTextNoirDix}>• Ce document justificatif sera stocké sur un serveur sécurisé et sera supprimé au plus tard le 5 août 2022.</Text>
</View>

<View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 25,
                            marginBottom: 10,
                          }}
                          >
<Checkbox
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginRight: 10,
                          }}
                          //value={isChecked}
                          //onValueChange={setChecked}
                          //color={isChecked ? "#f26522" : undefined}
                          />
        <Text style={[styles.moyenText, {maxWidth: '90%'}]}
                          >Je ne souhaite pas fournir de justificatif et <Text style={styles.ParagraphBold}>accepte de payer ma carte au plein tarif (16 €)</Text></Text>
      </View>




            
            <TouchableOpacity onPress={() => setModalJustifVisible(!ModalJustifVisible)}           >
            <View  style={[styles.labelCard, styles.labelAchat, styles.bigButton]} >
            <Text style={styles.textBigButton}>Envoyer</Text>
            </View>
            </TouchableOpacity>
            
            
            
          
          
          
          
          
          
          
          
          
          
          </View>
          </Modal>
  









  <Pressable
  onPress={pickImage} 
  >
    <View  style={[styles.labelCard,styles.bigButton]} >
                <Text style={{color: '#fff', textAlign: 'center', width: '100%'}}>Prendre ma photo</Text></View>
</Pressable>


    {image && <Image source={{ uri: image }} style={{ width: 20, height: 20 }} />}











<View>
    <Text style={[styles.ParagraphBold, {marginTop: 20}]}>Comment je récupère ma carte ?</Text></View>
  <View
    style={{
      padding: 15,
      flexDirection: "row",
      alignContent: "space-between",
      alignItems: "center",
      width: '100%',
      height: 45,
      borderRadius: 35,
      backgroundColor: '#e9e8e8',
      paddingRight:  20,
      paddingLeft: 20,
      marginTop: 10,
      marginBottom: 10,
    }}
  >
    <View
    >
 
    <RNPickerSelect
    //style={pickerStyle}
    
    
    style={pickerStyle}

    placeholder={{
      label: "Sur place, en livraison ?",
      value: "",
    }}
    
    
    value={livraison}
    onValueChange={(value) =>
      {
        setLivraison(value);
        //setFieldValue("type_public", value)
        
      }
    }
    
    items={[
      { label: "Sur place en point Off", value: "Sur place" },
      { label: "Livrée chez moi pour 7 €", value: "A distance" },
      { label: "test", value: "test" },
      // { label: "Public non francophone", value: "Public non francophone", },
    ]}
    />

    </View>
  </View>



  </ScrollView>




  <View
        style={{
          flex: 2,
          position: "absolute",
          bottom: 140,
          width: "90%",
          marginLeft: "5%",
          textAlign: "center",
        }}
      >


    <Pressable
      onPress={() => {         addCarteAbonnement();  }}
      style={[styles.labelCard, styles.labelAchat, styles.bigButton]}
    >
      <Text style={[styles.textBigButton]}>Valider</Text>
    </Pressable>

  </View>



  </View>
  
  
  
  );
  
}