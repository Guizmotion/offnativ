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
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import styles from "../../config/styles/StyleGeneral";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-root-toast";
//import Token from "../../hooks/Token";


  
  export default function MofifierProfil({ navigation }) {

   // const dispatch = useDispatch();
    const state = useSelector((state) => state.user);
    //const token = state.token;
   // console.log(token);

    const  listPays= [
   
      { value:"AF", label:"Afghanistan"},
      { value:"ZA", label:"Afrique du Sud"},
      { value:"AX", label:"Åland, Îles"},
      { value:"AL", label:"Albanie"},
      { value:"DZ", label:"Algérie"},
      { value:"DE", label:"Allemagne"},
      { value:"AD", label:"Andorre"},
      { value:"AO", label:"Angola"},
      { value:"AI", label:"Anguilla"},
      { value:"AQ", label:"Antarctique"},
      { value:"AG", label:"Antigua-et-Barbuda"},
      { value:"AN", label:"Antilles Néerlandaises"},
      { value:"SA", label:"Arabie Saoudite"},
      { value:"AR", label:"Argentine"},
      { value:"AM", label:"Arménie"},
      { value:"AW", label:"Aruba"},
      { value:"AU", label:"Australie"},
      { value:"AT", label:"Autriche"},
      { value:"AZ", label:"Azerbaïdjan"},
      { value:"BS", label:"Bahamas"},
      { value:"BH", label:"Bahreïn"},
      { value:"BD", label:"Bangladesh"},
      { value:"BB", label:"Barbade"},
      { value:"BY", label:"Bélarus"},
      { value:"BE", label:"Belgique"},
      { value:"BZ", label:"Belize"},
      { value:"BJ", label:"Bénin"},
      { value:"BM", label:"Bermudes"},
      { value:"BT", label:"Bhoutan"},
      { value:"BO", label:"Bolivie"},
      { value:"BA", label:"Bosnie-herzégovine"},
      { value:"BW", label:"Botswana"},
      { value:"BV", label:"Bouvet, Île"},
      { value:"BR", label:"Brésil"},
      { value:"BN", label:"Brunéi Darussalam"},
      { value:"BG", label:"Bulgarie"},
      { value:"BF", label:"Burkina Faso"},
      { value:"BI", label:"Burundi"},
      { value:"KY", label:"Caïmanes, Îles"},
      { value:"KH", label:"Cambodge"},
      { value:"CM", label:"Cameroun"},
      { value:"CA", label:"Canada"},
      { value:"CV", label:"Cap-vert"},
      { value:"CF", label:"Centrafricaine, République"},
      { value:"CL", label:"Chili"},
      { value:"CN", label:"Chine"},
      { value:"CX", label:"Christmas, Île"},
      { value:"CY", label:"Chypre"},
      { value:"CC", label:"Cocos (keeling), Îles"},
      { value:"CO", label:"Colombie"},
      { value:"KM", label:"Comores"},
      { value:"CG", label:"Congo"},
      { value:"CD", label:"Congo, La République Démocratique du"},
      { value:"CK", label:"Cook, Îles"},
      { value:"KR", label:"Corée, République de"},
      { value:"KP", label:"Corée, République Populaire Démocratique de"},
      { value:"CR", label:"Costa Rica"},
      { value:"CI", label:"Côte d'Ivoire"},
      { value:"HR", label:"Croatie"},
      { value:"CU", label:"Cuba"},
      { value:"DK", label:"Danemark"},
      { value:"DJ", label:"Djibouti"},
      { value:"DO", label:"Dominicaine, République"},
      { value:"DM", label:"Dominique"},
      { value:"EG", label:"Égypte"},
      { value:"SV", label:"El Salvador"},
      { value:"AE", label:"Émirats Arabes Unis"},
      { value:"EC", label:"Équateur"},
      { value:"ER", label:"Érythrée"},
      { value:"ES", label:"Espagne"},
      { value:"EE", label:"Estonie"},
      { value:"US", label:"États-Unis"},
      { value:"ET", label:"Éthiopie"},
      { value:"FK", label:"Falkland, Îles (Malvinas)"},
      { value:"FO", label:"Féroé, Îles"},
      { value:"FJ", label:"Fidji"},
      { value:"FI", label:"Finlande"},
      { value:"FR", label:"France"},
      { value:"GA", label:"Gabon"},
      { value:"GM", label:"Gambie"},
      { value:"GE", label:"Géorgie"},
      { value:"GS", label:"Géorgie du Sud et les Îles Sandwich du Sud"},
      { value:"GH", label:"Ghana"},
      { value:"GI", label:"Gibraltar"},
      { value:"GR", label:"Grèce"},
      { value:"GD", label:"Grenade"},
      { value:"GL", label:"Groenland"},
      { value:"GP", label:"Guadeloupe"},
      { value:"GU", label:"Guam"},
      { value:"GT", label:"Guatemala"},
      { value:"GG", label:"Guernesey"},
      { value:"GN", label:"Guinée"},
      { value:"GQ", label:"Guinée Équatoriale"},
      { value:"GW", label:"Guinée-bissau"},
      { value:"GY", label:"Guyana"},
      { value:"GF", label:"Guyane Française"},
      { value:"HT", label:"Haïti"},
      { value:"HM", label:"Heard, Île et Mcdonald, Îles"},
      { value:"HN", label:"Honduras"},
      { value:"HK", label:"Hong-Kong"},
      { value:"HU", label:"Hongrie"},
      { value:"IM", label:"Île de Man"},
      { value:"UM", label:"Îles Mineures Éloignées des États-Unis"},
      { value:"VG", label:"Îles Vierges Britanniques"},
      { value:"VI", label:"Îles Vierges Des États-unis"},
      { value:"IN", label:"Inde"},
      { value:"ID", label:"Indonésie"},
      { value:"IR", label:"Iran, République Islamique d'"},
      { value:"IQ", label:"Iraq"},
      { value:"IE", label:"Irlande"},
      { value:"IS", label:"Islande"},
      { value:"IL", label:"Israël"},
      { value:"IT", label:"Italie"},
      { value:"JM", label:"Jamaïque"},
      { value:"JP", label:"Japon"},
      { value:"JE", label:"Jersey"},
      { value:"JO", label:"Jordanie"},
      { value:"KZ", label:"Kazakhstan"},
      { value:"KE", label:"Kenya"},
      { value:"KG", label:"Kirghizistan"},
      { value:"KI", label:"Kiribati"},
      { value:"KW", label:"Koweït"},
      { value:"LA", label:"Lao, République Démocratique Populaire"},
      { value:"LS", label:"Lesotho"},
      { value:"LV", label:"Lettonie"},
      { value:"LB", label:"Liban"},
      { value:"LR", label:"Libéria"},
      { value:"LY", label:"Libyenne, Jamahiriya Arabe"},
      { value:"LI", label:"Liechtenstein"},
      { value:"LT", label:"Lituanie"},
      { value:"LU", label:"Luxembourg"},
      { value:"MO", label:"Macao"},
      { value:"MK", label:"Macédoine, L'ex-République Yougoslave de"},
      { value:"MG", label:"Madagascar"},
      { value:"MY", label:"Malaisie"},
      { value:"MW", label:"Malawi"},
      { value:"MV", label:"Maldives"},
      { value:"ML", label:"Mali"},
      { value:"MT", label:"Malte"},
      { value:"MP", label:"Mariannes Du Nord, Îles"},
      { value:"MA", label:"Maroc"},
      { value:"MH", label:"Marshall, Îles"},
      { value:"MQ", label:"Martinique"},
      { value:"MU", label:"Maurice"},
      { value:"MR", label:"Mauritanie"},
      { value:"YT", label:"Mayotte"},
      { value:"MX", label:"Mexique"},
      { value:"FM", label:"Micronésie, États Fédérés de"},
      { value:"MD", label:"Moldova, République de"},
      { value:"MC", label:"Monaco"},
      { value:"MN", label:"Mongolie"},
      { value:"ME", label:"Monténégro"},
      { value:"MS", label:"Montserrat"},
      { value:"MZ", label:"Mozambique"},
      { value:"MM", label:"Myanmar"},
      { value:"NA", label:"Namibie"},
      { value:"NR", label:"Nauru"},
      { value:"NP", label:"Népal"},
      { value:"NI", label:"Nicaragua"},
      { value:"NE", label:"Niger"},
      { value:"NG", label:"Nigéria"},
      { value:"NU", label:"Niué"},
      { value:"NF", label:"Norfolk, Île"},
      { value:"NO", label:"Norvège"},
      { value:"NC", label:"Nouvelle-Calédonie"},
      { value:"NZ", label:"Nouvelle-Zélande"},
      { value:"IO", label:"Océan Indien, Territoire Britannique de l'"},
      { value:"OM", label:"Oman"},
      { value:"UG", label:"Ouganda"},
      { value:"UZ", label:"Ouzbékistan"},
      { value:"PK", label:"Pakistan"},
      { value:"PW", label:"Palaos"},
      { value:"PS", label:"Palestinien Occupé, Territoire"},
      { value:"PA", label:"Panama"},
      { value:"PG", label:"Papouasie-Nouvelle-Guinée"},
      { value:"PY", label:"Paraguay"},
      { value:"NL", label:"Pays-Bas"},
      { value:"PE", label:"Pérou"},
      { value:"PH", label:"Philippines"},
      { value:"PN", label:"Pitcairn"},
      { value:"PL", label:"Pologne"},
      { value:"PF", label:"Polynésie Française"},
      { value:"PR", label:"Porto Rico"},
      { value:"PT", label:"Portugal"},
      { value:"QA", label:"Qatar"},
      { value:"RE", label:"Réunion"},
      { value:"RO", label:"Roumanie"},
      { value:"GB", label:"Royaume-Uni"},
      { value:"RU", label:"Russie, Fédération de"},
      { value:"RW", label:"Rwanda"},
      { value:"EH", label:"Sahara Occidental"},
      { value:"BL", label:"Saint-Barthélemy"},
      { value:"SH", label:"Sainte-Hélène"},
      { value:"LC", label:"Sainte-lucie"},
      { value:"KN", label:"Saint-Kitts-et-Nevis"},
      { value:"SM", label:"Saint-Marin"},
      { value:"MF", label:"Saint-Martin"},
      { value:"PM", label:"Saint-Pierre-et-Miquelon"},
      { value:"VA", label:"Saint-siège (État de la Cité du Vatican)"},
      { value:"VC", label:"Saint-Vincent-et-les-Grenadines"},
      { value:"SB", label:"Salomon, Îles"},
      { value:"WS", label:"Samoa"},
      { value:"AS", label:"Samoa Américaines"},
      { value:"ST", label:"Sao Tomé-et-Principe"},
      { value:"SN", label:"Sénégal"},
      { value:"RS", label:"Serbie"},
      { value:"CS", label:"Seychelles"},
      { value:"SC", label:"Seychelles"},
      { value:"SL", label:"Sierra Leone"},
      { value:"SG", label:"Singapour"},
      { value:"SK", label:"Slovaquie"},
      { value:"SI", label:"Slovénie"},
      { value:"SO", label:"Somalie"},
      { value:"SD", label:"Soudan"},
      { value:"LK", label:"Sri Lanka"},
      { value:"SE", label:"Suède"},
      { value:"CH", label:"Suisse"},
      { value:"SR", label:"Suriname"},
      { value:"SJ", label:"Svalbard et Île Jan Mayen"},
      { value:"SZ", label:"Swaziland"},
      { value:"SY", label:"Syrienne, République Arabe"},
      { value:"TJ", label:"Tadjikistan"},
      { value:"TW", label:"Taïwan, Province de Chine"},
      { value:"TZ", label:"Tanzanie, République-Unie de"},
      { value:"TD", label:"Tchad"},
      { value:"CZ", label:"Tchèque, République"},
      { value:"TF", label:"Terres Australes Françaises"},
      { value:"TH", label:"Thaïlande"},
      { value:"TL", label:"Timor-leste"},
      { value:"TG", label:"Togo"},
      { value:"TK", label:"Tokelau"},
      { value:"TO", label:"Tonga"},
      { value:"TT", label:"Trinité-et-Tobago"},
      { value:"TN", label:"Tunisie"},
      { value:"TM", label:"Turkménistan"},
      { value:"TC", label:"Turks et Caïques, Îles"},
      { value:"TR", label:"Turquie"},
      { value:"TV", label:"Tuvalu"},
      { value:"UA", label:"Ukraine"},
      { value:"UY", label:"Uruguay"},
      { value:"VU", label:"Vanuatu"},
      { value:"VE", label:"Venezuela"},
      { value:"VN", label:"Viet Nam"},
      { value:"WF", label:"Wallis et Futuna"},
      { value:"YE", label:"Yémen"},
      { value:"YU", label:"Yougoslavie"},
      { value:"ZM", label:"Zambie"},
      { value:"ZW", label:"Zimbabwe"}
  ];


    const [email, setEmail] = useState("");   
    const [Nom, setNom] = useState("");
    const [Prenom, setPrenom] = useState("");
    const [DateNaissance, setDateNaissance] = useState("");
    const [Pays, setPays] = useState("");
    const [LabelPays,setLabelPays ] = useState("");
    const [Ville, setVille] = useState("");
    const [CodePostal, setCodePostal] = useState("");
    const [Styles, setStyles] = useState("");
    const [Audience, setAudience] = useState("");
    const [Newsletter, setNewsletter] = useState(false);
    const [Stats, setStats] = useState(false);
    const [modalmdpVisible, setModalmdpVisible] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const pickerStyle = {
      inputIOS: {
        textAlign: 'right',
        marginRight: 20,
        height: 50
        
      },
    }

    useEffect(() => {

      if(Pays !== ""){
      let currentPaysLabel = listPays.find(item => item.value === Pays).label;
      setLabelPays(currentPaysLabel);
      
      }


  }, [listPays]);


    const handleModifierMesinfos = () => {
      let m = "Modification en cours...";"ios"===Platform.OS?Toast.show(m,Toast.SHORT):ToastAndroid.show(m,ToastAndroid.SHORT);

      //var data = '{\r\n    "firstname":"Testeur",\r\n    "lastname":"DIGITO",\r\n    "postalcode":"84000",\r\n    "city":"Avignon ",\r\n    "country":"ES",\r\n    "allow_news": true,\r\n    "allow_localnews": false\r\n}';
      let data = '{\r\n    "firstname":"' + Nom + '",\r\n    "lastname":"' + Prenom + '",\r\n    "postalcode":"' + CodePostal + '",\r\n    "city":"' + Ville + '",\r\n    "country":"' + Pays + '",\r\n    "allow_news": ' + Newsletter + ',\r\n    "allow_localnews": ' + Stats + '\r\n}';
      console.log(data);

      let config = {
        method: 'patch',
        url: 'https://api.festivaloffavignon.com/profile',
        headers: { 
          'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8', 
          'token':state.token
           },
        data : data
      };

      axios(config)
        .then(function (response) {
          if (response.data.success== true) {

            let m = "Modification effectuée avec succès";;"ios"===Platform.OS?Toast.show(m,Toast.SHORT):ToastAndroid.show(m,ToastAndroid.SHORT);
            navigation.navigate("ProfilMenu");
          } else {
            let m = "Erreur lors de la modification";;"ios"===Platform.OS?Toast.show(m,Toast.SHORT):ToastAndroid.show(m,ToastAndroid.SHORT);
          }
        }
        )
        .catch(function (error) {
          console.log(error);
        }
        );
    }




  const handleMdpOublie = (event) => {
    let m = "Vérification de l'ancien mot de passe ...";"ios"===Platform.OS?Toast.show(m,Toast.SHORT):ToastAndroid.show(m,ToastAndroid.SHORT);

   // var axios = require('axios');
    var data = '{\r\n    "old_password":"' + oldPassword + '",\r\n    "new_password":"' + newPassword + '"\r\n}';
    
    var config = {
      method: 'patch',
      url: 'https://api.festivaloffavignon.com/profile/password',
      headers: { 
        'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8', 
        'token': state.token
         },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setModalmdpVisible(!modalmdpVisible);
      let m = "Merci, votre nouveau mot de passe vous a été enregistré";"ios"===Platform.OS?Toast.show(m,Toast.SHORT):ToastAndroid.show(m,ToastAndroid.SHORT);
    
    })
    .catch(function (error) {
      console.log(error);
    });
    
   
  }

    const getProfile = async () => {

      console.log('token : ' + state.token);
      var data = '';
      var config = {
        method: 'post',
        url: 'https://api.festivaloffavignon.com/profile',
        headers: { 
          'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8', 
          'token': state.token
          
        },
        data : data
      };
      
      await axios(config)
      .then(function (response) {
//{"firstname":"Nicolas","lastname":"PERAUDEAU","email":"perodo@gmail.com","postalcode":"84000","city":"Avignon","country":"ZW","allow_news":true,"allow_localnews":true,"pro":false}

       // console.log(JSON.stringify(response.data.profile));
        if(response.data.profile == null){
          let m = "Erreur lors de la récupération de vos informations";"ios"===Platform.OS?Toast.show(m,Toast.SHORT):ToastAndroid.show(m,ToastAndroid.SHORT);
        }
        else{
          setEmail(response.data.profile.email);
          setNom(response.data.profile.firstname);
          setPrenom(response.data.profile.lastname);
          setPays(response.data.profile.country);
          setVille(response.data.profile.city);
          setCodePostal(response.data.profile.postalcode);
          setNewsletter(response.data.profile.allow_news);
          setStats(response.data.profile.allow_localnews);
        }


      })
      .catch(function (error) {
        console.log(error);
        
      });
    
    }



