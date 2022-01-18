import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';



const BasicInfo = ({displayName, userpic, chosenPlaylistName}) => {
    return (
        <View style={styles.container}>
            <Image
                style={{width: 70, height: 70, borderRadius: 40, position: 'absolute', top: -23}}
                source = {{uri: userpic}}
            />
            <View style={styles.row}>
                <Text style = {styles.displayName}>{displayName}</Text>
                <Text style = {styles.playlistName}>{chosenPlaylistName}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      display:"flex",
      flexDirection: "column",
      alignItems:"center",
      justifyContent: "center",
      borderRadius: 10,
      paddingBottom: 10,
      backgroundColor: "black",
      borderWidth:1,
      borderColor:'black',
      shadowColor: "black",
      shadowOffset: {
          width:-3,
          height: 3
      }, 
      shadowOpacity: 1,
      shadowRadius: 8
  },
  row: {
    display:"flex",
    flexDirection: "column",
    alignItems:"center",
    margin: 10,
    padding: 20,
    borderRadius: 10
  },
  displayName: {
    marginTop:30,
    color: "white",
    fontSize: 20,
  },
  playlistName: {
    marginTop:12,
    color: "white",
    fontSize: 12
  }
});

export default BasicInfo;