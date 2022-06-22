// BarGraph/xAxis.js

import React ,{useContext} from 'react';
import { scaleBand } from 'd3-scale';
import Svg, {G, Text} from 'react-native-svg';

const XAxis = ({width, height, data}) => {


  const getValuePosition = (index, values, width) => {
    let x = scaleBand().rangeRound([20, width - 55])
    x.domain(values.map(d => {
      return d;
    }));
    return x(values[index]);
  }


  return (
    <Svg width={width} height={height}>
      <G>
        {data.map((item, index) => {
        return <Text
            key={index}
            /*x= THE NEXT STEP */
            stroke="white"
            fontSize="5"
            x={getValuePosition(index, data, width)}
            y="10"
            textAnchor="middle"            >
              {item}
          </Text>})}
      </G>
    </Svg>
  );
}

export default XAxis;