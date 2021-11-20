import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import CameraComp from '../components/camera';

const ResultPage = ({songlist1, songlist2}) => {
    
    let songCount = 0;
    let commonSongLocal = []
    const [startCam, setStartCam] = useState(false);
    const [imageURI, setImageURI] = useState(null);

    const startCamHandler = async() => {
      setStartCam(true);
    }

    const commonSongCatcher = () => { //find common songs
        for (const song1 of songlist1) {
            for (const song2 of songlist2) {
                if (song1?.track?.name == song2?.track?.name){
                    songCount += 1
                    commonSongLocal.push(song1);
                }
            }
        }
    }
    commonSongCatcher();

    return (
        <View styles = {styles.container}>
            {startCam ?
            <CameraComp toggleStart = {setStartCam} setImageURI={setImageURI}></CameraComp> :     
            <View style = {styles.inputContainer}>        
                <Text style = {styles.textfield}>Results</Text>
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
                {(imageURI !== null) &&
                <Image
                    style = {{height:180, width: 150}}
                    source={{uri: imageURI && imageURI.uri}}
                />}
                <View style={{flex:1,flexDirection: 'column', justifyContent: 'center',alignItems: 'center'}}>
                    <View style = {{padding:10}}>
                        <TouchableOpacity style={styles.startCamera} onPress={startCamHandler}><Text style={{color: "white"}}>Take picture</Text></TouchableOpacity>
                    </View>
                </View>
            </View>}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
    },
    inputContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      height: "100%"
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
    container: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
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