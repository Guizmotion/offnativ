import React, { useEffect, useState, useRef } from "react";
import {
  ToastAndroid,
  Image,
  Text,
  TextInput,
  Linking,
  DrawerContentScrollView,
  View,
  StyleSheet,
  ScrollViewButton,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  RefreshControl,
  Share,
  Platform,
} from "react-native";
import axios from "axios";
import Toast from "react-native-root-toast";
import { Image as ImgLazy, Icon } from "react-native-elements";

import { Card } from "react-native-paper";
import styles from "../config/styles/StyleGeneral";

// import { FavorisContext } from "../store/storeFavoris";

import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";

const ProgrammeCard = ({ item }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const stateFavoris = useSelector((state) => state.favoris);
  // const { stateFavoris, dispatchFavoris } = React.useContext(FavorisContext);

  const [modalVisible, setModalVisible] = useState(false);

  const [itemId, setItemId] = useState([]);

  const [itemAcces_handicape, setItemAcces_handicape] = useState([]);
  const [itemTitre_spectacle, setItemTitre_spectacle] = useState([]);
  const [itemAuteur_prenom, setItemAuteur_prenom] = useState([]);
  const [itemNom, setItemNom] = useState([]);

  const [itemTicket_off, setItemTickets_off] = useState([]);
  const [itemHoraire, setItemHoraire] = useState([]);
  const [itemImage, setItemImage] = useState([]);
  const [itemDuree, setItemDuree] = useState([]);

  const [itemType_public, setItemType_public] = useState([]);
  const [itemCategorie, setItemCategorie] = useState([]);
  const [itemLieu, setItemLieu] = useState([]);
  const [itemDescription, setItemDescription] = useState([]);
  const [itemStyle, setItemStyle] = useState([]);
  const [itemSalle, setItemSalle] = useState([]);
  const [itemTheatre, setItemTheatre] = useState([]);
  const [itemDeja_joue, setItemDeja_joue] = useState([]);
  const [itemNon_francophones, setItemNon_francophones] = useState([]);
  const [itemPlein_air, setItemPlein_air] = useState([]);
  const [itemClim, setItemClim] = useState([]);
  const [itemEspeces, setItemEspeces] = useState([]);
  const [itemCheques, setItemCheques] = useState([]);
  const [itemCb, setItemCb] = useState([]);
  const [itemTel_reservation, setItemTel_reservation] = useState([]);
  const [itemCompagnie, setItemCompagnie] = useState([]);
  const [itemAdresse, setItemAdresse] = useState([]);
  const [itemCp, setItemCp] = useState([]);
  const [itemVille, setItemVille] = useState([]);
  const [itemPays, setItemPays] = useState([]);
  const [itemSite_web, setItemSite_web] = useState([]);
  const [itemBande_annonce, setItemBande_annonce] = useState([]);
  const [itemTarif_reduit_precisions, setItemTarif_reduit_precisions] =
    useState([]);
  const [itemAge, setItemAge] = useState([]);
  const [itemDates_representations, setItemDates_representations] = useState(
    []
  );
  const [itemTarif, setItemTarif] = useState([]);
  const [itemTarif_adh, setItemTarif_adh] = useState([]);
  const [itemTarif_enfant, setItemTarif_enfant] = useState([]);
  const [itemUrl, setItemUrl] = useState([]);
  const [itemUrl_fav, setItemUrl_fav] = useState([]);
  const [itemUrl_rmfav, setItemUrl_rmfav] = useState([]);
  const [itemTitre, setItemTitre] = useState([]);
  const [itemDates, setItemDates] = useState([]);
  const [itemT_Rouge, setItemT_Rouge] = useState([]);
  const [itemT_jaune, setItemT_jaune] = useState([]);
  const [itemT_bleu, setItemT_bleu] = useState([]);
  const [itemT_vert, setItemT_vert] = useState([]);
  const [itemT_turquoise, setItemT_turquoise] = useState([]);
  const [itemCharg_diff, setItemCharg_diff] = useState([]);
  const [itemTelephone, setItemTelephone] = useState([]);
  const [itemCourriel, setItemCourriel] = useState([]);
  const [itemStructure, setItemStructure] = useState([]);
  const [itemCharg_diff_addresse, setItemCharg_diff_addresse] = useState([]);

  const [isFavorite, setIsFavorite] = useState(false);

  const add_favorite = (item) => {
    console.log("add_favorite" + item);
    // ToastAndroid.show("Ajout favori en cours...",ToastAndroid.SHORT);
    let m = "Ajout favori en cours...";
    "ios" === Platform.OS
      ? Toast.show(m, Toast.SHORT)
      : ToastAndroid.show(m, ToastAndroid.SHORT);

    setTimeout(() => {
      dispatch({
        type: "SELECT_FAVORIS",
        payload: item,
      });
    }, 1);

    setTimeout(() => {
      var id = item;
      var data = '{\r\n"sh_id": ' + id + "\r\n}";

      var config = {
        method: "post",
        url: "https://api.festivaloffavignon.com/favorite",
        headers: {
          "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
          token: state.token,
          "Content-Type": "text/plain",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));

          dispatch({
            type: "ADD_FAVORIS",
            payload: item,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }, 20);
  };

  const rm_favorite = (item) => {
    // ToastAndroid.show("Retrait d'un favori en cours...",ToastAndroid.SHORT);
    let m = "Retrait d'un favori en cours...";
    "ios" === Platform.OS
      ? Toast.show(m, Toast.SHORT)
      : ToastAndroid.show(m, ToastAndroid.SHORT);

    setTimeout(() => {
      dispatch({
        type: "UNSELECT_FAVORIS",
        payload: item,
      });
    }, 1);

    setTimeout(() => {
      let id = item;

      axios
        .delete("https://api.festivaloffavignon.com/favorite", {
          headers: {
            "api-key": "8eq+GmvX;]#.t_h-(nwT68ZXf-{2&Pr8",
            token: state.token,
          },
          data: {
            sh_id: id,
          },
        })

        .then((user) => {
          //console.log(user.data);
          //item.setIsFavorite(false);

          dispatch({
            type: "DELETE_FAVORIS",
            payload: item,
          });
        })
        .catch((error) => {
          if (error.response) {
            console.log(error);
            //console.log(error.response.data); // => the response payload
          }
        });
    }, 20);
  };

  const shareData = async () => {
    try {
      await Share.share({
        message:
          itemTitre_spectacle +
          ", " +
          //  + '  , lieu : ' +

          ", Lieu : " +
          itemLieu +
          " " +
          // itemSalle + ' ' +
          //  itemTheatre + ' ' +
          ", tel resa : " +
          itemTel_reservation +
          " " +
          ", tarif : " +
          itemTarif +
          " Eur ",
        //  ', lien web : ' + itemUrl
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const addCart = (item) => {
    const product = {
      id: item.id,
      title: item.titre_spectacle,
      price: [
        {
          price: item.tarif,
          quantity: 1,
        },
        {
          price: item.tarif_adh,
          quantity: 0,
        },
        {
          price: item.tarif_enfant,
          quantity: 0,
        },
        {
          price: item.tarif_adh,
          quantity: 0,
        },
      ],
      image: item.image,
    };

    dispatch({ type: "cart", payload: product });
  };

  function fillModal(item) {
    //console.log(item.nom);

    setItemId(item.id);
    setItemTitre_spectacle(item.titre_spectacle);
    setItemAuteur_prenom(item.auteur_prenom);
    setItemNom(item.nom);
    setItemTickets_off(item.tickets_off);
    setItemHoraire(item.horaire);
    setItemImage(item.image);
    setItemDuree(item.duree);
    setItemType_public(item.type_public);
    setItemCategorie(item.categorie);
    setItemLieu(item.lieu);
    setItemDescription(item.description);
    setItemStyle(item.style);
    setItemSalle(item.salle);
    setItemTheatre(item.theatre);
    setItemDeja_joue(item.deja_joue);
    setItemNon_francophones(item.non_francophones);
    setItemPlein_air(item.plein_air);
    setItemClim(item.clim);
    setItemEspeces(item.especes);
    setItemCheques(item.cheques);
    setItemCb(item.cb);
    setItemAcces_handicape(item.acces_handicape);
    setItemTel_reservation(item.tel_reservation);
    setItemCompagnie(item.compagnie);
    setItemAdresse(item.adresse);
    setItemCp(item.cp);
    setItemVille(item.ville);
    setItemPays(item.pays);
    setItemSite_web(item.site_web);
    setItemBande_annonce(item.bande_annonce);
    setItemTarif_reduit_precisions(item.tarif_reduit_precisions);
    setItemAge(item.age);
    setItemDates_representations(item.dates_representations);
    setItemTarif(item.tarif);
    setItemTarif_adh(item.tarif_adh);
    setItemTarif_enfant(item.tarif_enfant);
    setItemUrl(item.url);
    setItemUrl_fav(item.url_fav);
    setItemUrl_rmfav(item.url_rmfav);
    setItemDates(item.dates);
    setModalVisible(true);
    //setItemT_Rouge(item.t_Rouge);
    //setItemT_jaune(item.t_jaune);
    //setItemT_bleu(item.t_bleu);
    //setItemT_vert(item.t_vert);
    //setItemT_turquoise(item.t_turquoise);
    setItemCharg_diff(item.charg_diff);
    setItemTelephone(item.telephone);
    setItemCourriel(item.courriel);
    setItemStructure(item.structure);
    setItemCharg_diff_addresse(item.charg_diff_addresse);
    // setIsLoading(false);
  }

  let show_ticket_off = false;
  if (item.ticket_off === "Non") {
    show_ticket_off = true;
  }

  const getCategorieIcon = (categorie) => {
    let source = require("../assets/styles/theatre.png");
    // .spectaclemusical:before {background-image: url(../img/picto2.svg)}
    if (categorie === "danse") {
      source = require("../assets/styles/danse.png");
    } else if (categorie === "humour / café-théâtre") {
      source = require("../assets/styles/theatre.png");
    } else if (categorie === "théâtre") {
      source = require("../assets/styles/theatre.png");
    } else if (categorie === "spectacle musical") {
      source = require("../assets/styles/musical.png");
    } else if (categorie === "mime") {
      source = require("../assets/styles/mime.png");
    } else if (categorie === "pluridisciplinaire") {
      source = require("../assets/styles/pluridisciplinaire.png");
    } else if (categorie === "cirque") {
      source = require("../assets/styles/cirque.png");
    } else if (categorie === "poesie") {
      source = require("../assets/styles/poesie.png");
    } else if (categorie === "évènement") {
      source = require("../assets/styles/evenement.png");
    }

    return source;
  };

  const getPublicIcon = (type_public) => {
    let source = require("../assets/styles/famille.png");
    if (type_public === "public") {
      source = require("../assets/styles/enfant.png");
    } else if (type_public === "adulte") {
      source = require("../assets/styles/adulte.png");
    } else if (type_public === "enfant") {
      source = require("../assets/styles/famille.png");
    } else if (type_public === "famille") {
      source = require("../assets/picto1.png");
    }

    return source;
  };

  useEffect(() => {
    if (state.isAuthenticated && stateFavoris.SpectaclesSelected[item.id]) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [stateFavoris]);

  const url_lieu = Platform.select({
    ios: `maps:0,0?q=${item.lieu} ${item.ville}`,
    android: `geo:0,0?q=${item.lieu} ${item.ville}`,
  });

  return (
    <View key={item.id}>
      <TouchableOpacity
        // <TouchableWithoutFeedback
        // delayPressIn={10}
        onPress={() => fillModal(item)}
      >
        <Card style={styles.cardList}>
          <View style={styles.blocContent}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.Titre}>
              {item.titre_spectacle}
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "flex-start",
                width: "95%",
                alignSelf: "flex-start",
              }}
            >
              <Text style={[styles.defautText]}>
                Durée {item.duree} -{" "}
                <Text style={[styles.defautText, styles.ParagraphBold]}>
                  {item.dates_representations}
                </Text>
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignSelf: "flex-start",
              }}
            >
              <View style={styles.labelCard}>
                <Text style={styles.smallText}>{item.type_public} </Text>
              </View>
              <View style={styles.labelCard}>
                <Text style={styles.smallText}>{item.categorie} </Text>
              </View>
              <View style={[styles.labelCard, styles.labelPlace]}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.smallTextNoir}
                >
                  {item.lieu} {/*item.salle*/}
                </Text>
              </View>
              <View
                style={[
                  styles.labelCard,
                  styles.labelAchat,
                  show_ticket_off ? styles.hideElement : null,
                ]}
              >
                <Text style={styles.smallText}> Achat sur Ticket'Off </Text>
              </View>
            </View>
          </View>

          <View style={styles.blocImage}>
            <ImgLazy
              source={{ uri: item.image }}
              style={{
                width: 130,
                height: 180,
              }}
              PlaceholderContent={<Loader />}
            />
          </View>
        </Card>
      </TouchableOpacity>

      <View
        style={
          //   [styles.favorisBtn],
          {
            // display: state.isAuthenticated ? "flex" : "none" ,
            position: "absolute",
            bottom: 20,
            left: 30,
            // zIndex: 600000000,
          }
        }
      >
        {!isFavorite && state.isAuthenticated && (
          <Pressable
            activeOpacity={false}
            underlayColor="#DDDDDD"
            onPress={() => add_favorite(item.id)}
          >
            <View
              style={{
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 20,
              }}
            >
              <Image
                style={{
                  resizeMode: "cover",
                  height: 20,
                  width: 20,
                  //marginTop: -30,
                }}
                source={require("../assets/favoris.png")}
              />
            </View>
          </Pressable>
        )}

        {isFavorite && state.isAuthenticated && (
          <Pressable onPress={() => rm_favorite(item.id)}>
            <View
              style={{
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 20,
              }}
            >
              <Image
                style={{
                  resizeMode: "cover",
                  height: 20,
                  width: 20,
                }}
                source={require("../assets/favoris-active.png")}
              />
            </View>
          </Pressable>
        )}
      </View>

      <Modal
        animationType={"slide"}
        hardwareAccelerated={true}
        transparent={false}
        visible={modalVisible}
        style={{ margin: 0 }}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.imageFiche}>
          <ImgLazy
            PlaceholderContent={<Loader />}
            source={{ uri: itemImage }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Pressable
          style={styles.closeFiche}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Image
            style={{
              resizeMode: "cover",
              height: 25,
              width: 25,
            }}
            source={require("../assets/closemenu.png")}
          />
        </Pressable>

        <ScrollView style={{ marginTop: -100 }}>
          {/* DEBUT BLOC CONTENU BLANC */}
          <View
            style={{
              flex: 2,
              borderRadius: 30,
              padding: 30,
              backgroundColor: "#fff",
              width: "100%",
              paddingBottom: 100,
              marginTop: 600,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignContent: "space-between",
              }}
            >
              <View style={styles.iconStyle}>
                <Image
                  style={{
                    resizeMode: "cover",
                    height: 35,
                    width: 35,
                    alignItems: "flex-start",
                  }}
                  //  source={require("../assets/public2.png")}
                  source={getPublicIcon(item.type_public)}
                />
              </View>
              <View style={styles.iconStyle}>
                <Image
                  style={{
                    resizeMode: "cover",
                    height: 35,
                    width: 35,
                    alignItems: "flex-start",
                  }}
                  // source={require("../assets/picto1.png")}
                  source={getCategorieIcon(item.categorie)}
                />

                {itemCb === "Oui" && (
                  <Image
                    style={{
                      resizeMode: "cover",
                      height: 35,
                      width: 35,
                      alignItems: "flex-start",
                    }}
                    source={require("../assets/money.png")}
                  />
                )}

                {/*}
<Text>
    {itemCategorie}

    </Text>
    https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bithday&dates=20201231T193000Z/20201231T223000Z&details=With%20clowns%20and%20stuff&location=North%20Pole
    
    */}
              </View>
              <View style={styles.labelBigplace}>
              <Pressable
                        onPress={() => Linking.openURL(url_lieu)}
                     /*     onPress={() => {

                           let newDate = moment.utc(new Date('2022-07-07')).format('YYYY-MM-DD'
                            )+'T193000Z';
                            console.log(newDate);
                            Linking.openURL(
                              'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
                              itemTitre_spectacle +
                          //    '&dates=' + 
                           //   newDate  + '/' + newDate +
                              '&details='+
                              'à%20' + itemHoraire + '%20- Durée%20' + itemDuree +
                              '&location='+itemLieu);
                            
                                  }}*/ 
                          >
                            <Image
                      style={{
                        height: 25,
                        width: 25,
                        marginTop: -4,
                        position: "absolute",
                        left: 0
                      }}
                      source={require("../assets/itineraire.png")}
                      />
                        <Text  ellipsizeMode='tail' numberOfLines={1} style={{textAlign: "right",  width: '85%', marginLeft: '15%' }}>{itemLieu}</Text>
                        </Pressable>
              </View>
            </View>
            <View style={{ marginTop: "5%" }}>
              <Text style={styles.titreFiche}>{itemTitre_spectacle}</Text>
              <Text>
                à {itemHoraire} - Durée {itemDuree}
              </Text>
              {/* <Text style={[styles.defautTextFiche]}>Salle : {itemTheatre} {itemSalle}</Text>
                  <Text  style={[styles.defautTextFiche]}>{itemAuteur_prenom} {itemNom}</Text>
                  <Text>{itemDates}</Text> */}
            </View>

            <View
              style={{
                marginTop: "5%",
                flexDirection: "row",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <View style={styles.labelCard}>
                <Text style={styles.smallText}>{itemCategorie}</Text>
              </View>
              <View style={styles.labelCard}>
                <Text style={styles.smallText}>{itemStyle}</Text>
              </View>

              {itemDeja_joue === "Non" && (
                <View style={styles.labelCard}>
                  <Text style={styles.smallText}> Nouveau au festival</Text>
                </View>
              )}
              {itemClim === "Oui" && (
                <View style={styles.labelCard}>
                  <Text style={styles.smallText}> Climatisation</Text>
                </View>
              )}
              {itemAcces_handicape === "Oui" && (
                <View style={styles.labelCard}>
                  <Text style={styles.smallText}> Accès handicapé</Text>
                </View>
              )}

              {itemPlein_air === "Oui" && (
                <View style={styles.labelCard}>
                  <Text style={styles.smallText}>Plein air</Text>
                </View>
              )}

              {itemNon_francophones === "Oui" && (
                <View style={styles.labelCard}>
                  <Text style={styles.smallText}>Non francophone</Text>
                </View>
              )}

              {/* <Button onPress={shareData} title="Envoyer à un ami" /> */}
            </View>

            <View
              style={[
                styles.blocGris,
                styles.alignCenter,
                styles.justifyElement,
              ]}
            >
              <View
                style={{
                  width: "25%",
                  height: 70,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.smallTextNoir, styles.ParagraphBold]}>
                  Abonné
                </Text>
                <Text style={[styles.titreFiche, styles.alignCenter]}>
                  {itemTarif_adh} €
                </Text>
              </View>
              <View style={styles.SeparateurVertical}></View>
              <View
                style={{
                  width: "25%",
                  height: 70,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.smallTextNoir, styles.ParagraphBold]}>
                  Plein tarif
                </Text>
                <Text style={[styles.titreFiche, styles.alignCenter]}>
                  {itemTarif} €
                </Text>
              </View>
              <View style={styles.SeparateurVertical}></View>
              {itemTarif_enfant > 0 && (
                <View
                  style={{
                    width: "25%",
                    height: 70,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[styles.smallTextNoir, styles.ParagraphBold]}>
                    Enfant
                  </Text>
                  <Text style={styles.smallTextNoir}> (- de 12 ans)</Text>
                  <Text style={[styles.titreFiche, styles.alignCenter]}>
                    {itemTarif_enfant} €
                  </Text>
                </View>
              )}
              {itemTarif_enfant > 0 && (
                <View style={styles.SeparateurVertical}></View>
              )}
              <View
                style={{
                  width: "25%",
                  height: 70,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    styles.smallTextNoir,
                    styles.alignCenter,
                    styles.ParagraphBold,
                  ]}
                >
                  Réduit
                </Text>
                <Text style={[styles.smallTextNoir, styles.alignCenter]}>
                  {" "}
                  {itemTarif_reduit_precisions} (chômeur, étudiant, -18)
                </Text>
                <Text style={[styles.titreFiche, styles.alignCenter]}>
                  {itemTarif_adh} €
                </Text>
              </View>
              {/*}
                    <Text>{itemT_Rouge}</Text>
                    <Text>{itemT_bleu}</Text>
                    <Text>{itemT_vert}</Text>
                    <Text>{itemT_jaune}</Text>
                    <Text>{itemT_turquoise}</Text>
                  */}
            </View>

            {/*
                <View style={{flex: 1}}>
                  <Text>{itemBande_annonce}</Text>
    
                  
     <WebView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center',marginBottom: 200 }}
    source={{ uri: itemBande_annonce }}
    hardwareAccelerated={true}
  //  javaScriptEnabled={true}
   // domStorageEnabled={true}
   // startInLoadingState={true}
   // scalesPageToFit={true}

    allowsFullscreenVideo
  allowsInlineMediaPlayback
  mediaPlaybackRequiresUserAction

   // renderLoading={(e) => { return ( <Loader />  );  }}

   // injectedJavaScript={jsCode}
    />
</View> */}

            <View style={styles.Separateur}></View>

            <Text style={styles.TextSousTitre}>
              Moyens de paiement acceptés
            </Text>

            {itemCb === "Oui" && (
              <Image
                style={{
                  resizeMode: "cover",
                  height: 35,
                  width: 35,
                  alignItems: "flex-start",
                }}
                source={require("../assets/money.png")}
              />
            )}

            {itemEspeces === "Oui" && (
              <Image
                style={{
                  resizeMode: "cover",
                  height: 35,
                  width: 35,
                  alignItems: "flex-start",
                }}
                source={require("../assets/credit-card.png")}
              />
            )}

            <View style={styles.Separateur}></View>

            <Text style={styles.TextSousTitre}>Dates</Text>
            <View style={{ width: "80%" }}>
              <Text>{itemDates_representations}</Text>
            </View>

            <View style={styles.Separateur}></View>

            <Text style={styles.TextSousTitre}>Lieu</Text>
            <Pressable
              onPress={() =>
                Linking.openURL(`geo:0,0?q=${item.lieu} ${itemVille}`)
              }
            >
              <Text style={styles.ParagraphBold}>{itemLieu}</Text>
              <Text>{itemAdresse}</Text>
              <Text>
                {itemCp} {itemVille}{" "}
              </Text>
            </Pressable>

            <View style={styles.Separateur}></View>

            <Text style={styles.TextSousTitre}>Infos & reservations</Text>
            <View style={[styles.labelCard, styles.labelGris]}>
              <Text
                style={styles.TextPhone}
                onPress={() => {
                  let composephoneNumber = "";

                  if (Platform.OS === "android") {
                    composephoneNumber = "tel:" + itemTel_reservation;
                  } else {
                    composephoneNumber = "telprompt:" + itemTel_reservation;
                  }

                  Linking.openURL(composephoneNumber);
                }}
              >
                {itemTel_reservation}
              </Text>
            </View>

            <View style={styles.Separateur}></View>

            <Text style={styles.TextSousTitre}>Résumé du spectacle</Text>

            {itemBande_annonce !== "" && (
              <Pressable
                onPress={() => {
                  Linking.openURL(itemBande_annonce);
                }}
              >
                <Text style={styles.ParagraphBold}>Voir la bande annonce</Text>
                <View style={styles.Separateur}></View>
              </Pressable>
            )}

            <Text style={{ textAlign: "left" }}>{itemDescription}</Text>

            <View style={styles.Separateur}></View>

            <Text style={styles.TextSousTitre}>Auteur</Text>
            <Text style={{ textAlign: "left" }}>
              {itemAuteur_prenom} {itemNom}
            </Text>

            <View style={styles.Separateur}></View>

            <Text style={styles.TextSousTitre}>Compagnie</Text>
            <Text style={{ textAlign: "left" }}>{itemCompagnie}</Text>

            <View style={{ display: "none" }}>
              <Text>{itemPays}</Text>

              <Text>{itemStructure}</Text>
              <Text>{itemCharg_diff}</Text>
              <Text>{itemCharg_diff_addresse}</Text>

              <Text>{itemCourriel}</Text>
              <Text>{itemTelephone}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={{ justifyContent: "flex-end", flex: 3, bottom: 10, padding: 15 }}>
          {state.isAuthenticated && (
            <TouchableOpacity
            style={[styles.labelCard, styles.btnBig, styles.labelAchat]}
              onPress={() => addCart(item)}
            >
              <Text style={styles.textBigButton}> Acheter sur Ticket'Off</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(ProgrammeCard);

/*
  
  "id":"28895",
  "acces_handicape":"Oui",
  "titre_spectacle":"Le TOMA 2021 sur les ondes !",
  "auteur_prenom":" ",
  "nom":" ",
  "ticket_off":"Non",
  "horaire":"00h00",
  "image":"https:\/\/www.festivaloffavignon.com\/resources\/off\/visuels\/2021\/spectacle\/web2\/spectacle_28895.jpg",
  "duree":"24h00",
  "type_public":"Tout public",
  "categorie":"événement",
  "lieu":"CHAPELLE DU VERBE INCARNÉ",
  "description":"Le TOMA 2021 aura de multiples visages. Notre #eTOMA créera le lien avec vous où que vous soyez, avec Radio TOMA (depuis 2018) et TOMA TV (depuis 2020). Suivez notre page Facebook Chapelle du Verbe Incarné et www.verbeincarne.fr pour assister aux lives de Radio TOMA et TOMA TV. - Nous multiplierons les programmations en direct et les rediffusions autour de nos évènements (rencontres, débats, échanges avec les artistes�) - - Radio TOMA - Une quotidienne, en direct du théâtre. Des plateaux animés par Savannah Macé et Benoit Artaud, les chroniques de Greg Germain, Marie-Cécile Drécourt, des podcasts... Toute notre programmation, de l'info, nos coups de cœur... - - TOMA TV - Une programmation autour des captations de spectacles accueillis précédemment, en partenariat avec la Sorbonne Nouvelle. - - MARDI, C'EST EN DIRECT! (20 et 27\/7) - Une salle virtuelle pour vous permettre d'assister aux spectacles depuis votre canapé. - - De nombreuses surprises vous attendent, RESTEZ CONNECTES!",
  "style":"Web TV",
  "salle":"Salle Edouard Glissant",
  "theatre":"",
  "deja_joue":"Non",
  "non_francophones":"Non",
  "plein_air":"Non",
  "clim":"Oui",
  "especes":"Non",
  "cheques":"Non",
  "cb":"Non",
  "tel_reservation":"+33 (0)4 90 14 07 49",
  "compagnie":"Théâtre de la Chapelle du Verbe Incarné",
  "adresse":"21G, rue des lices (en face du n°60)",
  "cp":"84000",
  "ville":"Avignon",
  "pays":"France",
  "site_web":"www.verbeincarne.fr",
  "bande_annonce":"",
  "tarif_reduit_precisions":"",
  "age":"",
  "dates_representations":"du 9 au 28 juillet - 24h\/24",
  "tarif":"0",
  "tarif_adh":"0",
  "tarif_enfant":"0",
  "url":"https:\/\/www.festivaloffavignon.com\/programme\/2021\/le-toma-2021-sur-les-ondes-s28895\/",
  "url_fav":"https:\/\/www.festivaloffavignon.com\/programme\/2021\/le-toma-2021-sur-les-ondes-af28895",
  "url_rmfav":"https:\/\/www.festivaloffavignon.com\/programme\/2021\/le-toma-2021-sur-les-ondes-rf28895",
  "titre":"",
  "dates":"09\/07\/2021-00h00|10\/07\/2021-00h00|11\/07\/2021-00h00|13\/07\/2021-00h00|14\/07\/2021-00h00|16\/07\/2021-00h00|17\/07\/2021-00h00|18\/07\/2021-00h00|20\/07\/2021-00h00|21\/07\/2021-00h00|23\/07\/2021-00h00|24\/07\/2021-00h00|26\/07\/2021-00h00|27\/07\/2021-00h00|28\/07\/2021-00h00|19\/07\/2021-00h00|25\/07\/2021-00h00|12\/07\/2021-00h00|15\/07\/2021-00h00|22\/07\/2021-00h00",
  "t_Rouge":"0",
  "t_jaune":"0",
  "t_bleu":"0",
  "t_vert":"0",
  "t_turquoise":"0",
  "charg_diff":"",
  "telephone":"000000000",
  "courriel":"toma@verbeincarne.fr",
  "structure":"ADOC",
  "charg_diff_addresse":""
  
  */
