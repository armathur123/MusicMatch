import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';


const NextButton = ({navigation, navPage, songlist, promiseInProgress}) => {
    return (
        <View style={styles.container}>
            {promiseInProgress ===true &&
            <ActivityIndicator></ActivityIndicator>}
            {(songlist != undefined && !promiseInProgress) && //songlist has songs and api isnt still loading songs
              <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate(navPage)}>
                <Text style={styles.text}>></Text>
              </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 20,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "black",
    padding: 7,
    borderRadius: 30,
    width: 35,
    marginRight: "10%"
  },
  text: {
    color: "white",
    fontSize: 25
  }
});

export default NextButton;