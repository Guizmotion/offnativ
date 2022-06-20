import React, { useCallback, useEffect, useState } from "react";
import {
  useIsFocused,
  ToastAndroid,

  Text,

  View,
  Linking,
  Pressable,

} from "react-native";
import axios from "axios";
import Toast from "react-native-root-toast";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../config/styles/StyleGeneral";
import { FlatList } from "react-native-gesture-handler";



  
  export default function Factures({ navigation }) {
    
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const[invoices, setInvoices] = useState({});
    
    
    const getInvoices = async () => {
      let data = '';
      
      let config = {
        method: 'post',
        url: 'https://api.festivaloffavignon.com/profile/invoices',
        headers: { 
          'api-key': '8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8', 
          'token': user.token },
          data : data
        };
        
        await axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setInvoices(response.data.invoices);
          
        })
        .catch(function (error) {
          console.log(error);
        });
        
      }
      
      useEffect(() => { 
        getInvoices();
       // setIsLoading(false);
      }
      , []);
      
      
      const handleDownload = async( url ) => {
        await axios
        .get("https://api.festivaloffavignon.com/cms/login", {
        headers: {
          "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
          token: user.token,
        },
      })
      .then((response) => {
        console.log("get cms/login" );
        console.log(response.data);
        console.log("download invoice : " + url);
        Linking.openURL(url);
      })
      
      .catch((error) => {
        console.log(error);
        
      });
      
      
    };
    
    
    
    const renderItem = ({ item,i }) => {
      /*"invoices":[
        {
          "fes_id":22,
          "date":"/Date(1655287157783+0200)/",
          "date_string":"2022-06-15T11:59:17.7830000",
          "invoice_number":"CA-F2022-025343",
          "url":"https://www.festivaloffavignon.com/mon-compte/impression-facture-85272"
        }
      ]
    }
    */
    
    return(
      <View style={styles.carteAbonnement} key={item.invoice_number}>
      <View style={styles.carteAbonnement_header}>
      <Text style={styles.carteAbonnement_header_text}>Facture N° {item.invoice_number}</Text>
      </View>
      <View style={styles.carteAbonnement_body}>
      <View style={styles.carteAbonnement_body_left}>
      
      <Pressable
      
      onPress={() => {
        
        handleDownload(item.url);
        
      }}
      ><Text>Télécharger</Text>
      </Pressable> 
      
      </View>
      <View style={styles.carteAbonnement_body_right}>
      <Text style={styles.carteAbonnement_header_text}>Festival 20{item.fes_id}</Text>
      <Text>date : {item.date_string}</Text>
      
      
      
      </View>
      
      </View>
      </View>
      
      
      );
      
    }
    
    
    
    return (
      <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        top: "10%",
      }}
      ><FlatList
      data={() => invoices}
      renderItem={(item) => renderItem(item)}
      keyExtractor={(item) => item.invoice_number}
      
      style={{ width: "100%", height: "100%" }}
      
      onEndReached={() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }
        , 2000);
      }
    }
    
    ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "black" }} />}
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 600 }}>
        <Text>Aucune facture à afficher</Text>
      </View>
    );
  }
  }

  
  />
  </View>
  );
}
