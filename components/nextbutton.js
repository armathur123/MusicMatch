import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useContext} from 'react';
import CircularProgress from 'react-native-circular-progress-indicator'; //not currently in use, might come back to this
import Icon from 'react-native-vector-icons/EvilIcons';
import AnimatedLoader from "react-native-animated-loader";
import { PlaylistDataContext } from '../contexts/PlaylistDataContext';
import { tokenFetch, getArtists } from '../apiCalls';


const NextButton = ({navigation, navPage, promiseInProgress, songData, user}) => {

  const {resultsData, setResultsData} = useContext(PlaylistDataContext);
  const songlist = songData?.songlist || [];

  const recurringIndexFinder = (string, searchCharacter, index) => {
    
  }

  const countCompare = (a, b) => {
    if (a.count > b.count) { 
      return -1;
    }
    else if (a.count < b.count) {
      return 1;
    }
    return 0;
  }

  const getGenres = (artistData) => {
    let genreData = [];
    tokenFetch().then(async(tokenData) => {
      let masterIncrement = 0;
      let splitCount = 0;
      let searchArtistString = "";
      while (masterIncrement < artistData.length) {
        // console.log(artistData[masterIncrement]);
        searchArtistString = searchArtistString + artistData[masterIncrement].id + ",";
        masterIncrement += 1;
        splitCount += 1;
        if (splitCount === 49) { //append to string until 50 artists are hit
          searchArtistString = searchArtistString.substring(0, searchArtistString.length - 1); //remove comma at the end of master string
          const artistArray =  await getArtists(searchArtistString, tokenData); //get 50 artists
          for (const artist of artistArray.data.artists) {
            // console.log(artist);
            const correspondingArtistObjIndex = artistData.findIndex((el) => {return el.id === artist.id})
            const matchCount = artistData[correspondingArtistObjIndex].count;
            for (const genre of artist.genres) { //loop through genre of each artist
              const existingGenreID = genreData.findIndex((el) => {return el.name === genre}); //check if genre has already been created
              if (genreData[existingGenreID] === undefined) {
                const genreObj = {name: genre, count: matchCount}
                artistData[correspondingArtistObjIndex].popularity = artist.popularity
                genreData.push(genreObj);
              } else {
                genreData[existingGenreID].count += matchCount;
              }
            }
          }
          splitCount = 0;
          searchArtistString = "";
        }
      }
    });
    genreData.sort(countCompare)
    return genreData;
  }

  const nextButtonPress = async() => {
    let artistData = [];
    for (const {track, ...rest} of songlist) {
      if (track !== null && track !== undefined) {
        for (const artist of track.artists) {
          const existingArtist = artistData.findIndex((el) => {return el.id == artist.id});
          if (artistData[existingArtist] === undefined) {
            const artistObj = {name: artist?.name, count: 1, id: artist?.id}
            artistData.push(artistObj);
          } else {
            artistData[existingArtist].count += 1;
          }
        }
      }
    }
    artistData.sort(countCompare);
    const genreData = await getGenres(artistData);
    const userObj = {songData, user, artistData, genreData};
    setResultsData(prev => {
      const passOn = [...prev, userObj];
      return passOn;
    })
    navigation.navigate(navPage)   
  }
    return (
        <View style={styles.container}>
            {promiseInProgress &&
              <TouchableOpacity>
                <AnimatedLoader
                  visible={true}
                  overlayColor="rgba(0, 0, 0,0.5)"
                  animationType="fade"
                  source={require("./loader-animation.json")} 
                  animationStyle={styles.loader}
                  speed={1}
                />
                {/* https://lottiefiles.com/69922-loader-animation credit to Syed Haider Ali */}
              </TouchableOpacity>}
            {(songlist !== undefined && songlist.length !== 0 && !promiseInProgress) && //songlist has songs and api isnt still loading songs
              <TouchableOpacity 
                style = {styles.button} 
                onPress={nextButtonPress}>
                <Icon name='chevron-right' size={65} color="white" />
              </TouchableOpacity>}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 5,
    bottom: 27,
  },
  loader: {
    position: 'absolute',
    right: -75,
    top: 85,
    padding: 100,
    maxWidth: 200,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "7%",
    width:"70%",
    borderRadius:50,
    paddingTop: 4,
    paddingBottom: 4
  },
  activityIndicator: {
    padding: 7,
    width: 35,
    marginRight: "8%"
  },
  text: {
    color: "white",
    fontSize: 25
  }
});

export default NextButton;