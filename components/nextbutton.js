import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';


const NextButton = ({innerText}) => {
    return (
        <View>
            <TouchableOpacity style = {styles.button}>
              <Text>{innerText}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6D1404",
    color: "white",
    padding: 7,
    borderRadius: 5,
  },
});

export default NextButton;