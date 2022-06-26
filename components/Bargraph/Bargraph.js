import React, {useMemo, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import XAxis from './XAxis';
import YAxis from './YAxis';
import Columns from './Columns';

const countCompare = (a, b) => {
    if (a.count > b.count) { 
      return -1;
    }
    else if (a.count < b.count) {
      return 1;
    }
    return 0;
}

const Bargraph = ({resultsData, width}) => {

    let xAxisHeight = 100;
    const sortedData = [...resultsData[0].artistData].sort(countCompare);
    // console.log('sorted')
    // console.log(sortedData);
    const xAxisData = useMemo(() => sortedData.slice(0,5).flatMap(item => Object.values(item)[0]), [sortedData]);
    const valueData = useMemo(() => sortedData.slice(0,5).flatMap(item => Object.values(item)[1]), [sortedData]);
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