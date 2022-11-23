import { Animated, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image, Platform} from 'react-native';
import React, {useState, useEffect, useContext, useMemo, useRef} from 'react';
import BasicInfo from '../components/basicInfo';
import {Dimensions} from 'react-native';
import { shadowColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
let themeColor = 'rgb(218,165,32)';
import { PlaylistDataContext } from '../contexts/PlaylistDataContext';
import Bargraph from '../components/Bargraph/Bargraph';
import { WhiteBalance } from 'expo-camera';

/*@TODOS
    play song from touchable opacity
    need song info( valence, dancability, etc)
    visualize data
    graph
    p5.js
*/

/**
 * Flatlist...
 * ITEM_MARGIN: change distance between each item
 * ITEM_SIZE: size of each item
 */

const ITEM_MARGIN = 0;
const {width, height} = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

const ResultPage = ({}) => {
    const {resultsData, setResultsData} = useContext(PlaylistDataContext);
    useEffect(()=> {
        console.log(resultsData)
    })

    const scrollX = React.useRef(new Animated.Value(0)).current;

    let songCount = 0;
    const commonSongCatcher = (songlist1, songlist2) => { //find common songs; uses songlist1 and songlist2
        const songSet = new Set();
        for (const song1 of songlist1) {
            for (const song2 of songlist2) {
                if (song1?.track?.id == song2?.track?.id){
                    songCount += 1
                    songSet.add(song1);
                }
            }
        }
        songCount = songSet.size;
        const songList = [...songSet];
        return songList;
        // console.log(commonSongLocal[0].track?.album?.images[0]?.url);
    }
    const commonSongLocal = commonSongCatcher(resultsData[0].songData.songlist, resultsData[1].songData.songlist);

    return (
        <View style = {styles.Container}>
            <View style={{display:"flex", alignItems: "flex-start", justifyContent:"center", width: "100%", paddingLeft: 10,marginTop: 70, marginBottom: 25, marginLeft: 15}}>
                <Text style={{color:"white", fontSize: 45, color: "#e6e6e6"}}>MusicMatch</Text>
            </View>
            <View style={styles.basicInfoContainer}>
                {resultsData.map((profile)=> {
                    return(
                        <BasicInfo key={profile.user.username+profile.songData.playlistName} displayName={profile.user.displayName} userpic={profile.user.userImage} chosenPlaylistName={profile.songData.playlistName}/>
                    )
                })}
            </View>     
            <View style={{width:'100%', display:'flex', justifyContent:'center',marginBottom:20, alignItems:'center'}}>
                <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", width: "100%", padding: 10,marginTop:10}}>   
                    <Text style={{color:"white"}}>Common Songs </Text>
                    <Text style = {{color:"white"}}>{songCount}</Text>
                </View>
                <Animated.FlatList 
                    data={commonSongLocal}
                    keyExtractor={item => item.track.id.toString()}
                    horizontal
                    bounces = {true}
                    showsHorizontalScrollIndicator = {false}
                    snapToInterval={ITEM_SIZE+ITEM_MARGIN}
                    snapToAlignment='start'
                    decelerationRate={"fast"}
                    style={styles.flatlistContainer}
                    contentContainerStyle={{
                        paddingHorizontal: ITEM_SPACING, //Indents flatlist so first item starts from the center
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        {useNativeDriver: true},
                    )}
                    scrollEventThrottle={16}
                    renderItem={({item,index}) => {
                        const inputRange = [
                            (index - 1) * (ITEM_SIZE+ITEM_MARGIN),
                            (index) * (ITEM_SIZE+ITEM_MARGIN),
                            (index + 1) * (ITEM_SIZE+ITEM_MARGIN)
                        ]
                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [.3,1,.3],
                            extrapolate: 'clamp'
                        })
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [.5,1,.5],
                            extrapolate: 'clamp'
                        })
                        return (
                            <View style={styles.flatlistItem}>
                                <Animated.View style={{
                                    flex: 1,
                                    alignSelf: "stretch",
                                    padding: 10,
                                    justifyContent: "center",
                                    alignItems: "left",
                                    backgroundColor: "black",
                                    borderRadius: 8,
                                    shadowColor: "black",
                                    shadowOffset: {
                                        width: -3,
                                        height: 3
                                    },
                                    shadowOpacity: 1,
                                    shadowRadius: 8,
                                    opacity,
                                    transform: [{
                                        scale
                                    }]
                                }}>
                                    <TouchableOpacity style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                    >
                                        <Image
                                            style={{width: 60, height: 60, marginRight: 20, marginLeft: 20, borderRadius: 8}}
                                            source={{uri: item.track?.album?.images[0]?.url}}
                                        />
                                        <View>
                                            <Text style={{color: "white", fontSize: 20}}>{item?.track?.name.substring(0,17) /* @TODO conditional '..' for names that are too long */}</Text>
                                            <Text style={{color:"white", fontSize: 10}}>{item?.track?.artists[0]?.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                        )
                    }}
                />
            </View>
            <View style={{flex:1,display:'flex', justifyContent:'center', alignItems:'flex-start', width:'100%', marginLeft: 20}}>
                <Text style={{color:'white'}}>
                    Top Artists
                </Text>
                <Bargraph width={480} height={400} resultsData={resultsData}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    Container: {
      //display: "flex",
      flex: 1,
      flexDirection: "column",
      alignItems: 'center',
      width: "100%",
      height: "100%",
      backgroundColor: '#121212',
    },
    basicInfoContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: "100%",
        marginTop: 13,
    },
    flatlistContainer: {
        flexGrow: 0,
        height: 100,
    },
    flatlistItem: {
        width: ITEM_SIZE, 
        alignItems: 'center', 
        borderRaidus: 7,
        marginRight: ITEM_MARGIN,

        /**
         * TO HELP UNDERSTAND HOW THINGS ARE SPACED IN THE FLATLIST
         * borderWidth: 2,
         * borderColor: 'white'
         */
    },
    textfield:{
        fontFamily: 'System',
        textAlign: "center",
        color: "white",
    },
    commonSongCount:{
        fontFamily: 'System',
        textAlign: "center",
        borderRadius: 7,
        color: "white"
    },
  });
 
export default ResultPage;