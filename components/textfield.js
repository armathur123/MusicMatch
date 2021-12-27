import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

const Textfield = ({setUser}) => {    
    
    return (
        <View style={styles.container}>
            <TextInput 
            style={styles.input}
            placeholder='Enter Spotify Username'
            placeholderTextColor="white"
            onChangeText={(val) => setUser(val)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    input:{
      borderWidth: 1,
      borderColor: "white",
      borderRadius: 5,
      padding: 8,
      margin: 12,
      width: 307,
      color: "white",
      fontFamily: 'System',
    },
    text: {
        color:"white",
        fontFamily: 'System',
        fontSize: 30,
        textAlign: "center"
    }
  });
 
export default Textfield;