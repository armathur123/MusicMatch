import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Textfield from '../components/textfield';


const Playlistinput = ({setUsername, setSonglist, setChosenPlaylist, playlistData, chosenPlaylist, songlist}) => {

    const playlistPressHandler = (playlistData, setPlaylist, setSonglist) => {
        setPlaylist(playlistData.name + playlistData?.tracks?.total);
        getSongs(token, playlistData.id, setSonglist);
    }
    
    return ( 
        <View style = {styles.inputContainer}>
          <Textfield setUser = {setUsername}></Textfield>
          {(playlistData.data?.items[0] === undefined) ? <Text>User not found!</Text> : 
          <View>
            <Text>User: {playlistData.data?.items[0]?.owner?.display_name}</Text>
            <FlatList style={styles.flatlistContainer}
              keyExtractor={(item) => item.id}
              data={playlistData.data?.items}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => playlistPressHandler(item, setChosenPlaylist, setSonglist)}  style = {styles.playlistItem}>
                  <Image
                    style={{width: 40, height: 40}}
                    source = {{uri: item.images[0]?.url}}
                  />
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Text>{chosenPlaylist}</Text>
          </View>}
        </View>
     );
}

const styles = StyleSheet.create({
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
      height: 300,
    },
    playlistItem: {
      display: "flex",
      flexDirection: "row",
      padding: 10,
    },
    container: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    input:{
        borderWidth: 1,
        borderColor: "#777",
        borderRadius: 5,
        padding: 8,
        margin: 10,
        width: 275,
    }
  });

export default Playlistinput;