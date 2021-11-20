import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import { Camera } from "expo-camera";

export default function CameraComp({toggleStart, setImageURI}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);

    const takePicture = async () => {
        const options = { quality: 0.5, base64: true, skipProcessing: true };
        const data = await cameraRef.current.takePictureAsync(options);
        setImageURI(data);
        console.log("hi");
    };

    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
        <Camera style={styles.camera} type={type}
        ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                    }}>
                    <Text style={styles.text}> Flip </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.captureButton} onPress={() => {
                    takePicture();
                    toggleStart(false);
                }}/>
            </View>
        </Camera>
    )
}

const styles = StyleSheet.create({
    camera: {
        width: "100%",
        height: "100%"
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 25,
      justifyContent: 'flex-start'
    },
    button: {
      flex: .2,
      alignSelf: 'flex-end',
      alignItems: 'flex-start',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    captureButton: {
        position: 'absolute',
        width:70,
        height: 70,
        bottom: 0,
        left: 150,
        borderRadius: 50,
        backgroundColor: '#fff'
    }
});