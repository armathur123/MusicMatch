import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

const Textfield = ({setUser}) => {    

    return (
        <View style={styles.container}>
            <Text>Enter Spotify Username</Text>
            <TextInput 
            style={styles.input}
            placeholder='Check your account information for this!'
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
      borderColor: "#777",
      borderRadius: 5,
      padding: 8,
      margin: 10,
      width: 275,
    }
  });
 
export default Textfield;