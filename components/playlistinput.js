import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import {trackPromise} from 'react-promise-tracker';
import React, {useState, useContext, useEffect} from 'react';
import NextButton from '../components/nextbutton';
import {Dimensions} from 'react-native';
import {usePromiseTracker} from "react-promise-tracker";
import { tokenFetch, playlistFetch, userFetch} from '../apiCalls';

const Playlistinput = ({ navigation, navPage}) => {

  const [token, setToken] = useState('');
  const [user, setUser] = useState({displayName: '', username:'', userImage: null});
  const [playlistData, setPlaylistData] = useState([])
  const [message, setMessage] = useState('');
  const {promiseInProgress} = usePromiseTracker();
  const [selectedItem, setSelectedItem] = useState('')
  const [songData, setSongData] = useState([]);

  const getSongs = (token, playlistID, setSongData, currentCount, total, offset,songlistLocal, playlistname) => {
    const songRequest = axios(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?offset=${offset}`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    });
    //track promise helps run loading animation as long as function continues
    trackPromise(songRequest
      .then (songsRaw => {
        total = songsRaw?.data?.total; //set total number of songs (api iterations)
        let count = songsRaw?.data?.items.length;
        currentCount += count; //set current songcount
        // songlistLocal = songlistLocal.concat(songsRaw?.data?.items);
        songlistLocal = [...songlistLocal, ...songsRaw.data.items.map((item) => item.track)];
        // setSongData(prev => [...prev, ...songsRaw.data.items])
        if (currentCount < total){ //recursively calls until entire playlist has been gotten
          getSongs(token, playlistID, setSongData, currentCount, total, currentCount, songlistLocal, playlistname)
        }
        else { //all songs have been caught, sets songlist
          const songData = {playlistName: playlistname, songlist:songlistLocal};
          setSongData(songData);
          return;
        }
      }));
  }

    return ( 
        <View style = {styles.Container}>
          <View style = {styles.inputContainer}>
            {(!playlistData.length == 0) && <View style = {styles.profInfoContainer}>
              {/* userprofile image */}
              {user.userImage ? <Image
                style={{width: 60, height: 60, borderRadius: 30, marginRight: 20}}
                source = {{uri: user.userImage}}
              />:
              <Ionicons style={styles.searchIcon} name="ios-search" size={15} color="white"/>}
              {(!playlistData.length == 0) ? <Text style={styles.usernameTextField}>{user.displayName}</Text> : <Text style={styles.usernameTextField}>{message}</Text>}
            </View>}
            <View style={styles.searchSection}>
              <Ionicons style={styles.searchIcon} name="ios-search" size={15} color="white"/>
              <TextInput 
              style={styles.input}
              placeholder='Enter Spotify Username'
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={(val) => {
                  tokenFetch().then((tokenData) => {
                    setToken(tokenData.data.access_token);
                    const username = '12176356166'; //temp hardcode for testing
                    playlistFetch(username,tokenData).then((playlistRaw) => {
                      setPlaylistData(playlistRaw?.data?.items);
                    });
                    userFetch(username, tokenData).then((profileRaw) => {
                      setUser(prev => {
                        prev.displayName = profileRaw.data.display_name;
                        prev.username = username;
                        prev.userImage = profileRaw?.data.images[0]?.url;
                        return prev; 
                      });
                    });
                  });
                  setSongData([]);

                }}/>
            </View> 
          </View>
          {(!playlistData.length == 0) && 
            <View style={styles.flatlistContainer}>
              <FlatList style={styles.flatlist}
                keyExtractor={(item) => item.id}
                data={playlistData}
                renderItem={({item}) => (
                  <TouchableOpacity 
                    onPress={() => {
                      setSongData([]);
                      setSelectedItem(item.id);
                      getSongs(token, item.id, setSongData, 0, 0, 0,[], item.name); //current count, total, and offset start at 0
                    }}  
                    style = {
                      (item.id === selectedItem) ? 
                      styles.playlistItemSelected : styles.playlistItem
                      }>
                    <Image
                      style={{width: 50, height: 50}}
                      source = {{uri: item.images[0]?.url}}
                    />
                    <View style={styles.itemtextContainer}>
                      <Text style={styles.textfield}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <NextButton navigation={navigation} navPage={navPage} promiseInProgress={promiseInProgress} songData={songData} user={user}></NextButton>
            </View>
          }
        </View>
     );
}

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#121212',
    width: "100%",
    height: "100%"
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#171717',
    height:"22%",
    width: "100%",
    borderRadius: 10,
    padding: 15,
  },
  profInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 50,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    height: "30%",
    marginTop: 20
  },
  searchIcon: {
    padding: 10,
  },
  flatlistContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  flatlist: {
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#121212',
    flex: 1,
  },
  playlistItem: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    marginTop: 10
  },
  playlistItemSelected: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    marginTop: 10,
    backgroundColor: "black",
    borderRadius: 10
  },
  input:{
    flex: 1,
    color: "white",
    fontFamily: 'System',
    paddingTop: 5,
    paddingBottom: 5,
  },
  itemtextContainer: {
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15
  },
  usernameTextField: {
    fontFamily: 'AvenirNext-Bold',
    fontSize: 30,
    color: "white",
  },
  textfield:{
    color:"white",
    fontFamily: 'System',
    letterSpacing: .6,
    fontSize: 14,
  },
});

export default Playlistinput