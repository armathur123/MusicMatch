import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import NextButton from '../components/nextbutton';
import axios from 'axios';
import {Dimensions} from 'react-native';
import {usePromiseTracker} from "react-promise-tracker";
import {trackPromise} from 'react-promise-tracker';


const Playlistinput = ({username, setUsername, setSonglist, setChosenPlaylist, playlistData, chosenPlaylist, songlist, innerText, token, navigation, navPage, profPicUri}) => {

  const [message, setMessage] = useState('');
  const [iconVisibility, setIconVisibility] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState(false);
  let songlistLocal = [];
  const {promiseInProgress} = usePromiseTracker();

  const getSongs = (token, playlistID, setSongList, currentCount, total, offset) => {
    const request = axios(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?offset=${offset}`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    });
    trackPromise(request
      .then (songsRaw => {
        total = songsRaw?.data?.total; //set total number of songs (api iterations)
        let count = songsRaw?.data?.items.length;
        currentCount += count; //set current songcount
        songlistLocal = songlistLocal.concat(songsRaw?.data?.items);
        if (currentCount < total){ //recursively calls until entire playlist has been gotten
          getSongs(token, playlistID, setSongList, currentCount, total, currentCount)
        }
        else { //all songs have been caught, sets songlist
          console.log(songlistLocal);
          setSongList(songlistLocal);
          return request;
        }
      })
      .catch(err => {
        console.log("getsongs error");
        console.log(err);
      }));
  }
    return ( 
        <View style = {styles.Container}>
          <View style = {styles.inputContainer}>
            {!(playlistData.data?.items[0] === undefined) && <View style = {styles.profInfoContainer}>
              {/* userprofile image */}
              <Image
                style={{width: 60, height: 60, borderRadius: 30, marginRight: 20}}
                source = {{uri: profPicUri}}
              />
              {!(playlistData.data?.items[0] === undefined) ? <Text style={styles.usernameTextField}>{playlistData.data?.items[0]?.owner?.display_name}</Text> : <Text style={styles.usernameTextField}>{message}</Text>}
            </View>}
            <View style={styles.searchSection}>
              {iconVisibility && <Ionicons style={styles.searchIcon} name="ios-search" size={15} color="white"/>}
              <TextInput 
              style={styles.input}
              placeholder='Enter Spotify Username'
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={(val) => {
                  setUsername(val.trim());
                  setSonglist(undefined);
                }}/>
            </View> 
          </View>
          {!(playlistData.data?.items[0] === undefined) && 
          <View style={styles.flatlistContainer}>
            <FlatList style={styles.flatlist}
              keyExtractor={(item) => item.id}
              data={playlistData.data?.items}
              renderItem={({item}) => (
                <TouchableOpacity 
                  onPress={() => {
                    setSonglist(undefined);
                    setLoadingStatus(true);
                    // playlistPressHandler(item, setChosenPlaylist, setSonglist); 
                    getSongs(token, item.id, setSonglist, 0, 0, 0); //current count, total, and offset start at 0
                    console.log(loadingStatus);
                  }}  
                  style = {styles.playlistItem}>
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
            <NextButton innerText = {innerText} navigation = {navigation} navPage = {navPage} loadingStatus={loadingStatus} songlist={songlist} promiseInProgress ={promiseInProgress}></NextButton>
          </View>}
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
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
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
  input:{
    flex: 1,
    width: 307,
    color: "white",
    fontFamily: 'System',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
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