import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';


const NextButton = ({innerText, navigation, navPage}) => {
    return (
        <View>
            <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate(navPage)}>
              <Text style={styles.text}>{innerText}</Text>
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
    padding: 7,
    borderRadius: 5,
  },
  text: {
    color: "white"
  }
});

export default NextButton;