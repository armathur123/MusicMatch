import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import { Credentials } from './Credentials';
import {decode as atob, encode as btoa} from 'base-64'
import Playlistinput from './components/playlistinput';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResultPage from './components/resultpage';


export default function App() {

  //set atob and btoa as global variables on React Native
  if (!global.btoa) {
      global.btoa = btoa;
  }
  if (!global.atob) {
      global.atob = atob;
  }

  const customTextProps = { 
    style: { 
      fontFamily: "San Francisco"
    }
  }

  const spotify = Credentials(); //grabs preset credentials: clientID and secret from my personal profile
  const [token, setToken] = useState('');
  const [playlistData1, setPlaylistData1] = useState('');
  const [playlistData2, setPlaylistData2] = useState('');
  const [username1, setUsername1] = useState('');  
  const [username2, setUsername2] = useState('');  
  const [chosenPlaylist1, setChosenPlaylist1] = useState();
  const [chosenPlaylist2, setChosenPlaylist2] = useState();

  const [songlist1, setSonglist1] = useState();
  const [songlist2, setSonglist2] = useState();


  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);
      //example user IDS for testing reference
      // const userID = '12176356166'; my personal spotify
      // const userID = 'wxdd0utbytkuddlgj17cep92f' my roommates
      const usergrab = (userID, setUserPlaylistData) => axios(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (playlistRaw => {      
        setUserPlaylistData(playlistRaw);

      }).catch(err => {
        console.log("setplaylist error");
        console.log(err);
      });
      usergrab(username1, setPlaylistData1);
      usergrab(username2, setPlaylistData2);
      })
      .catch(err => {
        console.log("gettoken error");
        console.log(err);
      });
  },[username1, username2]); //updates everytime username changes

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="firstEntry">
          {props => <Playlistinput {...props} playlistData = {playlistData1} username = {username1} setUsername = {setUsername1} setSonglist = {setSonglist1} setChosenPlaylist = {setChosenPlaylist1} chosenPlaylist = {chosenPlaylist1} songlist = {songlist1} innerText = "Select next user!" token = {token} navPage = "secondEntry"/>}
        </Stack.Screen>
        <Stack.Screen name="secondEntry">
          {props => <Playlistinput {...props} playlistData = {playlistData2} username = {username2} setUsername = {setUsername2} setSonglist = {setSonglist2} setChosenPlaylist = {setChosenPlaylist2} chosenPlaylist = {chosenPlaylist2} songlist = {songlist2} innerText = "Generate results!" token = {token} navPage = "resultPage"/>}
        </Stack.Screen>
        <Stack.Screen name="resultPage">
          {props => <ResultPage {...props} songlist1 = {songlist1} songlist2 = {songlist2}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b0b0b',
  },
  firstentry: {
    backgroundColor:"black"
  },
  rowContainer:{
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flatlistContainer: {
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 5,
    padding: 8,
    width:200,
    height: 300,
  },
});

/* 
old code that im scared to delete even though im using version control lmao
<View style = {styles.inputContainer}>
  <Textfield setUser = {setUsername1}></Textfield>
  {(playlistData1.data?.items[0] === undefined) ? <Text>User not found!</Text> : 
  <View>
    <Text>User: {playlistData1.data?.items[0]?.owner?.display_name}</Text>
    <FlatList style={styles.flatlistContainer}
      keyExtractor={(item) => item.id}
      data={playlistData1.data?.items}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => playlistPressHandler(item, setChosenPlaylist1, setSonglist1)}  style = {styles.playlistItem}>
          <Image
            style={{width: 40, height: 40}}
            source = {{uri: item.images[0]?.url}}
          />
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
    <Text>{chosenPlaylist1}</Text>
  </View>}
</View> */