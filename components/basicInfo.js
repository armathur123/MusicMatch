import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';



const BasicInfo = ({displayName, userpic, chosenPlaylistName}) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Image
                    style={{width: 40, height: 40, borderRadius: 30, marginRight: 7}}
                    source = {{uri: userpic}}
                />
                <Text style = {styles.text}>{displayName}</Text>
            </View>
            <View style={styles.row}>
                <Text style = {styles.text}>{chosenPlaylistName}</Text>
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
      backgroundColor: "black",
      paddingBottom: 10,
  },
  row: {
    display:"flex",
    flexDirection: "row",
    alignItems:"center",
    margin: 10,
    padding: 5,
    borderRadius: 10
  },
  text: {
    color: "white",
    fontSize: 14
  }
});

export default BasicInfo;