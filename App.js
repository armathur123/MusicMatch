import React, {useState, useEffect} from 'react';
import { StyleSheet} from 'react-native';
import axios from 'axios';
import { Credentials } from './Credentials';
import {decode as atob, encode as btoa} from 'base-64'
import Playlistinput from './components/playlistinput';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResultPage from './components/resultpage';
import LoginExample from './components/loginExample';
import { PlaylistDataContext } from './contexts/PlaylistDataContext';
import { tokenFetch, playlistFetch, userFetch } from './apiCalls';
import { LinearGradient } from 'react-native-svg';
import { axisLeft } from 'd3';


export default function App() {

  //set atob and btoa as global variables on React Native
  if (!global.btoa) {
      global.btoa = btoa;
  }
  if (!global.atob) {
      global.atob = atob;
  }

  const [resultsData, setResultsData] = useState([]);
  //example user IDS for testing reference
  // const userID = '12176356166'; my personal spotify

  const Stack = createNativeStackNavigator(); //stacknavigator instance

  return (
    <NavigationContainer>
      <PlaylistDataContext.Provider value={{resultsData, setResultsData}}>
        <Stack.Navigator //hide top header bar
          screenOptions={{
            headerShown: false,
            headerStyle:  {backgroundColor:'#32cc8c'}
          }}
        >
          {/* <Stack.Screen name="loginExample">
            {props => <LoginExample {...props} spotify={spotify} navPage = {"loginExample"}> </LoginExample>}
          </Stack.Screen>
          <Stack.Screen name="loginExample2">
            {props => <LoginExample {...props} spotify={spotify}> </LoginExample>}
          </Stack.Screen>  commenting out for now, will come back to this, probably make it an api hook*/}
          {/*first playlist input entry*/}
          <Stack.Screen name="Enter Spotify Username!">
            {props => <Playlistinput {...props} navPage = "secondEntry"/>}
          </Stack.Screen>
          {/*second playlist input entry*/}
          <Stack.Screen name="secondEntry">
            {props => <Playlistinput {...props} navPage = "resultPage"/>}
          </Stack.Screen>
          {/*Results Page*/}
          <Stack.Screen name="resultPage">
            {props => <ResultPage {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </PlaylistDataContext.Provider>
    </NavigationContainer>
  );
}

//css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});