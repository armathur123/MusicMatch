import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

const ResultPage = ({songlist1, songlist2}) => {

    useEffect(() => {
        songCompare();
        commonSongCatcher();
    })

    const [commonSongCount, setCommonSongCount] = useState(0);
    const songCompare = () => {
        console.log(songlist1);
        console.log(songlist2);
    }

    const commonSongCatcher = () => {
        let songCount = 0;
        for (const song1 of songlist1) {
            for (const song2 of songlist2) {
                if (song1?.track?.name == song2?.track?.name){
                    console.log(song1);
                    songCount += 1;
                }
            }
        }
        setCommonSongCount(songCount);
    }
    return (
        <View>
            <Text>Results</Text>
            <Text>{commonSongCount}</Text>
        </View>
    );
}
 
export default ResultPage;