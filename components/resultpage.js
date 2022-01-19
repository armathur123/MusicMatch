import { Animated, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import CameraComp from '../components/camera';
import BasicInfo from '../components/basicInfo';
import {Dimensions} from 'react-native';
import { shadowColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
let themeColor = 'rgb(218,165,32)';



const ResultPage = ({userpic1, userpic2, playlistData1, playlistData2, chosenPlaylistName1, chosenPlaylistName2,songlist1, songlist2}) => {
    
    let displayName1 = playlistData1.data?.items[0]?.owner?.display_name;
    let displayName2 = playlistData2.data?.items[0]?.owner?.display_name;
    let songCount = 0;
    let commonSongLocal = []; //consider making this a useRef

    //variables for animating flatlist
    const ITEM_SIZE = Dimensions.get("window").width-70 + 20;
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const commonSongCatcher = () => { //find common songs
        for (const song1 of songlist1) {
            for (const song2 of songlist2) {
                if (song1?.track?.id == song2?.track?.id){
                    songCount += 1
                    commonSongLocal.push(song1);
                }
            }
        }
        // console.log(commonSongLocal[0].track?.album?.images[0]?.url);
    }
    commonSongCatcher();


    return (
        <View style = {styles.Container}>
            <View style={{display:"flex", alignItems: "flex-start", justifyContent:"center", width: "100%", paddingLeft: 10,marginTop: 55, marginBottom: 35,}}>
                <Text style={{color:"white", fontSize: 40, color: "#e6e6e6"}}>MusicMatch</Text>
            </View>
            <View style={styles.basicInfoContainer}>
                <BasicInfo displayName={displayName1} userpic={userpic1} chosenPlaylistName={chosenPlaylistName1}/>
                <BasicInfo displayName={displayName2} userpic={userpic2} chosenPlaylistName={chosenPlaylistName2}/>
            </View>     
            <View style={{display: "flex", flexDirection:"row", justifyContent: "space-between", width: "100%", padding: 10,marginTop:10}}>   
                <Text style={{color:"white"}}>Common Songs </Text>
                <Text style = {{color:"white"}}>{songCount}</Text>
            </View>
            <View>
                <Animated.FlatList style={styles.flatlistContainer}
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
                                width:Dimensions.get("window").width - 70,
                                maxWidth:Dimensions.get("window").width - 70,
                                backgroundColor: "black",
                                borderRadius: 20,
                                margin: 10,
                                shadowColor: "black",
                                shadowOffset: {
                                    width:-3,
                                    height: 3
                                }, 
                                shadowOpacity: 1,
                                shadowRadius: 8,
                                transform: [{scale}], 
                                opacity
                                }}>
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
                            }}
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
        marginTop: 20,
    },
    flatlistContainer: {
      padding: 8,
      width: Dimensions.get("window").width,
      maxHeight: "38%",
    },
    textfield:{
        fontFamily: 'System',
        textAlign: "center",
        color: "white",
    },
    commonSongCount:{
        fontFamily: 'System',
        textAlign: "center",
        borderRadius: 10,
        color: "white"
    },
  });
 
export default ResultPage;