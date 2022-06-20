import React, { useEffect, useState, useContext } from "react";

import { Overlay } from "react-native-elements";

import {
  Image,
  TextInput,
  View,
  StyleSheet,
  searchText,
  ScrollViewButton,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Switch,
  InteractionManager,
} from "react-native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { ActivityIndicator, ToastAndroid } from "react-native";

import { Card } from "react-native-paper";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import WebView from "react-native-webview";
import styles from "../config/styles/StyleGeneral";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Loader from "./Loader";
import ListStyleSpectacle from "./recherche/ListStyleSpectacle";
// import { StoreContext } from "../store/store";
// import { RechercheContext } from "../store/storeRecherche";
import { useDispatch, useSelector } from "react-redux";

import { Tooltip, Text } from "react-native-elements";
import { abs } from "react-native-reanimated";

import { debounce, _, round } from "lodash";

const validationSchema = Yup.object().shape({});
const baseUrl = "https://appli.ovh/off/app/";
const url_programme = baseUrl + "api2022.php?a=1&limit=";

export default function RechercheModal({ navigation }) {
  const pickerStyle = {
    inputIOS: {
      textAlign: "right",
      marginRight: 20,
      height: 50,
    },
  };
  const dispatch = useDispatch();
  const stateRecherche = useSelector((state) => state.recherche);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  // const { stateRecherche, dispatchRecherche } =
  //   React.useContext(RechercheContext);
  const [isLoading, setIsLoading] = useState(false);
  const [limite, setLimite] = useState(false);

  
  const resetForm = () => {
    setIsLoading(false);
    setLimite(false);
 
    setswitchApresMidi(false);
    setswitchMatin(false);
    setswitchSoir(false);
    setswitchTicketOff(false);
    setswitchHandicap(false);
    setNb_Styles("");
    setNb_Dates("");
    setNb_Auteurs("");
    setNb_Lieux("");
    setKeyword("");
    setType_Public(""); 

    dispatchRecherche({ type: "RESET_RECHERCHE" });
    
  };
  
  const [switchMatin, setswitchMatin] = useState(false);
  const [switchApresMidi, setswitchApresMidi] = useState(false);
  const [switchSoir, setswitchSoir] = useState(false);
  const [switchTicketOff,setswitchTicketOff] = useState(false);
  const [switchHandicap,setswitchHandicap] = useState(false);
  
  const toggleSwitchMatin = (value) => {
    
    setswitchMatin(value);
    
  };
  const toggleSwitchApresMidi = (value) => {
    
    setswitchApresMidi(value);
    
  };
  const toggleSwitchSoir = (value) => {
    
    setswitchSoir(value);
    
  };
  
  const toggleTicketOff = (value) => {
    
    setswitchTicketOff(value);
    
  };
  
  const toggleHandicap = (value) => {
    
    setswitchHandicap(value);
    
  };
  
  const  [nb_styles,setNb_Styles] = useState();
  const  [nb_dates,setNb_Dates] = useState();
  const [nb_auteurs,setNb_Auteurs] = useState();
  const [nb_lieux,setNb_Lieux] = useState();
  const [keyword, setKeyword] = useState("");
  const [type_public, setType_Public] = useState("");
  
  
  function countUnique(iterable) {
    return new Set(iterable).size;
  }
  
  
  
  useEffect(() => {
    //console.log(stateRecherche.AuteursRecherches);
    
    setNb_Styles(countUnique(stateRecherche.StylesRecherches));
    setNb_Dates(countUnique(stateRecherche.DatesRecherches));
    setNb_Auteurs(countUnique(stateRecherche.AuteursRecherches));
    setNb_Lieux(countUnique(stateRecherche.LieusRecherches));
   // console.log('test array id spectacles :');
   // console.log(stateRecherche.SpectaclesIdRecherches);
    
    
  }, [stateRecherche]);
  
  
  
  
  
  const handleSubmit = async (values) => {
    let data = [];
    
    setIsLoading(true);
    
    // dispatchRecherche({
    //   type: "ADD_LIMITE",
    //   payload: limite,
    // });
    
    
    await axios.get(url_programme).then(async (response) => {
      data = response.data;
    });
    
    //console.log( type_public.toLowerCase() ) ;
    
    //console.log(nb_auteurs + 'test contains: ' + stateRecherche.SpectaclesIdRecherches.includes(31012) );
    
    const fil = data.filter(
      (item, index) => {
        
   
        
        let search_ticket_off = '';
        
        // 07\/07\/2022-09h45|08\/07\/2022-00h00
        let search_date = '';
        search_date = item.dates.replace ("\/", "/");
        
        //remove hour
        search_date = search_date.replace( /-\d\dh\d\d/g, "");
        
        
      
          if (
            (nb_auteurs !== 0 ?
              stateRecherche.SpectaclesIdRecherches.includes(parseInt(item.id)) : true
              //stateRecherche.AuteursRecherches.some(item.nom) : true
              )
              &&
              
              (nb_styles !== 0 ?
                stateRecherche.StylesRecherches.includes(item.style) : true
                )
                &&
                (nb_dates !== 0 ?
                  stateRecherche.DatesRecherches.includes(search_date) : true
                  )
                  &&
                  (nb_lieux !== 0 ?
                    stateRecherche.LieusRecherches.includes(item.lieu) : true
                    )
                    /* &&
                    (nb_auteurs !== 0 ?
                      //  stateRecherche.AuteursRecherches.map(id_spectacle => id_spectacle).includes(
                      // stateRecherche.AuteursRecherches.includes(
                      // item.id.includes(stateRecherche.SpectaclesIdRecherches
                      //  (resultIdSpectacle === true
                      //  stateRecherche.SpectaclesIdRecherches.some(id => id === item.id
                      // stateRecherche.AuteursRecherches.some(el => el.id_spectacle == item.id
                      //  parseInt(item.id)
                      // item.nom  +' '  +item.auteur_prenom
                      stateRecherche.SpectaclesIdRecherches.includes(item.id)
                      : true
                      )*/
                      &&
                      (type_public
                        //  ? item.type_public.toLowerCase() === values.type_public.toLowerCase()
                        ? item.type_public.toLowerCase() === type_public.toLowerCase() 
                        : true)
                        &&
                        (switchTicketOff == true ? item.ticket_off.includes('Oui') : true ) 
                        &&
                        (switchHandicap == true ? item.acces_handicape.includes('Oui') : true )
                        &&
                        
                        (
                          /*** test switch horaires values ***/
                          (!0!=switchMatin|| !1!=switchApresMidi|| !1!=switchSoir||item.horaire.includes("05h")||item.horaire.includes("06h")||item.horaire.includes("07h")||item.horaire.includes("08h")||item.horaire.includes("09h")||item.horaire.includes("10h")||item.horaire.includes("11h"))&&(!0!=switchApresMidi|| !1!=switchMatin|| !1!=switchSoir||item.horaire.includes("12h")||item.horaire.includes("13h")||item.horaire.includes("14h")||item.horaire.includes("15h")||item.horaire.includes("16h")||item.horaire.includes("17h"))&&(!0!=switchSoir|| !1!=switchMatin|| !1!=switchApresMidi||item.horaire.includes("18h")||item.horaire.includes("19h")||item.horaire.includes("20h")||item.horaire.includes("21h")||item.horaire.includes("22h")||item.horaire.includes("23h")||item.horaire.includes("24h"))&&(!0!=switchMatin|| !0!=switchApresMidi|| !1!=switchSoir||item.horaire.includes("05h")||item.horaire.includes("06h")||item.horaire.includes("07h")||item.horaire.includes("08h")||item.horaire.includes("09h")||item.horaire.includes("10h")||item.horaire.includes("11h")||item.horaire.includes("12h")||item.horaire.includes("13h")||item.horaire.includes("14h")||item.horaire.includes("15h")||item.horaire.includes("16h")||item.horaire.includes("17h"))&&(!0!=switchMatin|| !0!=switchSoir|| !1!=switchApresMidi||item.horaire.includes("05h")||item.horaire.includes("06h")||item.horaire.includes("07h")||item.horaire.includes("08h")||item.horaire.includes("09h")||item.horaire.includes("10h")||item.horaire.includes("11h")||item.horaire.includes("18h")||item.horaire.includes("19h")||item.horaire.includes("20h")||item.horaire.includes("21h")||item.horaire.includes("22h")||item.horaire.includes("23h")||item.horaire.includes("24h"))&&(!0!=switchApresMidi|| !0!=switchSoir|| !1!=switchMatin||item.horaire.includes("12h")||item.horaire.includes("13h")||item.horaire.includes("14h")||item.horaire.includes("15h")||item.horaire.includes("16h")||item.horaire.includes("17h")||item.horaire.includes("18h")||item.horaire.includes("19h")||item.horaire.includes("20h")||item.horaire.includes("21h")||item.horaire.includes("22h")||item.horaire.includes("23h")||item.horaire.includes("24h"))
                          /*****/                                                         
                          )
                          ) {
                            return true;
                          } else {
                            return false;
                          }
                        }
                        );
                        
                        
                        
                        let filRechByKeyword = _.filter(fil, function(o) {
                          return Object.keys(o).some(function(k) {
                            return String(o[k]).toLowerCase().includes(keyword.toLowerCase().trim());
                          });
                        });
                        
                        
                        
                        let  filRech = _.uniqBy(filRechByKeyword, 'id');
                        
                        dispatch({ type: "addData", payload: filRech });
                        setIsLoading(false);
                        
                        navigation.navigate('Programme');
                   
                      };
                      
                      
                      
                      
                      return (
                        <View key="recherche_modal" style={{ width: "100%", backgroundColor: "#fff", padding:20, height: '100%'}}>
                        
                        <ScrollView style={{height: '100%', width: '100%', display: 'flex'}}>
                        
                        {isLoading && <Loader style={{ marginTop:50 }} />}
                        {isLoading && <Text style={{ marginLeft:'33%',marginTop:50, alignContent:'center', alignItems: 'center' }} >Recherche en cours ...</Text>}
                        <View style={{  display: isLoading ? "none" : "flex" }}>
                        
                        <Formik
                        initialValues={{
                          titre_spectacle: "",
                          ticket_off: "",
                          acces_handicape: "",
                          type_public: "",
                          style: "",
                          nom: "",
                          salle: "",
                          date: "",
                          horaire: "",
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                        >
                        {({
                          values,
                          setFieldTouched,
                          setFieldValue,
                          errors,
                          touched,
                          handleChange,
                          handleSubmit,
                          resetForm,
                        }) => (
                          <>
                          
                          <View style={{
                            padding: 15,
                            paddingTop:0,
                            width: "100%",
                            margin: 0,
                            flexDirection: "row",
                            alignContent: "space-between",
                            alignItems: "center"
                          }}>
                          <TextInput
                          style={{
                            paddingTop:0,
                            width: "100%",
                            height: 30
                          }}
                          autoCapitalize="none"
                          placeholder="Tapez votre recherche..."
                          placeholderTextColor="rgba(0,0,0,0.3)"
                          onChangeText={(text) =>
                            //setFieldValue("titre_spectacle", text)
                            setKeyword(text)
                          }
                          // value={values["titre_spectacle"]}
                          value={keyword}
                          />
                          </View>
                          <View style={styles.Separateur} />
                          
                          <View
                          style={{
                            padding: 15,
                            width: "100%",
                            margin: 0,
                            flexDirection: "row",
                            alignContent: "space-between",
                            alignItems: "center",
                            display:'none'
                          }}
                          >
                          
                          <Text>Style de pièce</Text>
                          
                          <TextInput
                          style={{
                            width: "100%",
                          }}
                          autoCapitalize="none"
                          placeholder="Style de pièce..."
                          onChangeText={(text) => setFieldValue("style", text)}
                          value={values["style"]}
                          />
                          </View>
                          
                          <View>
                          
                          <Pressable
                          style={{
                            padding: 15,
                            flexDirection: "row",
                            alignContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                          }}
                          title="liste Style"
                          onPress={() => navigation.navigate("ListStyleSpectacle")}
                          >
                          <Text>Style de pièce ({nb_styles})</Text></Pressable>
                          <Image
                              style={{
                                resizeMode: "cover",
                                height: 25,
                                width: 25,
                                position: "absolute",
                                right: 10, 
                                top: 10
                              }}
                              source={require("../assets/next.png")}
                            />
                          </View>
                          <View style={styles.Separateur} />
                          
                          
                          
                          <View style={{
                            padding: 15,
                            flexDirection: "row",
                            alignContent: "space-between",
                            width: "100%",
                            alignItems: "center", 
                          }}>
                          <Text>
                          Type de public
                          </Text>
                          <View    style={{width: "100%",  right:30,   position: "absolute", minHeight: 30}}>
                          
                          <RNPickerSelect
                          style={pickerStyle}
                          
                          
                          placeholder={{
                            label: type_public,
                            value: type_public,
                          }}
                          
                          
                          value={type_public}
                          onValueChange={(value) =>
                            {
                              setType_Public(value);
                              //setFieldValue("type_public", value)
                              
                            }
                          }
                          
                          items={[
                            { label: "Jeune public", value: "Jeune public" },
                            { label: "Public adulte", value: "Public adulte" },
                            { label: "Tout public", value: "Tout public" },
                            // { label: "Public non francophone", value: "Public non francophone", },
                          ]}
                          /><Image
                          style={{
                            resizeMode: "cover",
                            height: 25,
                            width: 25,
                            position: "absolute",
                            right: -20, 
                            top: 10
                          }}
                         // source={require("../assets/fleche-bas.png")}
                        />
                          
                          </View>
                          </View>
                          
                          
                          
                          
                          
                          <View style={styles.Separateur} />
                          
                          <View
                          style={{
                            padding: 15,
                            width: "100%",
                            flexDirection: "row",
                            alignContent: "space-between",
                            alignItems: "center",
                          }}
                          >
                          <Text >Date</Text>
                          {/* <TouchableOpacity onPress={showDatepicker}>
                          <Text>selected: {date.toLocaleString()}</Text>
                        </TouchableOpacity> */}
                        
                        {/* show && (
                          <DateTimePicker
                          testID="dateTimePicker"
                          value={mode == "date" ? date : time}
                          mode={mode}
                          is24Hour={true}
                          onChange={(event, selectedDate) => {
                            const currentDate = selectedDate;
                            setShow(false);
                            mode == "date"
                            ? setDate(currentDate)
                            : setTime(currentDate);
                            mode == "date"
                            ? setFieldValue(
                              "date",
                              moment(selectedDate).format("DD/MM/YYYY")
                              )
                              : setFieldValue(
                                "horaire",
                                moment(selectedDate).format("HH:mm")
                                );
                                console.log(time);
                              }}
                              />
                              )}
                              <View style={{width: "100%",    textAlign: 'right',     position: "absolute"}}>
                              <TouchableOpacity 
                              onPress={showDatepicker}
                              
                              
                              >
                              <TextInput
                              style={{width: "100%",    textAlign: 'right'}}
                              placeholder="Date"
                              placeholderTextColor="grey"
                              value={values["date"]}
                              editable={false}
                              pointerEvents="none"
                              />
                              </TouchableOpacity>
                              </View></View>
                              
                            */}
                            <Pressable
                            style={{
                              //  padding: 15,
                              flexDirection: "row",
                              alignContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                            title="Date(s)"
                            onPress={() => navigation.navigate("ListDateSpectacle")}
                            >
                            <Text>({nb_dates})</Text></Pressable>
                            <Image
                              style={{
                                resizeMode: "cover",
                                height: 25,
                                width: 25,
                                position: "absolute",
                                right: 10, 
                                top: 10
                              }}
                              source={require("../assets/next.png")}
                            />
                            </View>
                            
                            
                            <View style={styles.Separateur} />
                            
                            <View
                            style={{
                              padding: 15,
                              width: "100%",
                              flexDirection: "row",
                              alignContent: "space-between",
                              alignItems: "center",
                            }}
                            >
                            <Text>Horaires</Text>
                            
                            
                            <View style={{    width: "75%",right: 0,
                            textAlign: 'right', 
                            position: "absolute", flexDirection: 'row', alignContent: 'space-between'}}>
                            <View  style={{width: '33%', textAlign: 'center', alignItems: 'center'}}
                            
                            >
                            {/*
                            <TouchableOpacity onPress={showTimepicker}>
                            <TextInput
                            style={{
                              marginLeft: 10,
                            }}
                            placeholder="Horaire"
                            placeholderTextColor="grey"
                            value={values["horaire"]}
                            editable={false}
                            pointerEvents="none"
                            />
                          </TouchableOpacity> */ }
                          
                          <Text>Matin</Text>
                          
                          <Switch
                          
                          onValueChange={toggleSwitchMatin}
                          value={switchMatin}
                          />
                          
                          
                          </View>
                          
                          <View  style={{width: '33%', textAlign: 'center', alignItems: 'center'}}>
                          
                          <Text>Apres midi</Text>
                          <Switch
                          
                          onValueChange={toggleSwitchApresMidi}
                          value={switchApresMidi}
                          />
                          
                          
                          
                          
                          </View>
                          
                          <View  style={{width: '33%', textAlign: 'center', alignItems: 'center'}}>
                          
                          <Text>Soir</Text>
                          <Switch
                          
                          onValueChange={toggleSwitchSoir}
                          value={switchSoir}
                          />
                          
                          
                          
                          
                          </View>
                          </View>
                          </View>
                          <View style={styles.Separateur} />
                          
                          <View
                          style={{
                            padding: 15,
                            flexDirection: "row",
                            alignContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                          }}
                          >
                          <Pressable
                          style={{
                            //  padding: 15,
                            flexDirection: "row",
                            alignContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                          }}
                          title="Date(s)"
                          onPress={() => navigation.navigate("ListLieuSpectacle")}
                          >
                          <Text>Théâtre ({nb_lieux})</Text>
                          </Pressable>
                          <Image
                              style={{
                                resizeMode: "cover",
                                height: 25,
                                width: 25,
                                position: "absolute",
                                right: 10, 
                                top: 10
                              }}
                              source={require("../assets/next.png")}
                            />
                          </View>
                          <View style={styles.Separateur} />
                          
                          <View
                          style={{
                            padding: 15,
                            flexDirection: "row",
                            alignContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                          }}
                          >
                          <Pressable
                          style={{
                            //  padding: 15,
                            flexDirection: "row",
                            alignContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                          }}
                          title="liste Style"
                          onPress={() => navigation.navigate("ListAuteurSpectacle")}
                          ><Text>Auteur·rice·s ({nb_auteurs})</Text>
                          {/* <TextInput
                          style={{
                            width: "100%",
                            textAlign: 'right', 
                            position: "absolute"
                          }}
                          autoCapitalize="none"
                          placeholder="Auteur..."
                          onChangeText={(text) => setFieldValue("nom", text)}
                          value={values["nom"]}
                          />
                        */}
                        </Pressable>
                        <Image
                              style={{
                                resizeMode: "cover",
                                height: 25,
                                width: 25,
                                position: "absolute",
                                right: 10, 
                                top: 10
                              }}
                              source={require("../assets/next.png")}
                            />
                        </View>
                        <View style={styles.Separateur} />
                        
                        <View
                        style={{
                          padding: 15,
                          flexDirection: "row",
                          alignContent: "space-between",
                          width: "100%",
                          alignItems: "center",
                        }}
                        >
                        <Text>Spectacles disponibles sur Ticket’Off </Text>
                        <View style={{ position: "absolute", right: 15, marginTop: 5 }}>
                        {/* <Image
                        style={{
                          resizeMode: "cover",
                          height: 30,
                          width: 30,
                        }}
                        source={require("../assets/next.png")}
                        />
                        <Switch
                        trackColor={{ false: "#767577", true: "#f26522" }}
                        // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#e8e8e8"
                        onValueChange={(text) => setFieldValue("ticket_off", text)}
                        value={values["ticket_off"]}
                        />
                      */}
                      <Switch
                      
                      onValueChange={toggleTicketOff}
                      value={switchTicketOff}
                      />
                      </View>
                      </View>
                      <View style={styles.Separateur} />
                      
                      <View
                      style={{
                        padding: 15,
                        flexDirection: "row",
                        alignContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                      >
                      <Text>Accès PMR</Text>
                      <View style={{ position: "absolute", right: 15, marginTop: 5 }}>
                      {/* <Image
                      style={{
                        resizeMode: "cover",
                        height: 30,
                        width: 30,
                      }}
                      source={require("../assets/next.png")}
                      /> 
                      <Switch
                      trackColor={{ false: "#767577", true: "#f26522" }}
                      // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#e8e8e8"
                      onValueChange={(text) =>
                        setFieldValue("acces_handicape", text)
                      }
                      value={values["acces_handicape"]}
                      />
                    */}
                    <Switch
                    
                    onValueChange={toggleHandicap}
                    value={switchHandicap}
                    />
                    
                    
                    </View>
                    </View>
                    
                    <View style={styles.Separateur} />
                    
                    {/*  
                    <View
                    style={{
                      padding: 10,
                      width: "90%",
                      margin: 0,
                      marginLeft: "5%",
                      flexDirection: "row",
                      alignContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                    >
                    <Text>1ere à Avignon</Text>
                    <View style={{ position: "absolute", right: 40, marginTop: 5 }}>
                    
                    <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(text) =>
                      setFieldValue("deja_joue", text)
                    }
                    value={values["deja_joue"]}
                    />
                    </View>
                    </View>
                    <View style={styles.Separateur} />
                  */}
                  
                  {/* <View
                  style={{
                    padding: 10,
                    width: "90%",
                    margin: 0,
                    marginLeft: "5%",
                    flexDirection: "row",
                    alignContent: "space-between",
                    width: "100%",
                  }}
                  >
                  <Text>Autour des spectacles</Text>
                  <View style={{ position: "absolute", right: 40, marginTop: 5 }}>
                  <Image
                  style={{
                    resizeMode: "cover",
                    height: 30,
                    width: 30,
                  }}
                  source={require("../assets/next.png")}
                  />
                  </View>
                </View> */}
                {/* <View style={styles.Separateur} /> */}
                
                
                
                
                </>
                
                )}
                
                </Formik>
                
                </View>
                </ScrollView>
                
                
                <View style={{   flex: 2, position: 'absolute', bottom: 120, width: '80%', marginLeft: '15%' }} >
                
                
                
                
                
                <TouchableOpacity
                onPress={handleSubmit}
                
                >
                <View
                style={[styles.labelCard, styles.labelAchat, styles.bigButton]}
                >
                <Text style={styles.textBigButton}>
                Afficher les résultats
                </Text>
                </View>
                </TouchableOpacity>

                <Pressable
  title="Effacer les critères"
  onPress={resetForm}
  type="reset" 
    >
    <Text style={{textAlign: 'center', width: '100%', padding: 10}}>Effacer les critères</Text>
    </Pressable>
                
                
                </View>
                </View>
                );
              }