useEffect(() => {
  getProfile();
}
, [state.token]);
    
    return (
      <View  style={{flexDirection: 'column',
      width: '90%',
      margin: '5%',
      marginLeft: '5%',
      marginRight: '5%',
      height: '100%'}}>
      <ScrollView style={{flex: 1}}>
      <TextInput style={styles.inputStyle}  placeholder="Prénom" placeholderTextColor="rgba(0,0,0,0.3)"
      onChangeText={(text) => setPrenom(text)}
      value={Prenom}
      />
      <TextInput style={styles.inputStyle} placeholder="Nom"  placeholderTextColor="rgba(0,0,0,0.3)" 
     onChangeText={(text) => setNom(text)}
     value={Nom}
      />
      <TextInput style={styles.inputStyle} placeholder="Email" placeholderTextColor="rgba(0,0,0,0.3)"  
     onCHangeText={(text) => setEmail(text)}
     value={email}
      />
      <TextInput style={styles.inputStyle} placeholder="Code postal"  placeholderTextColor="rgba(0,0,0,0.3)" 
      onChangeText={(text) => setCodePostal(text)}
      value={CodePostal}
      />
      <TextInput style={styles.inputStyle} placeholder="Ville"  placeholderTextColor="rgba(0,0,0,0.3)" 
      onChangeText={(text) => setVille(text)}
      value={Ville}
      />

      
      <View style={{
        padding: 15,
        flexDirection: "row",
        alignContent: "space-between",
        width: "100%",
        alignItems: "center", 
      }}>
      <Text>
      {LabelPays ? LabelPays : "Pays"}
      </Text>
      <View    style={{width: "70%",  right:0,   position: "absolute", minHeight: 30}}>
      
      <RNPickerSelect
                   // style={pickerStyle}
                    items={listPays}
                    onValueChange={(value) => 
                      {  
                        setPays(value);

                      }
                    }

                    placeholder={{
                        //label: LabelPays ?  Pays: 'Selectionner un pays' ,
                        label : 'Selectionner un pays',
                        value: null,
                     }}
/*
                     value={{
                        label: LabelPays,
                        value: Pays,
                     }}*/

                        value={Pays}
                    
                    /></View>
      </View>
     
      

      <View
      style={{
        padding: 15,
        flexDirection: "row",
        alignContent: "space-between",
        width: "100%",
        alignItems: "center",
      }}
      ><Text>Newsletter</Text>
      <View style={{ position: "absolute", right: 15, marginTop: 5 }}>
      <Switch
      
      onChange={() => setNewsletter(!Newsletter)}
      value={Newsletter}
      /></View></View>

      <View
      style={{
        padding: 15,
        flexDirection: "row",
        alignContent: "space-between",
        width: "100%",
        alignItems: "center",
      }}
      ><Text>Stats</Text>
      <View style={{ position: "absolute", right: 15, marginTop: 5 }}>
      <Switch
      
      onChange={() => setStats(!Stats)}
      value={Stats}
      /></View></View>

<View
      style={{
        padding: 15,
        flexDirection: "row",
        alignContent: "space-between",
        width: "100%",
        alignItems: "center",
        paddingBottom: 100
      }}
      >
<Pressable
  onPress={() => setModalmdpVisible(!modalmdpVisible)}
  >
    <View  style={[styles.labelCard,styles.bigButton]} >
                <Text style={{color: '#fff', textAlign: 'center', width: '100%'}}> Modifier votre Mot de passe</Text></View>
</Pressable>

</View>



      
     

      
    
    

    
</ScrollView>
    


    <View style={{   flex: 2, position: 'absolute', bottom: 150, width: '90%', marginLeft: '5%', textAlign: 'center' }} >
  
                
    
        <Pressable 
          onPress={handleModifierMesinfos}  
          style={[styles.labelCard, styles.labelAchat, styles.bigButton]} >
            <Text style={[styles.textBigButton]}>Modifier mes infos</Text>
        </Pressable>

    </View>
    
    




















    <Modal
                   animationType={'slide'}
                   hardwareAccelerated={true}
                   transparent={false}
                   visible={modalmdpVisible}
                   
                   onRequestClose={() => {
                    //Alert.alert('Modal has been closed.');
                    setModalmdpVisible(!modalmdpVisible);
                    
                  }}>   

<View style={{ margin: 0, height: '100%', padding: 30, paddingTop: 100 }}>
<Text  style={{fontSize: 16,width: "100%",fontWeight: "bold", textAlign: "center"}}>Modifier mon mot de passe</Text>
<TextInput style={styles.inputStyle} placeholder="Saisir l'ancien Mot de passe"  placeholderTextColor="rgba(0,0,0,0.3)" 
      value={oldPassword}
      onChangeText={(pwd) => setOldPassword(pwd)}
        />
 <TextInput 
  value={newPassword}
  onChangeText={(pwd) => setNewPassword(pwd)}
 style={styles.inputStyle} placeholder="Saisir le nouveau mot de passe" placeholderTextColor="rgba(0,0,0,0.3)"  />

      <TouchableOpacity onPress={handleMdpOublie}             >
              <View  style={[styles.labelCard, styles.labelAchat, styles.bigButton]} >
                <Text style={styles.textBigButton}>Valider</Text>
              </View>
            </TouchableOpacity>
            <Pressable
  onPress={() => setModalmdpVisible(!modalmdpVisible)}

    >
    <Text style={{textAlign: 'center', width: '100%', padding: 10}}>Annuler</Text>
    </Pressable>


            </View>
            
</Modal>
    






























    </View>
    );
  }