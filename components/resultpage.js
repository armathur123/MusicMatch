import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';

const ResultPage = ({songlist1, songlist2}) => {
    const songCompare = () => {
        console.log(songlist1.length);
        console.log(songlist2.length);
    }
    songCompare();
    return (
        <View>
            <Text>Results</Text>
            <Text></Text>
        </View>
    );
}
 
export default ResultPage;