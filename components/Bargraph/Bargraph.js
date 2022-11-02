import React, {useMemo, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import XAxis from './XAxis';
import YAxis from './YAxis';
import Columns from './Columns';

const Bargraph = ({resultsData, width}) => {
    useEffect(() => {
        console.log(resultsData[0].artistData.slice(0,10))
    },[])

    let xAxisHeight = 100;
    const xAxisData = useMemo(() => resultsData[0].artistData.slice(0,5).flatMap(item => Object.values(item)[0]), [resultsData]);
    const valueData = useMemo(() => resultsData[0].artistData.slice(0,5).flatMap(item => Object.values(item)[1]), [resultsData]);
    return (
        <View style={styles.main}>
        <YAxis />
        
        <Columns 
            width={width - 10}
            height={xAxisHeight} 
            xAxisData={xAxisData}
            data={valueData}
            />
        
        <XAxis
            width={width - 10}
            height={xAxisHeight} 
            data={xAxisData}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  main: {
    width:'100%',
    display:'flex',
    justifyContent:'center',
  }
});

export default Bargraph;