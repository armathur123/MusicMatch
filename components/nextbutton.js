import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useContext} from 'react';
import CircularProgress from 'react-native-circular-progress-indicator'; //not currently in use, might come back to this
import Icon from 'react-native-vector-icons/EvilIcons';
import AnimatedLoader from "react-native-animated-loader";
import { PlaylistDataContext } from '../contexts/PlaylistDataContext';


const NextButton = ({navigation, navPage, promiseInProgress, songlist, user}) => {

  const {resultsData, setResultsData} = useContext(PlaylistDataContext);
  
  useEffect(() => {
    console.log(resultsData);
  })

  const nextButtonPress = () => {
    const userObj = {songlist,user};
    setResultsData(prev => {
      const passOn = [...prev, userObj];
      return passOn;
    })
    navigation.navigate(navPage)   
  }
    return (
        <View style={styles.container}>
            {promiseInProgress &&
              <TouchableOpacity>
                <AnimatedLoader
                  visible={true}
                  overlayColor="rgba(0, 0, 0,0.5)"
                  animationType="fade"
                  source={require("./loader-animation.json")} 
                  animationStyle={styles.loader}
                  speed={1}
                />
                {/* https://lottiefiles.com/69922-loader-animation credit to Syed Haider Ali */}
              </TouchableOpacity>}
            {(songlist !== undefined && songlist.length !== 0 && !promiseInProgress) && //songlist has songs and api isnt still loading songs
              <TouchableOpacity 
                style = {styles.button} 
                onPress={nextButtonPress}>
                <Icon name='chevron-right' size={75} color="white" />
              </TouchableOpacity>}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 5,
    bottom: 7,
    paddingBottom: 20,
  },
  loader: {
    position: 'absolute',
    right: -75,
    top: 85,
    padding: 100,
    maxWidth: 200,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    marginRight: "7%",
  },
  activityIndicator: {
    padding: 7,
    width: 35,
    marginRight: "8%"
  },
  text: {
    color: "white",
    fontSize: 25
  }
});

export default NextButton;