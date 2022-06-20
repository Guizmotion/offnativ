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
  Switch,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import Toast from "react-native-root-toast";
import { Storage } from 'expo-storage';
import RNPickerSelect from "react-native-picker-select";
import {CartesAbonnementContext} from "../../store/storeCartesAbonnement";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../config/styles/StyleGeneral";
import { FlatList } from "react-native-gesture-handler";

export default function CartesAbonnement({ navigation }) {
  
  const { stateCartesAbonnement, dispatchCartesAbonnement } = React.useContext( CartesAbonnementContext );
  const user = useSelector((state) => state.user);

  const [Cartes, setCartes] = useState([]);
  const [CartesAchetees, setCartesAchetees] = useState({});
  
  const [isLoading, setIsLoading] = useState(true);
  
  
 
  

      const getCartesAchetees = async () => {
        let data = '{"fes_id":22}';
        
        let config = {
          method: 'post',
          url: 'https://api.festivaloffavignon.com/cards/buyed',
          headers: { 
            'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8', 
            'token': user.token },
          data : data
        };
        
        await axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setCartesAchetees(response.data.cards);

      
        })
        .catch(function (error) {
          console.log(error);
        });
        
      }
      
      useEffect(() => { 
        getCartesAchetees();
        setIsLoading(false);
      }
      , []);

  const deleteCarteAbonnement = async (id) => {
    try {
     // await AsyncStorage.removeItem('CartesAbonnement');
     // await AsyncStorage.setItem('CartesAbonnement', JSON.stringify(Cartes.filter(carte => carte.id !== id)));
      
      await Storage.removeItem({ key: 'CartesAbonnement' }) 
      await Storage.setItem({
        key: 'CartesAbonnement',
        value: JSON.stringify(Cartes.filter(carte => carte.id !== id))
      });
      
      setCartes(Cartes.filter(carte => carte.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  /*
  Le fonctionnement serait le suivant :
setTheArray(currentArray => [...currentArray, newElement])
CARTES PANIER  Obtention pour obtenir les cartes en cours

CARTES PANIER Choix carte (Qui en fonction des critères , détermine la carte à créer : normale, 12/15, transport, tarif réduit, culture et le tarif associé)

CARTES PANIER Ajout carte pour ajouter la carte au panier en cours

CARTES PANIER Validation  pour verrouiller la panier et interdire l’ajout de nouvelles cartes avant paiement

Après il faudrait basculer sur la page de paiement à créer

 

CARTES PANIER Annulation permet de déverrouiller le panier et ajouter à nouveau des cartes

 

Suivant le type de carte , il y a un justificatif à envoyer également.

Je l’ai géré au base64 comme pour les photos. Je n’ai pas reussi à combiner POST du justificatif et RAW de la demande
*/

  const cardToBasket = async (item) => {
    
    
    let data = JSON.stringify({
  "fes_id": 22,
  "card_firstname": item.nom,
  "card_lastname": item.prenom,
  "card_birthday": "12/12/1960",
  "card_postalcode": "30000",
  "card_country": "FR",
  "card_type_id": item.card_type_id,
  "card_photo": 'data:image/jpeg;base64,' +item.photo

});

console.log('envoi donnée carte brouillon' + data);

let config = {
  method: 'patch',
  url: 'https://api.festivaloffavignon.com/cards/basket',
  headers: { 
    'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8', 
    'token': user.token
   },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));


  if(response.data.success == true){
   
    let m = "Carte ajoutée au panier";
    "ios" === Platform.OS
      ? Toast.show(m, Toast.SHORT)
      : ToastAndroid.show(m, ToastAndroid.SHORT);
  }
  else{
    let m = 'Erreur lors de l\'ajout de la carte au panier';
    "ios" === Platform.OS
      ? Toast.show(m, Toast.SHORT)
      : ToastAndroid.show(m, ToastAndroid.SHORT);
  }
})
.catch(function (error) {
  console.log(error);
});


  }
  
  
  
  useEffect(() => {
    setCartes(stateCartesAbonnement.Cartes);
    
  }, [stateCartesAbonnement.Cartes]);
  
  
  
  
  const renderCarteAchetee = ({ item,i }) => {
    // console.log(item.photo);
     //item data
              /*
           "cards":[
 {
 "card_key":"W02751LQWO",
 "card_firstname":"Céline",
 "card_lastname":"Hauguel",
 "card_longname":"Céline Hauguel",
 "card_photo":"https://www.festivaloffavignon.com/resources/OFF/cartes/photos/2022/189244-5102.png",
 "card_price":1600,
 "card_type_id":1,
 "card_type":"Carte d'abonnement public"
 },
 */
     
     
     return(
       <View style={styles.carteAbonnement} key={item.card_key}>
        <View style={styles.blocImage}>
          <Image
        source={{ uri:  item.card_photo }}
        style={{ width: 80, height:100 }}
        />
        </View>
          
        
        
        <View style={styles.blocContent, {backgroundColor: 'none', width: '70%', marginLeft: 100}}>
          <Text ellipsizeMode="tail" numberOfLines={1}  style={styles.ParagraphBold}>{item.card_type}</Text>
            <Text>carte n° {item.card_key}</Text>
            <Text>{item.card_price/100} €</Text>
          
          <Text style={[styles.ParagraphBold, {marginTop: 10}]}>{item.card_longname}</Text>
        </View>
        
       </View>
       
       );
       
     }
  
  const renderItem = ({ item,i }) => {
   // console.log(item.photo);
    //item data
             /*
          "cards":[
{
"card_key":"W02751LQWO",
"card_firstname":"Céline",
"card_lastname":"Hauguel",
"card_longname":"Céline Hauguel",
"card_photo":"https://www.festivaloffavignon.com/resources/OFF/cartes/photos/2022/189244-5102.png",
"card_price":1600,
"card_type_id":1,
"card_type":"Carte d'abonnement public"
},
*/
    
    
    return(
      <View key={item.id}>
       <View style={{flexDirection: 'row', margin: 20}}>
       
        <View style={{width: '20%', flex: 1, alignItems: 'center',alignSelf: 'center'}}>
      
        <TouchableOpacity
                  style={ {backgroundColor: "#e8e8e8", padding: 10, width: 40, height: 40, borderRadius: 30}}
                  onPress={() => {    
                    deleteCarteAbonnement(item.id);

                  }}>
                  <Image
                style={{
                  resizeMode: "cover",
                  height: 20,
                  width: 20,
                }}
                source={require("../../assets/delete.png")}
              />
                  </TouchableOpacity>



     

      
      </View>
          
      <View style={{width: '80%'}}>
      <Text style={styles.ParagraphBold}>Carte d'abonnement</Text>
      <Text ellipsizeMode="tail" numberOfLines={1} >{item.card_type_id}</Text>
      <Text style={styles.ParagraphBold}>{item.nom} {item.prenom}</Text>
      </View>
      </View>
      
      {/*<Image
      source={{ uri: 'data:image/jpeg;base64,' + item.photo }}
      style={{ width: 100, height: 100 }}
              />*/}


<Pressable
  onPress={() => {  cardToBasket(item); }}
  ><View  style={[styles.labelCard,styles.bigButton, {width: '80%', marginLeft: '10%'}]} >
    <Text style={{color: '#fff', textAlign: 'center', width: '100%'}}> Ajouter au panier</Text>
    </View></Pressable>


      
      </View>
      
      );
      
    }
    
    
    
    
    
    
    return (
      <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        top: "0%",
        padding: 20,
        paddingTop: 0,
        marginTop: 0
      }}
      
      key="listecartes"
      >
        <View style={[styles.blocGris, {flexDirection: 'column', height: 310, width: '100%'} ]}>

          <View >
      <Text style={[styles.colorOrange, styles.ParagraphBold,
        {textAlign: "center", marginBottom: 30} ]}>
          Mes cartes achetés</Text>
          </View>
      
      <FlatList
      data={CartesAchetees}
      // extraData={newCartes}
      renderItem={(item) => renderCarteAchetee(item)}
      keyExtractor={(item) => item.card_key}
      //ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "black" }} />}
      style={{ width: "100%", paddingTop: 15 }}
      
      onEndReached={() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }
        , 2000);
      }
    }
    
    onEndReachedThreshold={0.5}
    refreshing={isLoading}
    onRefresh={() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }
      , 2000);
      
    }
  }
  
  ListEmptyComponent={() => {
   
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 100 }}>
        <Text>Aucune carte achetée</Text>
      </View>
    );
  }
  }
  
  />
  </View>

  <Pressable
  onPress={() => props.navigation.navigate("CarteAbonnementWebview")}
  >
    <View  style={[styles.labelCard,styles.bigButton, {width: '80%', marginTop: -35}]} >
                <Text style={{color: '#fff', textAlign: 'center', width: '100%'}}> Découvrez tous les avantages</Text></View>
</Pressable>


<Text style={[styles.colorOrange, styles.ParagraphBold, styles.textMiddleNoColor,
        {textAlign: "center", marginTop: 15} ]}>Mes brouillons</Text>
        <Text>(Finaliser et payer)</Text>
      
      <FlatList
      data={Cartes}
      // extraData={newCartes}
      renderItem={(item) => renderItem(item)}
      keyExtractor={(item) => item.id}
      //ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "black" }} />}
      style={{ width: "100%", height: "100%" }}
      
      onEndReached={() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }
        , 2000);
      }
    }
    
    onEndReachedThreshold={0.5}
    refreshing={isLoading}
    onRefresh={() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }
      , 2000);
      
    }
  }
  
  
  
  />
  


  <Pressable
onPress={() => navigation.navigate("CreerCarteAbonnement")}
>
  <View  style={[styles.labelCard,styles.bigButton, styles.labelAchat]} >
              <Text style={styles.textBigButton}>Acheter une nouvelle carte</Text></View>
</Pressable>

  
  </View>
  );
}

