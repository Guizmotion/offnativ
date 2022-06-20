import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Image, Text, View, FlatList, RefreshControl } from "react-native";
import axios from "axios";

// import { ShopContext } from "../store/ShopContext";
// import { FavorisContext } from "../store/FavorisContext";
import Loader from "./Loader";
import { _ } from "lodash";

import ProgrammeCard from "./ProgrammeCard";
import ProgrammeHeader from "./ProgrammeHeader";

import { Button, Overlay } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Token from "../hooks/Token";

const baseUrl = "https://appli.ovh/off/app/";
const url_programme = baseUrl + "api2022.php?a=1&limit=";

export default function Programme({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const stateRecherche = useSelector((state) => state.recherche);
  const token = Token();

  console.log(token);

  //const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // const { stateRecherche, dispatchRecherche } =
  //   React.useContext(RechercheContext);
  // const context = React.useContext(ShopContext);

  // initialize data state variable as an empty array

  const [data, setData] = useState([]);
  const [input, setInput] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  //const [visible, setVisible] = useState(true);

  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState("all");
  const [searchText, setSearchText] = useState();

  const [refreshing, setRefreshing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [visible, setVisible] = useState(true);
  const flatListRef = useRef(); 

  useEffect(() => {
    setIsLoading(true);
  
    axios.get(url_programme + stateRecherche.limite ).then(response => {

      let programme_aleatoire =  _.shuffle(response.data);
     

     dispatch({ type: "addData", payload: programme_aleatoire });
     
     setIsLoading(false);
    });

   // shuffleProgramme();
    
    
  }, [stateRecherche]);

 


  const filtrerProgramme = (col,orderby) => {
    let programme = state.programme;
    
    let result = _.orderBy(programme, col, orderby);
    
    dispatch({ type: "addData", payload: result });
    
    // console.log(result);
  };


  const shuffleProgramme = () => {
    let programme = state.programme;
   let progshuffle =  _.shuffle(programme);
    dispatch({ type: "addData", payload: progshuffle});

     console.log(Object.keys(state.programme).length);

  };


//force flat list to go from RechercheModal
if(flatListRef.current != undefined) {
flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
}



  const filteredData = state.programme;

  const getItemLayout = (data, index) => ({
    length: 100,
    offset: 100 * index,
    index,
  });

  const renderData = ({ item, index }) => {
    return <ProgrammeCard item={item} index={index} />;
  };

  const renderData2 = useCallback(
    ({ item }) => <ProgrammeCard item={item} />,
    [state.programme]
  );

  return (
    <View>
      {isLoading && <Loader />}

      <ProgrammeHeader />

      <FlatList
        style={{ paddingTop: 15, marginBottom: 170 }}
        //  ListHeaderComponent={() => { return <ProgrammeHeader />}}

        data={filteredData}
        // extraData={stateRecherche}

        removeClippedSubviews={true}
        // updateCellsBatchingPeriod={5}
        maxToRenderPerBatch={12}
        initialNumToRender={8}
        windowSize={8}
        // getItemLayout={() => getItemLayout() }

        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd < 0) return;
        }}
        keyExtractor={(item, index) => {
          // console.log("index", index)
          return item.id.toString();
        }}
        renderItem={renderData2}
        /* renderItem={({ item }) => {
          // return renderData(item);
          return <ProgrammeCard item={item} />
        }}*/

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() =>
              dispatch({ type: "addData", payload: filteredData })
            }

            ListEmptyComponent={() => {
              if (isLoading) {
                return null;
              }
              return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 600 }}>
                  <Text>Aucun résultat</Text>
                </View>
              );
            }
            }
    
          />
        }
      />

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        animationType={"slide"}
        hardwareAccelerated={true}
        style={{ padding: 0, margin: 0, backgroundColor: "red" }}
      >
        <Image
          style={{
            height: 300,
            width: 300,
            padding: 0,
            margin: 0,
            backgroundColor: "red",
            borderWidth: 0,
          }}
          source={require("../assets/images/modal-ticket-off.jpg")}
        />
      </Overlay>
    </View>
  );
}
