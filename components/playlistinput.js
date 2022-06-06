import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, {useState, useContext, useEffect} from 'react';
import NextButton from '../components/nextbutton';
import {Dimensions} from 'react-native';
import {usePromiseTracker} from "react-promise-tracker";
import { PlaylistDataContext } from '../contexts/PlaylistDataContext';
import { getAllSongs } from '../apiCalls';
import { tokenFetch, playlistFetch, userFetch } from '../apiCalls';

const Playlistinput = ({setSonglist, setChosenPlaylist, chosenPlaylist, songlist, innerText, token, navigation, navPage}) => {


  const [username, setUsername] = useState('');
  const [playlistData, setPlaylistData] = useState([])
  const [userImageUri, setuserImageUri] = useState('')
  const {resultsData, setResultsData} = useContext(PlaylistDataContext);

  const [message, setMessage] = useState('');
  const {promiseInProgress} = usePromiseTracker();
  const [selectedItem, setSelectedItem] = useState('')

    return ( 
        <View style = {styles.Container}>
          <View style = {styles.inputContainer}>
            {(!playlistData.length == 0) && <View style = {styles.profInfoContainer}>
              {/* userprofile image */}
              <Image
                style={{width: 60, height: 60, borderRadius: 30, marginRight: 20}}
                source = {{uri: userImageUri}}
              />
              {(!playlistData.length == 0) ? <Text style={styles.usernameTextField}>{playlistData[0]?.owner?.display_name}</Text> : <Text style={styles.usernameTextField}>{message}</Text>}
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
                    const username = val.trim()
                    playlistFetch(username,tokenData).then((playlistRaw) => {
                      console.log('playlistRaw')
                      console.log(playlistRaw?.data?.items);
                      setPlaylistData(playlistRaw?.data?.items);
                    })
                    userFetch(username, tokenData).then((profileRaw) => {
                      setuserImageUri(profileRaw.data.images[0].url)
                    })
                  })
                  setUsername(username);
                  setSonglist(undefined);
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
                      setSonglist(undefined);
                      setChosenPlaylist(item.name);
                      setSelectedItem(item.id);
                      getAllSongs(token, item.id, setSonglist); //current count, total, and offset start at 0
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
              <NextButton innerText={innerText} navigation={navigation} navPage={navPage} songlist={songlist} promiseInProgress={promiseInProgress}></NextButton>
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