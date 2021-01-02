/* eslint-disable react/self-closing-comp */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';
import { RNCamera } from 'react-native-camera';


const PendingView = () => {
  return (
    <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
      <Text style={{color: "red", fontSize: 30}}>Loading .....</Text>
    </View>
  )
}

const App = () => {

  const [image, setImage] = useState(null)

  const takePicture = async (camera) => {
    try {
      const options = {quality: 0.9, base64: false};
      const data = await camera.takePictureAsync(options)
      setImage(data.uri)
    } catch (error){
      console.warn(error)
    }
  }

  return (
    <View style={styles.container}>
      {image ? 
      (
        <View style={styles.preview}>
        <Text style={styles.context}>Here is your image</Text>
        <Image style={styles.clicked} source={{uri: image, width: "100%", height: "80%"}} />
        <Button title="Click new photo" onPress={() => setImage(null)}></Button>
        </View>
      ) : 
      (
        <RNCamera 
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: "permission to use camera",
            message: "longer text to use camera",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }}
          androidRecordAudioPermissionOptions={{
            title: "permission to use audio",
            message: "longer text to use camera",
            buttonPositive: "OK",
            buttonNegative: "Cancel"
          }}
        >{({camera, status}) => {
          if(status !== 'READY') return <PendingView />
          return (
            <View style={{flex: 0, flexDirection: "row", justifyContent: "center"}}>
              <TouchableOpacity style={styles.capture} onPress={() => takePicture(camera)}>
                <Text>Snap</Text>
              </TouchableOpacity>
            </View>
          )
        }}</RNCamera>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#0a79df"
  },
  preview: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1
  },
  capture: {
    flex: 0,
    backgroundColor: "orange",
    padding: 10,
    alignSelf: "center",
  },
  context: {
    backgroundColor: "#3498db",
    color: "#ffffff",
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 25
  },
  clicked: {
    width: 300,
    height: 300,
    borderRadius: 150
  }
})

export default App;