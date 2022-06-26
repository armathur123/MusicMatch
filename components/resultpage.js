import { Animated, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect, useContext, useMemo} from 'react';
import BasicInfo from '../components/basicInfo';
import {Dimensions} from 'react-native';
import { shadowColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
let themeColor = 'rgb(218,165,32)';
import { PlaylistDataContext } from '../contexts/PlaylistDataContext';
import Bargraph from '../components/Bargraph/Bargraph';

/*@TODOS
    play song from touchable opacity
    need song info( valence, dancability, etc)
    visualize data
    graph
    p5.js
*/

const ResultPage = ({}) => {
    const {resultsData} = useContext(PlaylistDataContext);
    useEffect(()=> {
        console.log('resultsData')
        console.log(resultsData)
    })

    //variables for animating flatlist
    const ITEM_SIZE = Dimensions.get("window").width-70 + 20;
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
    
    const commonArtistCatcher = (artistList1, artistList2) => {
        console.log('commonArtistCatcher');
    }

    const commonSongLocal = commonSongCatcher(resultsData[0].songData.songlist, resultsData[1].songData.songlist);
    commonArtistCatcher(resultsData[0].artistData, resultsData[1].artistData);

    return (
        <View style = {styles.Container}>
            <View style={{display:"flex", alignItems: "flex-start", justifyContent:"center", width: "100%", paddingLeft: 10,marginTop: 70, marginBottom: 25, marginLeft: 15}}>
                <Text style={{color:"white", fontSize: 45, color: "#e6e6e6"}}>MusicMatch</Text>
            </View>
            <View style={styles.basicInfoContainer}>
                {resultsData.map((profile)=> {
                    return(
                        <BasicInfo displayName={profile.user.displayName} userpic={profile.user.userImage} chosenPlaylistName={profile.songData.playlistName}/>
                    )
                })}
            </View>     
            <View style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", width: "100%", padding: 10,marginTop:10}}>   
                    <Text style={{color:"white"}}>Common Songs </Text>
                    <Text style = {{color:"white"}}>{songCount}</Text>
                </View>
                <Animated.FlatList 
                    style={styles.flatlistContainer}
                    keyExtractor={(item) => item.id}
                    data={commonSongLocal}
                    horizontal={true}
                    onScroll={Animated.event(
                        [{nativeEvent:{contentOffset: {x: scrollX}}}],
                        {useNativeDriver: true},
                    )}
                    renderItem={({item, index}) => {
                        /*@TODO: try making the normal scale of the items super small and only enlarge when its within the 'viewing area' */
                        const inputRange = [-1, 0, ITEM_SIZE*index, ITEM_SIZE * (index+1.9)];
                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [1, 1, 1, 0],
                        });
                        const opacityInputRange = [-1, 0, ITEM_SIZE*index, ITEM_SIZE * (index+1.2), ITEM_SIZE * (index+1.5)];
                        const opacity = scrollX.interpolate({
                            inputRange: opacityInputRange,
                            outputRange: [1, 1, 1, .3, 0],
                        });

                        return <Animated.View style = {{
                                    maxHeight:'100%',

                                    width:Dimensions.get("window").width - 70,
                                    maxWidth:Dimensions.get("window").width - 70,
                                    backgroundColor: "black",
                                    borderRadius: 7,
                                    margin: 11,
                                    shadowColor: "black",
                                    shadowOffset: {
                                        width:-3,
                                        height: 3
                                    }, 
                                    shadowOpacity: 1,
                                    shadowRadius: 8,
                                    transform: [{scale}], 
                                    opacity,
                                    }}
                                    key={index}>
                                    <TouchableOpacity style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        padding: 10,
                                        alignItems: "center",
                                        justifyContent: 'flex-start',}}>
                                        <Image
                                            style={{width: 60, height: 60, marginRight: 20, marginLeft:20, borderRadius: 8}}
                                            source = {{uri: item.track?.album?.images[0]?.url}}
                                        />  
                                        <View>
                                            <Text style={{color:"white", fontSize: 20}}>{item?.track?.name.substring(0,17) /* @TODO conditional '..' for names that are too long */}</Text> 
                                            <Text style={{color:"white", fontSize: 10}}>{item?.track?.artists[0]?.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Animated.View>
                                }
                    }
                />
            </View>
            <View style={{flex:1,display:'flex', justifyContent:'center', alignItems:'flex-start', width:'100%'}}>
                <Text style={{color:'white'}}>
                    Top Artists
                </Text>
                <Bargraph width={480} height={300} resultsData={resultsData}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    Container: {
      display: "flex",
      flexDirection: "column",
      alignItems: 'center',
      justifyContent:'flex-start',
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
      padding: 8,
      width: Dimensions.get("window").width,
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