import React, { useEffect, useState,useRef } from "react";
import {
  ToastAndroid,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableHighlight,
  Pressable
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import styles from "../config/styles/StyleGeneral";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import moment from "moment";
import "moment/min/locales";
import Loader from "./Loader";
import { Button } from "react-native-paper";

import Toast from "react-native-root-toast";
import { CommonActions } from '@react-navigation/native';



moment.locale("fr");

const ShoppingCart = ({ navigation }) => {
  const dispatch = useDispatch();
  const programmes = useSelector((state) => state.listings);
  const user = useSelector((state) => state.user);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [cart, setCart] = useState("");
  const [fees,setFees] = useState(0);
  const [totalDistant,setTotalDistant] = useState(0);
 
  const pickerRef = useRef();

function open() {
  pickerRef.current.focus();
}

function close() {
  pickerRef.current.blur();
}


  useEffect(() => {
    getTotal();
    getDistantCart();
    console.log(programmes.tko_id);
  }, []);
  
  const getTotal = () => {
    const total = programmes.cartItems.reduce((accumulator, object) => {
      return (
        accumulator +
        object.price.reduce((accumulator, object) => {
          return accumulator + object.quantity * object.price;
        }, 0)
        );
      }, 0);
      
      return total;
    };
    

    const getDistantCart = async() => {

      
      var data = '';
      
      var config = {
        method: 'get',
        url: 'https://api.festivaloffavignon.com/basket',
        headers: { 
          'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8', 
          'token': user.token,
         },
        data : data
      };
      
      await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log(response.data.basket.tko_ticket_fees.fees_nb);
        setTotalDistant(response.data.basket.tko_price);

        //update fees
        /*
{"basket":{"tko_id":130496,"tko_payed":0,"tko_expiration":"/Date(1655256214860+0200)/","tko_expiration_string":"2022-06-15T03:23:34.8600000","tko_expiration_paybox":"/Date(1655256952297+0200)/","tko_expiration_paybox_string":"2022-06-15T03:35:52.2970000","tko_tickets":[{"sh_id":29389,"sh_name":"Dans les bois","sh_date":"/Date(1657956600000+0200)/","sh_date_string":"2022-07-16T09:30:00.0000000","sh_date_id":2111180,"ticket_type":1,"ticket_price":1000},{"sh_id":29389,"sh_name":"Dans les bois","sh_date":"/Date(1658475000000+0200)/","sh_date_string":"2022-07-22T09:30:00.0000000","sh_date_id":2111186,"ticket_type":1,"ticket_price":1000},{"sh_id":29389,"sh_name":"Dans les bois","sh_date":"/Date(1658475000000+0200)/","sh_date_string":"2022-07-22T09:30:00.0000000","sh_date_id":2111186,"ticket_type":1,"ticket_price":1000}],"tko_ticket_fees":{"fees_nb":3,"fees_unit_price":100},"tko_price":3300}}
        */

        console.log(response.data.basket.tko_ticket_fees.fees_nb);
        
        //frais = fees_nb x fees_unit_price
        setFees(response.data.basket.tko_ticket_fees.fees_nb * response.data.basket.tko_ticket_fees.fees_unit_price / 100);


      })
      .catch(function (error) {
        console.log(error);
      });
      



    }

    const getPlaces = () => {
      const places = programmes.cartItems.reduce((accumulator, object) => {
        return (
          accumulator +
          object.price.reduce((accumulator, object) => {
            return accumulator + object.quantity;
          }, 0)
          );
        }, 0);
        
        return places;
      };
      
      //remove data from Cart
      
      const removeItemFromCart = async (id) => {
        



       /* 
        programmes.tko_id
        ? await axios
        .delete(
          "https://api.festivaloffavignon.com/basket",
          {
            tko_id: programmes.tko_id,
          },
          {
            headers: {
              "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
              token: user.token,
            },
          }
          )
          .then((user) => {
            console.log("supprimé");
          })
          
          .catch((error) => {
            console.log("tko_id non supprimé");
          })
          : null;*/
          if(programmes.tko_id){

          console.log(programmes.tko_id + 'en cours de suppression');

      console.log(user.token);
          let config = {
            method: 'delete',
            url: 'https://api.festivaloffavignon.com/basket',
            headers: { 
              'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8', 
              'token': user.token,
              },
            data : '{ "tko_id": ' + programmes.tko_id + ' }'
          };
      /*    
         // await axios(config)
         await axios.delete('https://api.festivaloffavignon.com/basket', 
          
         {
          data: {
            tko_id: programmes.tko_id,
          },
          {
            headers: {
              "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
              'token': user.token,
            },
          }
        }
          
          
          
          
          ).then(function (response) {

            console.log(JSON.stringify(response.data));

            dispatch({ type: "removeCart", payload: id });

            console.log("supprimé");

          })
          .catch(function (error) {
            console.log(error);
            console.log("tko_id non supprimé");
          });*/

          var myHeaders = new Headers();
          myHeaders.append("api-key", "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8");
          myHeaders.append("token", user.token);

          var raw = "{\r\n    \"tko_id\": " + programmes.tko_id + "\r\n}";
          
          var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
         await fetch("https://api.festivaloffavignon.com/basket", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

            dispatch({ type: "removeCart", payload: id });


        }

        };
        
        const populateDate = async (id) => {
          await axios
          .post(
            "https://api.festivaloffavignon.com/tickets/availability",
            {
              sh_id: id,//28447,
            },
            {
              headers: {
                "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
              },
            }
            )
            .then((user) => {
              console.log(user.data);
              setDate(user.data)
              
            })
            .then(() => {
              //close();
              //open();
            }
            )
            
            .catch((error) => {
              console.log("connect nok");
            });
          };




          const test = (data) => {
            console.log("hi");
            dispatch({ type: "decreaseCart", payload: data });
            console.log("bi");
          };



          
          const validateCart = async () => {
            setLoading(true);
            let tko_id = "";
            await axios
            .post(
              "https://api.festivaloffavignon.com/basket/tickets",
              {
                sh_date_id: programmes.cartItems[0].date,
                tickets_tn: programmes.cartItems[0].price[0].quantity,
                tickets_ta: programmes.cartItems[0].price[1].quantity,
                tickets_te: programmes.cartItems[0].price[2].quantity,
                tickets_tja: programmes.cartItems[0].price[3].quantity,
              },
              {
                headers: {
                  "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
                  token: user.token,
                },
              }
              )
              .then(async (result) => {
                tko_id = result.data.basket.tko_id;
                console.log("resultaado", result.data);
               // console.log(result.data.message);

                //update fees
                /*
                 "tko_ticket_fees": Object {
      "fees_nb": 1,
      "fees_unit_price": 100,
    },*/
            
                if(result.data.success === false){
                  
                  let m = result.data.message;

                  if(m === 'Le nombre de places souhaitÃ©es est supÃ©rieur aux disponibilitÃ©s.'){

                    m= 'Erreur : Le nombre de places souhaitées est supérieur aux disponibilités.';
                  }
                  "ios" === Platform.OS
                    ? Toast.show(m, Toast.SHORT)
                    : ToastAndroid.show(m, ToastAndroid.SHORT);

                  setLoading(false);
                }
                else{
                //data.tko_id = result.data.basket.tko_id;
                dispatch({ type: "addTkoId", payload: result.data.basket.tko_id });
                setCart(result.data);
                await axios
                .post(
                  "https://api.festivaloffavignon.com/basket/validate",
                  {
                    sh_date_id: programmes.cartItems[0].date,
                    tickets_tn: programmes.cartItems[0].price[0].quantity,
                    tickets_ta: programmes.cartItems[0].price[1].quantity,
                    tickets_te: programmes.cartItems[0].price[2].quantity,
                    tickets_tja: programmes.cartItems[0].price[3].quantity,
                  }
                
                  ,
                  {
                    headers: {
                      "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
                      token: user.token,
                    },
                  }

                

                  )
                  .then((result) => {
                    console.log("success", result.data);
                    //afficher les bon prix
                    /*
                    success Object {
  "basket": Object {
    "tko_expiration": "/Date(1655252767890+0200)/",
    "tko_expiration_paybox": "/Date(1655254393020+0200)/",
    "tko_expiration_paybox_string": "2022-06-15T02:53:13.0200000",
    "tko_expiration_string": "2022-06-15T02:26:07.8900000",
    "tko_id": 130495,
    "tko_payed": 0,
    "tko_price": 4300,
    "tko_ticket_fees": Object {
      "fees_nb": 3,
      "fees_unit_price": 100,
    },
    "tko_tickets": Array [
      Object {
        "place_price": 1000,
        "place_type": 1,
        "sh_date": "/Date(1658475000000+0200)/",
        "sh_date_id": 2111186,
        "sh_date_string": "2022-07-22T09:30:00.0000000",
        "sh_id": 29389,
        "sh_name": "Dans les bois",
      },
      Object {
        "place_price": 1500,
        "place_type": 1,
        "sh_date": "/Date(1658995200000+0200)/",
        "sh_date_id": 2108220,
        "sh_date_string": "2022-07-28T10:00:00.0000000",
        "sh_id": 29382,
        "sh_name": "La méthode du Dr. Spongiak",
      },
      */


                  })
                  
                  .catch((error) => {
                    console.log(error);
                    console.log("NOK");
                    setLoading(false);
                  });

              

                  await axios
                  .post(
                    "https://api.festivaloffavignon.com/basket/contact",
                    {
                      tko_id: tko_id,
                      tko_firstname: user.user.prenom,
                      tko_lastname: user.user.nom,
                      tko_phone: "0606060606",
                      tko_email: user.user.email,
                    },
                    {
                      headers: {
                        "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
                        token: user.token,
                      },
                    }
                    )
                    .then((user) => {
                      console.log("success : ajout du contact au billet");
                    })
                    
                    .catch((error) => {
                      console.log(error);
                      setLoading(false);
                    });


                    await axios
                    .get("https://api.festivaloffavignon.com/cms/login", {
                    headers: {
                      "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
                      token: user.token,
                    },
                  })
                  .then((user) => {
                    console.log("success login CMS" + totalDistant);
                    setLoading(false);
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [
                          { name: 'CartPay' },
        
                        ],
                      })
                    );
                    navigation.navigate(
                      "CartPay",
                      {tko_id: tko_id,
                      total: totalDistant
                      },
                      
                      );
                  })
                  
                  .catch((error) => {
                    console.log(error);
                    setLoading(false);
                  });

                }//fin else erreur ajout panier

                })
                
                .catch((error) => {
                  console.log(error);
                  console.log("her");
                  setLoading(false);
                });
              };
              const renderProducts = (data, index) => {
               // populateDate(data.id);
                return (
                  <View key={index}>
                 {/* <View
                  style={{
                    width: "25%",
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F0F0F3",
                    borderRadius: 10,
                    marginRight: 22,
                    overflow: "hidden",
                    alignSelf: "center",
                    marginBottom: 20,
                  }}
                  >
                  <Image
                  source={{ uri: data.image }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                  }}
                  />
                  </View>*/}
                  <View
                  key={data.key}
                  style={{
                    width: "100%",
                    marginVertical: 6,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                  >
                  <View
                  style={{
                    flex: 1,
                    justifyContent: "space-around",
                  }}
                  >
                  <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  >
                  <TouchableOpacity
                  style={[styles.fondbtnIconGeneral]}
                  onPress={() => removeItemFromCart(data)}
                  >
                  <FontAwesome
                  name="trash-o"
                  style={[styles.btnIconGeneral]}
                  />
                  </TouchableOpacity>
                  <Text style={[styles.TextSousTitre]}>
                  {data.title}
                  </Text>
                  </View>
                  
                  <View style={{ marginBottom: 15, marginTop: 15 }}>
                  <View style={{marginBottom: 10,alignSelf: 'center', flexDirection: 'row' }}>
                  <Text style={{ fontWeight: "bold" }}>1/ </Text><Text>Choisissez la date et l'heure</Text>
                  </View>
                  
                  <Pressable
                    onPress={() => {populateDate(data.id);}}
                  >
                    <Text style={{textAlign: 'center'}}> {data.id}</Text>

                  
                 
                  </Pressable>
                  <Picker
                 
                  ref={pickerRef}
                  selectedValue={data.date}
                  onValueChange={(itemValue, itemIndex) => {
                    
                    let newData = data;
                    newData.date = itemValue;
                    dispatch({ type: "addDateToCart", payload: newData });
                  }}
                  
                  >
                  <Picker.Item label="Date et heure" value="" />
                  
                  {date ? (
                    //filter by data.id
                    date.availability.filter((item) => item.sh_id == data.id).map((item, index) => (
                   // date.availability.map((item) => (
                      <Picker.Item
                      label={moment(item.sh_date_string).format("LLLL")}
                      value={item.sh_date_id}
                      key={item.sh_id}
                    // style={{
                    //   display: item.sh_id === data.id ? "flex" : "none" ,
                    // }}

                      />
                      ))
                      ) : (
                        <Picker.Item label="Téléchargement des horaires..." value="0" />
                        )}
                        </Picker>
                        <View style={{marginBottom: 10,alignSelf: 'center', flexDirection: 'column' }}>
                        <Text  style={[styles.moyenText, {textAlign: 'center', fontWeight: 'bold'}]}>
                          Si la date est indisponible, </Text>
                          <Text  style={[styles.moyenText]}>rapprochez-vous du théâtre pour vérifier les disponibilités</Text>
                          </View>

                        </View>
                        <View style={{marginBottom: 10,alignSelf: 'center', flexDirection: 'row' }}>
                        <Text style={{fontWeight: "bold" }}>2/ </Text><Text>Choisissez le nombre de places</Text>
                        </View>



                        <View  style={[styles.linePriceCart]} >
                        
                        <View style={{ flexDirection: "row", width: '60%' ,paddingTop: 10}}  >
                        
                        <Text>Plein Tarif</Text>
                        
                        </View>
                        <View style={{ flexDirection: "row", width: '15%', paddingTop: 10,alignContent: 'flex-end'}}  >
                        <Text style={{ fontWeight: "bold",  textAlign: 'right', width: '100%'}}>
                        {" "}  {data.price[0].price} €
                        </Text>
                        </View>



                        <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          position: "absolute",
                          right: 0
                        }}
                        >
                        <TouchableOpacity
                        onPress={() => test(data)}
                        style={[styles.btnQty]}
                        >
                        <MaterialCommunityIcons
                        name="minus"
                        style={[styles.btnIconGeneral]}
                        />
                        </TouchableOpacity>
                        <Text style={{marginLeft: 5, marginRight: 5}}>{data.price[0].quantity}</Text>
                        <TouchableOpacity
                        onPress={() => dispatch({ type: "cart", payload: data })}
                        style={[styles.btnQty]}>
                        <MaterialCommunityIcons  name="plus"
                        style={[styles.btnIconGeneral]}  />
                        </TouchableOpacity>
                        </View>
                        </View>






                        <View  style={[styles.linePriceCart]}  >

                        <View style={{ flexDirection: "row", width: '60%' ,paddingTop: 10}}  >
                        <Text>Tarif carte abonnement</Text>
                        
                        </View>
                        <View style={{ flexDirection: "row", width: '15%', paddingTop: 10, alignContent: 'flex-end' }}  >
                        <Text style={{ fontWeight: "bold", textAlign: 'right', width: '100%' }}>
                        {" "}
                        {data.price[1].price} €
                        </Text>
                        </View>

                        <View   style={{ flexDirection: "row", alignItems: "center", position: "absolute", right: 0   }}
                        >
                        <TouchableOpacity
                        onPress={() =>
                          dispatch({
                            type: "decreaseCartTarifAbonnement",
                            payload: data,
                          })
                        }
                        style={[styles.btnQty]}
                        >
                        <MaterialCommunityIcons
                        name="minus"
                        style={[styles.btnIconGeneral]}
                        />
                        </TouchableOpacity>
                        <Text style={{marginLeft: 5, marginRight: 5}}>{data.price[1].quantity}</Text>
                        <TouchableOpacity
                        onPress={() =>
                          dispatch({ type: "cartAbonnement", payload: data })
                        }
                        style={[styles.btnQty]}
                        >
                        <MaterialCommunityIcons
                        name="plus"
                        style={[styles.btnIconGeneral]}
                        />
                        </TouchableOpacity>
                        </View>
                        </View>















                        
                

                        <View  style={[styles.linePriceCart]}  >

                        <View style={{ flexDirection: "row", width: '60%' ,paddingTop: 10}}  >
                        <Text>Tarif moins de 12 ans</Text>
                        </View>


                        <View style={{ flexDirection: "row", width: '15%', paddingTop: 10, alignContent: 'flex-end' }}  >
                        <Text style={{ fontWeight: "bold", textAlign: 'right', width: '100%' }}>
                        {" "}
                        {data.price[2].price} €
                        </Text>
                        </View>
                        
                        <View   style={{ flexDirection: "row", alignItems: "center", position: "absolute", right: 0   }}
                        >
                        <TouchableOpacity
                        onPress={() =>
                          dispatch({ type: "decreaseCartTarifMoins", payload: data })
                        }
                        style={[styles.btnQty]}
                        >
                        <MaterialCommunityIcons
                        name="minus"
                        style={[styles.btnIconGeneral]}
                        />
                        </TouchableOpacity>
                        <Text style={{marginLeft: 5, marginRight: 5}}>{data.price[2].quantity}</Text>
                        <TouchableOpacity
                        onPress={() =>
                          dispatch({ type: "cartTarifMoins", payload: data })
                        }
                        style={[styles.btnQty]}
                        >
                        <MaterialCommunityIcons
                        name="plus"
                        style={[styles.btnIconGeneral]}
                        />
                        </TouchableOpacity>
                        </View>
                        </View>




                        <View  style={[styles.linePriceCart]}  >

                        <View style={{ flexDirection: "row", width: '60%' ,paddingTop: 10}}  >
                        <Text>Tarif jeune abonné 12/25 ans</Text>
                        </View>
                        
                        <View style={{ flexDirection: "row", width: '15%', paddingTop: 10, alignContent: 'flex-end' }}  >
                        <Text style={{ fontWeight: "bold", textAlign: 'right', width: '100%' }}>
                        {" "}
                        {data.price[2].price} €
                        </Text>
                        </View>





                        <View   style={{ flexDirection: "row", alignItems: "center", position: "absolute", right: 0   }}
                        >
                        <TouchableOpacity
                        onPress={() =>
                          dispatch({
                            type: "decreaseCartTarifJeuneAbonne",
                            payload: data,
                          })
                        }
                        style={[styles.btnIconGeneral]}
                        >
                        <MaterialCommunityIcons
                        name="minus"
                        style={{
                          fontSize: 16,
                          color: "#777777",
                        }}
                        />
                        </TouchableOpacity>
                        <Text style={{marginLeft: 5, marginRight: 5}}>{data.price[3].quantity}</Text>
                        <TouchableOpacity
                        onPress={() =>
                          dispatch({ type: "cartTarifJeuneAbonne", payload: data })
                        }
                        style={[styles.btnQty]}
                        >
                        <MaterialCommunityIcons
                        name="plus"
                        style={[styles.btnIconGeneral]}
                        />
                        </TouchableOpacity>
                        </View>

                        














                        </View>
                        </View>
                        </View>
                        </View>
                        );
                      };
                      
                      return (
                        <>
                        {programmes.cartItems.length > 0 ? (
                          <View
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#ffffff",
                            position: "relative",
                            padding: 20
                          }}
                          >
                          {loading && <Loader />}
                          <ScrollView>
                          <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            paddingTop: 30,
                            paddingHorizontal: 16,
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          >
                          <TouchableOpacity onPress={() => navigation.goBack()}>
                          <MaterialCommunityIcons
                          name="chevron-left"
                          style={{
                            fontSize: 22,
                            color: "#221f1f",
                            padding: 12,
                            backgroundColor: "#fff",
                          }}
                          />
                          </TouchableOpacity>
                          <Text
                          style={{
                            fontSize: 20,
                            color: "#221f1f",
                            fontWeight: "400",
                            fontWeight: "bold",
                            right:20,
                            position: 'absolute',
                            paddingTop: 25
                          }}
                          >
                          Ma réservation
                          </Text>
                          </View>
                          
                          <View>
                          {programmes ? programmes.cartItems.map(renderProducts) : null}
                          </View>




                          <View>

                          
                          <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          >
                          <Text
                          style={[styles.TextMiddleCart]}
                          >
                          Frais de gestion par place
                          </Text>
                          <Text
                          style={[styles.TextMiddleCart]}
                          >
                          {fees} €
                          </Text>
                          </View>
                          <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 5,
                          }}
                          >
                          <Text
                          style={[styles.TextMiddleCart]}
                          >
                          {getPlaces()} places
                          </Text>
                          <Text
                          style={[styles.TextMiddleCart]}
                          >
                          {getTotal()} €
                          </Text>
                          </View>
                          <View style={styles.Separateur}></View>
                          <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: '100%',
                          }}
                          >
                          <Text
                          style={[styles.TextBigCart]}
                          >
                          TOTAL (FRAIS INCLUS)
                          </Text>
                          <Text
                          style={[styles.TextBigCart]}
                          >
                          {getTotal() + 1 * getPlaces()} €
                          </Text>
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
                          value={isChecked}
                          onValueChange={setChecked}
                          color={isChecked ? "#f26522" : undefined}
                          />
                          <Text
                          style={[styles.moyenText, {maxWidth: '90%'}]}
                          >
                          En cochant cette case , j'accepte et je reconnais avoir pris
                          connaissance des Conditions Générales de Vente du service de
                          billettrie en ligne
                          </Text>
                          </View>
                          </View>
                          </ScrollView>
                          <View
                          style={{
                            position: "absolute",
                            bottom: 10,
                            height: "8%",
                            width: "95%",
                            marginLeft: '9%',
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          >
                          <TouchableOpacity
                          // onPress={() => (total != 0 ? checkOut() : null)}
                          onPress={() => validateCart()}
                          style={[styles.labelCard, styles.btnBig, styles.labelAchat]}
                          disabled={
                            programmes.cartItems[0].date && isChecked === true
                            ? false
                            : true
                          }
                          >
                          <Text
                          style={styles.textBigButton}
                          >
                          Valider mon panier (€ {getTotal() + fees * getPlaces()} )
                          </Text>
                          </TouchableOpacity>
                          </View>
                          </View>
                          ) : (
                            <View
                            style={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#ffffff",
                              position: "relative",
                              paddingTop: 20,
                            }}
                            >
                            <View
                            style={{
                              width: "100%",
                              flexDirection: "row",
                              paddingTop: 16,
                              paddingHorizontal: 16,
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                            >
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons
                            name="chevron-left"
                            style={{
                              fontSize: 18,
                              color: "#221f1f",
                              padding: 12,
                              backgroundColor: "#fff",
                              borderRadius: 12,
                            }}
                            />
                            </TouchableOpacity>
                            <Text
                            style={{
                              fontSize: 20,
                              color: "#000000",
                              fontWeight: "400",
                              fontWeight: "bold",
                            }}
                            >
                            Ma réservation
                            </Text>
                            <View></View>
                            </View>
                            <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                              flex: 1,
                            }}
                            >
                            <Feather name="shopping-bag" size={50} color="black" />
                            <Pressable
                            onPress={() => getDistantCart()}
                            >
                            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                            Votre panier est vide !{" "}
                            </Text>
                            </Pressable>
                            </View>
                            </View>
                            )}
                            </>
                            );
                          };
                          
                          export default ShoppingCart;
                          