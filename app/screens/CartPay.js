import React, {useRef, useEffect, useState } from "react";
import { or } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import Loader from "./Loader";
import axios from "axios";

export default function CartPay({ route,navigation }) {
  
  const user = useSelector((state) => state.user);
  const { tko_id, total } = route.params;
  
  const [tko_idDistant, setTko_idDistant] = useState('');
  
  const [urlPaiement, setUrlPaiement] 
  //= useState("https://www.festivaloffavignon.com/ws/pay_basket.aspx?r=" + Math.random());
  = useState();
  
  //const [tko_id, setTko_id] = useState(0);
  
  const jsCode =
  "document.body.style.userSelect = 'none';document.querySelector('.navbar-default').style.display = 'none'; document.querySelector('footer').style.display = 'none';";
  
  
  const webViewRef = useRef();
  
  
  useEffect(() => {
    
    console.log('total->', total);
    
    getDistantCart();
    // console.log('tko_idDistant' + tko_idDistant);
    
   // if(tko_idDistant!=0 && tko_id != 0 && tko_idDistant == tko_id){
      

        //getCmsLogin();  
        setUrlPaiement("https://www.festivaloffavignon.com/ws/pay_basket/"+tko_id); 
       
        // webViewRef.current.clearCache();  
        
     // }
      
    }, []);
    
    
    
    const getCmsLogin = async() => {
      
      await axios
      .get("https://api.festivaloffavignon.com/cms/login", {
      headers: {
        "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
        token: user.token,
      },
    })
    .then((user) => {
      console.log("success cms login");
 
      
    })
    
    .catch((error) => {
      console.log(error);
      //setLoading(false);
    });
    
  }
  
  
  
  
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
      // console.log(JSON.stringify(response.data));
      //   console.log(response.data.basket.tko_ticket_fees.fees_nb);
      
      //update fees
      /*
      {"basket":{"tko_id":130496,"tko_payed":0,"tko_expiration":"/Date(1655256214860+0200)/","tko_expiration_string":"2022-06-15T03:23:34.8600000","tko_expiration_paybox":"/Date(1655256952297+0200)/","tko_expiration_paybox_string":"2022-06-15T03:35:52.2970000","tko_tickets":[{"sh_id":29389,"sh_name":"Dans les bois","sh_date":"/Date(1657956600000+0200)/","sh_date_string":"2022-07-16T09:30:00.0000000","sh_date_id":2111180,"ticket_type":1,"ticket_price":1000},{"sh_id":29389,"sh_name":"Dans les bois","sh_date":"/Date(1658475000000+0200)/","sh_date_string":"2022-07-22T09:30:00.0000000","sh_date_id":2111186,"ticket_type":1,"ticket_price":1000},{"sh_id":29389,"sh_name":"Dans les bois","sh_date":"/Date(1658475000000+0200)/","sh_date_string":"2022-07-22T09:30:00.0000000","sh_date_id":2111186,"ticket_type":1,"ticket_price":1000}],"tko_ticket_fees":{"fees_nb":3,"fees_unit_price":100},"tko_price":3300}}
      */
      setTko_idDistant(response.data.basket.tko_id);
      console.log('ssetTko_idDistant'+response.data.basket.tko_id);
      
      //frais = fees_nb x fees_unit_price
      // setFees(response.data.basket.tko_ticket_fees.fees_nb * response.data.basket.tko_ticket_fees.fees_unit_price / 100);
      
      
    })
    .catch(function (error) {
      console.log(error);
    });
    
    
    
    
  }
  
  return (
    <WebView
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      
    }}
    
    ref={(ref) => webViewRef.current = ref} 
    
    onNavigationStateChange={(e) => {
      console.log(e.url);
      console.log( e.url.includes('paiement-annulation') ) ;
      // console.warn("current state is ", JSON.stringify(e, null, 2));
      /** put your comdition here based here and close webview.
      Like if(e.url.indexOf("end_url") > -1)
      Then close webview
      */
      //  if(!e.url.includes("pay_basket.aspx" && !e.url.includes('paybox')) ){
     
        if(!e.url.includes('pay_basket') ){
     
      if(!e.url.includes('paybox') ){

        if(!e.url.includes('PBX_TOTAL='+ total) ){
          setUrlPaiement("https://www.festivaloffavignon.com/ws/pay_basket/"+ tko_idDistant);

        }

      }
       
        //   setUrlPaiement("https://www.festivaloffavignon.com/ws/pay_basket.aspx");
        
        
      }
      
      //   if(e.url.includes('paiement-annulation') === true
      if(e.url.includes('panier') === true
      
      )  
      {
        
        
        //document.querySelector('body').reload();
        // navigation.goBack();
        //redirect to pay_basket.aspx
        //setUrlPaiement({uri:e.url});
        //  setUrlPaiement("https://www.festivaloffavignon.com/ws/pay_basket.aspx");
        //document.location.href = "https://www.festivaloffavignon.com/ws/pay_basket.aspx";
        
        //redirect to https://www.festivaloffavignon.com/ws/pay_basket.aspx
        
      }
    }}
    
    
    source={{ uri: urlPaiement }}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    startInLoadingState={true}
    scalesPageToFit={true}
   // incognito={true}
    renderLoading={(e) => {
      return <Loader />;
    }}
    injectedJavaScript={jsCode}
    />
    );
  }
  