import React from "react";
import { WebView } from 'react-native-webview';
import Loader from "./Loader";

export default function AvantagesCarteAbonnement({ navigation}) {

  const jsCode = "document.body.style.userSelect = 'none';document.querySelector('header').style.display = 'none !important'; document.querySelector('footer').style.display = 'none'; document.querySelector('.cc-window.cc-floating.cc-type-info.cc-theme-classic').style.display='none';";

    return (  
    
     
    <WebView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}
    source={{ uri: 'https://www.festivaloffavignon.com/agenda-actualites/' }}
    
    javaScriptEnabled={true}
    domStorageEnabled={true}
    startInLoadingState={true}
    scalesPageToFit={true}
    renderLoading={(e) => { return ( <Loader />  );  }}

    injectedJavaScript={jsCode}
    />
  
      );
  }