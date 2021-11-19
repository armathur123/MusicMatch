import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Textfield from '../components/textfield';
import NextButton from '../components/nextbutton';
import axios from 'axios';

const Playlistinput = ({setUsername, setSonglist, setChosenPlaylist, playlistData, chosenPlaylist, songlist, innerText, token, navigation, navPage}) => {

    const getSongs = (token, playlistID, setSongList) => axios(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then (songsRaw => {
        setSongList(songsRaw?.data?.items);
    })
    .catch(err => {
        console.log("getsongs error");
        console.log(err);
    });

    const playlistPressHandler = (playlistData, setPlaylist, setSonglist) => {
        setPlaylist(playlistData.name + " Number of Tracks:" + playlistData?.tracks?.total);
        getSongs(token, playlistData.id, setSonglist);
    }
    
    return ( 
        <View style = {styles.inputContainer}>
          <Textfield setUser = {setUsername}></Textfield>
          {(playlistData.data?.items[0] === undefined) ? <Text style={styles.textfield}>User not found!</Text> : 
          <View>
            <Text style={styles.textfield}>User: {playlistData.data?.items[0]?.owner?.display_name}</Text>
            <FlatList style={styles.flatlistContainer}
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
    inputContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0b0b0b',
      width: "100%",
      height: "100%"
    },
    flatlistContainer: {
      borderRadius: 5,
      padding: 8,
      maxHeight: 450,
      width: 270,
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
    container: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
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

export default Playlistinput;