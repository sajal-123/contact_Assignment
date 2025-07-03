import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native';

interface Props {
  data: { hour: string; count: number }[];
  COLORS: {
    bar: string;
    grid: string;
    axis: string;
  };
}

const Graph: React.FC<Props> = ({ data, COLORS }) => {
  return (
    <VictoryChart
      domainPadding={{ x: 24 }}
      height={280}
      animate={{
        duration: 800,
        easing: 'exp',
      }}
    >
      <VictoryAxis
        tickFormat={data.map((d) => d.hour)}
        style={{
          tickLabels: {
            fontSize: 12,
            angle: -30,
            padding: 12,
            fill: COLORS.axis,
          },
          axis: { stroke: COLORS.axis },
          grid: { stroke: COLORS.grid, strokeDasharray: '4,4' },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => `${x}`}
        style={{
          tickLabels: { fontSize: 12, fill: COLORS.axis },
          axis: { stroke: COLORS.axis },
          grid: { stroke: COLORS.grid, strokeDasharray: '4,4' },
        }}
      />
      <VictoryBar
        data={data}
        x="hour"
        y="count"
        style={{
          data: {
            fill: COLORS.bar,
            width: 18,
            borderRadius: 4,
          },
        }}
      />
    </VictoryChart>
  );
};

export default Graph;
