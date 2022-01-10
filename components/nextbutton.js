import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';


const NextButton = ({navigation, navPage}) => {
    return (
        <View style={styles.container}>
            <CircularProgress
              radius={90}
              value={80}
              />
            <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate(navPage)}>
              <Text style={styles.text}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 25,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#6D1404",
    padding: 7,
    borderRadius: 5,
    width: 100
  },
  text: {
    color: "white"
  }
});

export default NextButton;