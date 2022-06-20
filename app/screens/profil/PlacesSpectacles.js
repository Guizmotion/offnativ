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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RNPickerSelect from "react-native-picker-select";
import { CartesAbonnementContext } from "../../store/storeCartesAbonnement";

import styles from "../../config/styles/StyleGeneral";
import { useDispatch, useSelector } from "react-redux";
import { random } from "lodash";


export default function PlacesSpectacles({ navigation }) {
  const user = useSelector((state) => state.user);
  
  const [Places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // var axios = require('axios');
  
  const getPlaces = async () => {
    
    
    
    var data = "{ fes_id : 22 }";
    
    var config = {
      method: "post",
      url: "https://api.festivaloffavignon.com/tickets",
      headers: {
        "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
        token: user.token,
        "Content-Type": "text/plain",
      },
      data: data,
    };
    
    await axios(config)
    .then(function (response) {
     // console.log(JSON.stringify(response.data.orders));
      setPlaces(response.data.orders);
      // }
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  
  useEffect(() => {
    getPlaces();
  }, []);
  
  const _listEmptyComponent = () => {
    return (
      <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      >
      <Text>Aucune place disponible pour le moment</Text>
      </View>
      );
    };
    
    const renderItem = ({ item, i }) => {
      // console.log(item.photo);
      
      /*
      Object {
        "sh_date": "/Date(1658408700000+0200)/",
        "sh_date_id": 2183971,
        "sh_date_string": "2022-07-21T15:05:00.0000000",
        "sh_id": 31680,
        "sh_name": "Un crime, ça ne s'improvise pas   \"Alea jacta est\"",
        "ticket_barcode": "51CC3A392D",
        "ticket_card": Object {
          "card_key": "W02753TQWW",
          "card_name": "Thomas Hauguel",
        },
        "ticket_key": "JEU21-1505-UNCR-51CC3-A392D-TA-0005",
        "ticket_location": Object {
          "th_address": "149, rue de la carreterie",
          "th_city": "Avignon",
          "th_id": 4771,
          "th_name": "HUMANUM",
          "th_postal_code": "84000",
        },
        "ticket_price": 1000,
        "ticket_type": 2,
        "tkto_id": 633456,
      },
      
      
      */
      
      //console.log(item.tko_tickets[0].sh_name);
      const listTko_tickets = (item) => {
        var list = [];
        for (var i = 0; i < item.tko_tickets.length; i++) {
          
          let hadCardLinked = item.tko_tickets[i].ticket_card;
          
          list.push(
            <View style={styles.listItem} key={item.tko_tickets[i].tkto_id}>
              <View>
              <Image
                style={{
                  resizeMode: "cover",
                  height: 200,
                  width: 120,
                  //marginTop: -30,
                }}
                source={require("../../assets/images/photo_carte-abonnement.jpg")}
              /></View>
              <View style={[styles.blocContent, styles.listItemBloc]}>
            <Text  ellipsizeMode="tail" numberOfLines={1} style={styles.Titre}>
            {item.tko_tickets[i].sh_name}
            </Text>
            
           
            
            <Text style={styles.listItemText}>
            <Text style={styles.ParagraphBold}>Code Ticket</Text> {item.tko_tickets[i].ticket_key}
            
            </Text>
            
            
            <Text style={styles.listItemText}>
            <Text style={styles.ParagraphBold}>Carte d'abonnement renseignée</Text> {hadCardLinked ? item.tko_tickets[i].ticket_card.card_name : "Aucune"}            
            </Text>

            
         
            <View style={styles.listItemLieu}>
                <Pressable
                  onPress={() => Linking.openURL(url_lieu)}
                  
                >

                  <Image
                      style={{
                        height: 25,
                        width: 25,
                        marginTop: -4,
                        position: "absolute",
                        left: 0
                      }}
                      source={require("../../assets/itineraire.png")}
                      />
                        <Text  ellipsizeMode='tail' numberOfLines={1}
                        style={{textAlign: "right",  width: '85%', marginLeft: '15%' }}>{item.tko_tickets[i].ticket_location.th_name}</Text>
                        
                </Pressable>
              </View>
            </View>
           </View>
           
            );
            
          }
          let random = Math.floor(Math.random() * 16777215);
          console.log('random : ' + random);
          return (
            <View key={random}>
            {list}
            </View>
          )
        }
        
        
        return (
          <View style={{paddingTop: 20,flexDirection: 'column',width: '90%', marginLeft: '5%', marginRight: '5%',
          height: '100%'}} key={item.tko_id}>
          <View style={styles.carteAbonnement_header}>
          <Text style={styles.TextSousTitre}>
          Facture  n°{item.tko_bill_number}
          </Text> 
          <Text>Panier n° {item.tko_id} </Text>
          </View>
          <View style={styles.carteAbonnement_body}>
          <View style={styles.carteAbonnement_body_left}>
          
          </View>
          <View style={styles.carteAbonnement_body_right}>
          <Text style={styles.TextSousTitre}>
          
          Mes places {'\n'}    
          </Text>
        
           {listTko_tickets(item)}
       
          
          <Image
          source={{ uri: item.sh_id }}
          style={{ width: 100, height: 100 }}
          />
          </View>
          </View>
          </View>
          );
        };
        
        
        //console.log(Places);
        return (
          <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            top: 0,
          }}
          >
          <FlatList
          data={Places}
          // extraData={newCartes}
          ListEmptyComponent={_listEmptyComponent}
          renderItem={(item) => renderItem(item)}
          keyExtractor={(item) => item.tko_id}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "black" }} />
            
            )}
            style={{ width: "100%", height: "100%" }}
            /* onEndReached={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }
              , 2000);
            }
          }*/
          
          onEndReachedThreshold={0.5}
          refreshing={isLoading}
          onRefresh={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
          }}
          />
          
          </View>
          );
        }
        