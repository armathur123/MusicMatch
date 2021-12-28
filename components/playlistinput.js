import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import NextButton from '../components/nextbutton';
import axios from 'axios';
import {Dimensions} from 'react-native';


const Playlistinput = ({username, setUsername, setSonglist, setChosenPlaylist, playlistData, chosenPlaylist, songlist, innerText, token, navigation, navPage}) => {

  const [message, setMessage] = useState('');
  let songlistLocal = [];


  const getSongs = (token, playlistID, setSongList, currentCount, total, offset) => axios(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?offset=${offset}`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
  })
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
    }
  })
  .catch(err => {
    console.log("getsongs error");
    console.log(err);
  });

    const playlistPressHandler = (playlistData, setPlaylist, setSonglist) => {
      setPlaylist(playlistData.name + " Number of Tracks:" + playlistData?.tracks?.total);
      getSongs(token, playlistData.id, setSonglist, 0, 0, 0); //current count, total, and offset start at 0
    }

    return ( 
        <View style = {styles.Container}>
          <View style = {styles.inputContainer}>
            {!(playlistData.data?.items[0] === undefined) ? <Text style={styles.textfield}>{playlistData.data?.items[0]?.owner?.display_name}</Text> : <Text style={styles.textfield}>{message}</Text>}
            <View style={styles.searchSection}>
              <Ionicons style={styles.searchIcon} name="ios-search" size={20} color="white"/>
              <TextInput 
              style={styles.input}
              placeholder='Enter Spotify Username'
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onChangeText={(val) => setUsername(val.trim())}/>
            </View> 
          </View>
          {!(playlistData.data?.items[0] === undefined) && 
          <View style={styles.flatlistContainer}>
            <FlatList style={styles.flatlist}
              keyExtractor={(item) => item.id}
              data={playlistData.data?.items}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => playlistPressHandler(item, setChosenPlaylist, setSonglist)}  style = {styles.playlistItem}>
                  <Image
                    style={{width: 40, height: 40}}
                    source = {{uri: item.images[0]?.url}}
                  />
                  <View style={styles.itemtextContainer}>
                    <Text style={styles.textfieldItem}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <View>
                <Text style={styles.textfield}>{chosenPlaylist}</Text>
            </View>
            {!(songlist === undefined) && <NextButton innerText = {innerText} navigation = {navigation} navPage = {navPage}></NextButton>}
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
      flex: 1,
      backgroundColor: '#121212',
      width: "100%",
      height: "100%"
    },
    searchSection: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#171717',
      borderWidth: 1,
      borderColor: "white",
      borderRadius: 5,
  },
  searchIcon: {
      padding: 10,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#171717',
    width: "100%",
    borderRadius: "10px",
    padding: "20px"
  },
  flatlistContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  flatlist: {
    borderRadius: 5,
    padding: 8,
    maxHeight: 400,
    width: "100%",
    backgroundColor: '#121212',
    flex: 1,
  },
  playlistItem: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 5,
    backgroundColor: "#6aa84f",
    marginTop: 10
  },
  input:{
    borderWidth: 1,
    borderColor: "#171717",
    width: 307,
    color: "white",
    fontFamily: 'System',
  },
  itemtextContainer: {
      display:"flex",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor:"white",
  },
  textfield:{
      color:"white",
      fontFamily: 'System',
      textAlign: "center"
  },
  textfieldItem:{
      color:"white",
      fontFamily: 'System',
      fontSize: 10,
      textAlign: "center"
  }
});

export default Playlistinput