

import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Modal, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as Permissions from "expo-permissions";
import * as Location from 'expo-location';

import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from 'expo-image-manipulator';


export default function PhotoExpo() {
  const camRef = useRef(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [hasPermission, setHasPermission] = useState(null)
  const [cpaturedPic, setCpaturedPic] = useState(null)
  const [open, setOpen] = useState(null)

  const takePicture = async () => {
    // console.log("take picture")
    if (camRef) {
      const data = await camRef.current.takePictureAsync()
      // console.log(data)
      setCpaturedPic(data.uri)
      setOpen(true)
    }
  }

  
  const savePicture = async () => {
    // console.log("save picture")
    const response = await ImageManipulator.manipulateAsync(cpaturedPic, [], { base64: true });
    console.log('base64res' + JSON.stringify(response));

    const asset = await MediaLibrary.createAssetAsync(cpaturedPic)
      .then(() => {
        Alert.alert("Success", "照片存檔成功")
        setOpen(false)
      }).catch((e) => {
        console.log("error: ", e)
      });

  }

  
  // async function takePicture() {
  //   if (camRef) {
  //     const data = await camRef.current.takePictureAsync()
  //     console.log(data)
  //   }
  // }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted")
    })();

  /*  (async () => {
      const { status } = await  MediaLibrary.requestPermissionsAsync() ();
      setHasPermission(status === "granted")
    })();*/

    (async () => {
      // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      const { status } = await Location.requestForegroundPermissionsAsync();
      // console.log("status= ", status)
      setHasPermission(status === "granted")

    })();

   

  }, [])

  if (hasPermission === null) {
    return <View />
  } else if (hasPermission === false) {
    return <Text>Verifier vos permissions Photos !!!</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <Camera
        style={{ flex: 1, }}
        type={type}
        ref={camRef}
      >
        <View style={{ flex: 1, backgroundColor: "transparent", flexDirection: "row" }}>
          <TouchableOpacity style={{
            position: "absolute",
            bottom: 20,
            left: 20,
          }}
            onPress={() => {
              setType(type === Camera.Constants.Type.back)
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            }}
          >
           
            {/* <Text style={{ fontSize: 20, marginBottom: 15, color: "#fff" }}> 前後鏡頭交換</Text> */}
            <Ionicons name="ios-camera-reverse-sharp" size={24} color="white" />
          </TouchableOpacity>

        </View>
      </Camera>
      <TouchableOpacity
        style={styles.button}
        onPress={takePicture}
      >
        <FontAwesome
          name="camera"
          size={25}
          color="#fff"
        />
      </TouchableOpacity>

     
      {cpaturedPic &&
        <Modal
          animationType="slide"
          transparent={false}
          visible={open}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 20 }}>
            <View style={{ margin: 10, flexDirection: "row" }}>
           
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => setOpen(false)}
              >
                <FontAwesome
                  name="window-close"
                  size={50}
                  color="red"
                />
              </TouchableOpacity>

              
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={savePicture}
              >
                <FontAwesome
                  name="upload"
                  size={50}
                  color="#121212"
                />
              </TouchableOpacity>
            </View>
           
            <Image
              style={{
                width: "100%",
                height: 450,
                borderRadius: 20,
              }}
              source={{ uri: cpaturedPic }}
            />
          </View>
        </Modal>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#121212",
    margin: 20,
    borderRadius: 10,
    height: 50,
  },
});
