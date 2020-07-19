import React from 'react';
import { ResponsiveLine } from '@nivo/line';

import { dateFormatter, filterData } from '../../helpers/helpers'

type Data = {
  x: string,
  y: string | null
}

interface ChartProps {
  data: {id: string, data: Data[]}[];
  dateInterval: {from: Date, to: Date}
}

export default function Chart({ data, dateInterval }: ChartProps) {
  const fromDate = dateFormatter(dateInterval.from);
  const toDate = dateFormatter(dateInterval.to);
  console.log(fromDate);
  console.log(toDate);
  const test = filterData(data, 'core', fromDate, toDate);
  console.log(test);
  return (
    <div style={{height: '250px', width: '900px'}}>
      <ResponsiveLine 
        data={test!}
        margin={{ top: 20, right: 110, bottom: 50, left: 125}}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d',
          useUTC: false,
          precision: 'day',
          min: fromDate,
          max: toDate
        }}
        xFormat='time:%Y-%m-%d'
        yScale={{
          type: 'point'
        }}
        curve='monotoneX'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: '%b %d',
          tickValues: 'every 1 day',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickValues: ['Severely Elevated', 'Moderately Elevated', 'Mildly Elevated', 'Stable', 'Mildly Depressed', 'Moderately Depressed', 'Severely Depressed']
        }}
        enableArea={true}
        colors={'#1a1f7f'}
        enableGridX={false}
        />
    </div>
  )
}