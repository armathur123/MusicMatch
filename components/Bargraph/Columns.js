//BarGraph/Columns.js

import React from 'react';
import { View } from 'react-native';
import { scaleBand, scaleLinear } from 'd3-scale';
import Svg, {Rect} from 'react-native-svg';

const GRAPH_BAR_WIDTH = 7;

const Columns = ({width, height, xAxisData, data}) => {
    const getValuePosition = (index, values, width) => {
        let x = scaleBand().rangeRound([40, width - 60])
        x.domain(values.map(d => {
            return d;
        }));
        return x(values[index]);
    }

    
    const max = Math.max(...data.map(val => val.value));
    const y = scaleLinear().domain([0, max]).range([height, 35]);

  return (
    <Svg width={width} height={height}     style={{ transform: [{ scaleY:-1 }] }}>
        {data.map((item, index) => {
            return <Rect
                key={index}
                x={getValuePosition(index, xAxisData, width)}
                y={y}
                rx={2.5}
                width={GRAPH_BAR_WIDTH}
                height={item*4}
                fill='red'
            />
        })}
    </Svg>
  );
}

export default Columns;