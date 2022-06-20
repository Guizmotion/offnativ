import React, { useReducer, createContext,useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Storage } from 'expo-storage';

const initialCartesAbonnementState = {
    
 
    Cartes: 
        

            [ /*
               {
                "id": 1,    
                "statut" : "brouillon",
                    "numero_carte" : "123456789",
                    "code_promo": "",
                    "structure": "",
                    "nom" : "perodo",
                    "prenom" : "nico",
                    "adresse" : "rue de la paix",
                    "ville" : "paris",
                    "codePostal" : "75000",
                    "telephone" : "0123456789",
                    "pays" : "france",
                    "livraison" : "courrier",
                    "photo": ""
                },
                {
                    "id": 2,
                    "statut" : "brouillon",
                    "numero_carte" : "123456789",
                    "code_promo": "",
                    "structure": "",
                    "nom" : "perodo2",
                    "prenom" : "nico",
                    "adresse" : "rue de la paix",
                    "ville" : "paris",
                    "codePostal" : "75000",
                    "telephone" : "0123456789",
                    "pays" : "france",
                    "livraison" : "courrier",
                    "photo": ""
                },*/
            ]
    

    
        };

     

export const CartesAbonnementContext = createContext(initialCartesAbonnementState);



const reducer = (stateCartesAbonnement, action) => {
    
    switch (action.type) {


        
        case "ADD_CARTE_ABONNEMENT":
        
        //console.log(action.payload)
        if (action.payload) {

            return {
                ...stateCartesAbonnement,
                Cartes: [...stateCartesAbonnement.Cartes, action.payload]
            };
        
          }
        else {
            return {
                ...stateCartesAbonnement,
                Cartes: [...stateCartesAbonnement.Cartes]
            };
        }

        case "DELETE_CARTE_ABONNEMENT":
            return {
                ...stateCartesAbonnement,
                Cartes: stateCartesAbonnement.Cartes.filter(carte => carte.id !== action.payload)
            };
        case "UPDATE_CARTE_ABONNEMENT":
            return {
                ...stateCartesAbonnement,
                Cartes: stateCartesAbonnement.Cartes.map(carte => carte.id === action.payload.id ? action.payload : carte)
            };
        case "SET_CARTES_ABONNEMENT":
            
            return {
                ...stateCartesAbonnement,
                Cartes: action.payload
            };
      
            default:
        return stateCartesAbonnement;
    }
};

export const CartesAbonnementContainer = ({ children }) => {
   
   //set initial state from async storage



    
    const [stateCartesAbonnement, dispatchCartesAbonnement] = useReducer(reducer, initialCartesAbonnementState);
   

// Loading initial Satte
useEffect(() => {


     // declare the data fetching function
  const fetchCartes = async () => {
    const value = JSON.parse(
        await Storage.getItem({ key: "CartesAbonnement" })
       );
       if (value ) {
        // console.log("SET_CARTES_ABONNEMENT", value);
         dispatchCartesAbonnement({ type: "SET_CARTES_ABONNEMENT", payload: value });
     }
  }
    fetchCartes(); 

}, []);

  // Update AsyncStorage when user is updated
  useEffect(() => {
    // This check is required to avoid initial writing to asyncStorage
    if(stateCartesAbonnement.Cartes) {
        //AsyncStorage.setItem("CartesAbonnement", JSON.stringify(stateCartesAbonnement.Cartes));

        

                 // declare the data fetching function
  const setCartes = async () => {
    await Storage.setItem({
        key: 'CartesAbonnement',
        value: JSON.stringify(stateCartesAbonnement.Cartes)
        });
  }
    setCartes(); 


    }
    
  }, [stateCartesAbonnement.Cartes]);




 
    return (
        <CartesAbonnementContext.Provider value={{ stateCartesAbonnement, dispatchCartesAbonnement }}>
        {children}
        </CartesAbonnementContext.Provider>
        );
    };
    