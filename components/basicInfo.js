import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';



const BasicInfo = ({displayName, userpic, chosenPlaylistName}) => {
    return (
        <View style={styles.container}>
            <Image
                style={{width: 70, height: 70, borderRadius: 45, position: 'absolute', top: -23}}
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
      backgroundColor: "rgb(218,165,32)",
      paddingBottom: 10,
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
    color: "black",
    fontSize: 20,
  },
  playlistName: {
    marginTop:12,
    color: "black",
    fontSize: 12
  }
});

export default BasicInfo;