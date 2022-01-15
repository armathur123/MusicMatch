import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import CameraComp from '../components/camera';
import BasicInfo from '../components/basicInfo';


const ResultPage = ({userpic1, userpic2, playlistData1, playlistData2, chosenPlaylistName1, chosenPlaylistName2,songlist1, songlist2}) => {

    let displayName1 = playlistData1.data?.items[0]?.owner?.display_name;
    let displayName2 = playlistData2.data?.items[0]?.owner?.display_name;
    let songCount = 0;
    let commonSongLocal = []

    const commonSongCatcher = () => { //find common songs
        for (const song1 of songlist1) {
            for (const song2 of songlist2) {
                if (song1?.track?.id == song2?.track?.id){
                    songCount += 1
                    commonSongLocal.push(song1);
                }
            }
        }
    }
    commonSongCatcher();

    return (
        <View style = {styles.Container}>
            <View style={styles.basicInfoContainer}>
                <BasicInfo displayName={displayName1} userpic={userpic1} chosenPlaylistName={chosenPlaylistName1}/>
                <BasicInfo displayName={displayName2} userpic={userpic2} chosenPlaylistName={chosenPlaylistName2}/>
            </View>        
            <Text style = {styles.commonSongCount}>{songCount}</Text>
            <View>
                <FlatList style={styles.flatlistContainer}
                keyExtractor={(item) => item.id}
                data={commonSongLocal}
                renderItem={({item}) => (
                    <TouchableOpacity style = {styles.playlistItem}>
                        <Text style={styles.textfieldItem}>{item?.track?.name}</Text>
                        <Text style={styles.textfieldItem}>{item?.track?.artists[0]?.name}</Text>
                    </TouchableOpacity>
                )}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    Container: {
      display: "flex",
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'space-around',
      width: "100%",
      height: "100%",
      backgroundColor: '#121212',
    },
    basicInfoContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: "100%"
    },
    flatlistContainer: {
      borderRadius: 5,
      padding: 8,
      maxHeight: 300,
      width: 270,
    },
    playlistItem: {
      display: "flex",
      flexDirection: "row",
      padding: 10,
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: "#777",
      borderRadius: 5,
      backgroundColor: "#6aa84f",
      marginTop: 10
    },
    textfield:{
        fontFamily: 'System',
        textAlign: "center"
    },
    commonSongCount:{
        fontFamily: 'System',
        textAlign: "center",
        borderRadius: 10,
        borderColor: "white"
    },
    startCamera:{
        backgroundColor: "green",
        borderWidth: 1,
        color: "white",
        padding: 8,
        borderRadius: 10,
    }
  });
 
export default ResultPage;