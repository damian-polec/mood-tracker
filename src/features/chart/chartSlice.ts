import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { sortData } from '../../helpers/helpers';

type Data = {
  x: string,
  y: string | null
}

interface ChartState {
  filters: {
    chartsVis: {
      [key: string]: boolean;
    };
    interval: {
      from: Date;
      to: Date;
    }
  }
  chartsData: {[key: string]: {id: string, data: Data[]}[]}[];
}

const initialState: ChartState = {
  filters: {
    chartsVis: {
      coreMood: true,
      mixedMood: true,
      anxiety: true,
      irritability: true,
      sleepHours: true
    },
    interval: {
      from: new Date(),
      to: new Date(Date.now() + (30*24*60*60*1000))
    }
  },
  chartsData: [
    {
      coreMood:  [
        {
          id: 'user',
          data: [
            { x: '1970-01-13', y: 'Severely Elevated' },
            { x: '1970-01-14', y: 'Moderately Elevated' },
            { x: '1970-01-15', y: 'Mildly Elevated' },
            { x: '1970-01-16', y: 'Stable' },
            { x: '1970-01-17', y: 'Mildly Depressed' },
            { x: '1970-01-18', y: 'Moderately Depressed' },
            { x: '1970-01-19', y: 'Severely Depressed' },
            { x: '1970-01-20', y: null },
          ]
        },
      ],
      mixedMood: [
        {
          id: 'user',
          data: [
            { x: '1970-01-13', y: 'Severely Elevated' },
            { x: '1970-01-14', y: 'Moderately Elevated' },
            { x: '1970-01-15', y: 'Mildly Elevated' },
            { x: '1970-01-16', y: 'Stable' },
            { x: '1970-01-17', y: 'Mildly Depressed' },
            { x: '1970-01-18', y: 'Moderately Depressed' },
            { x: '1970-01-19', y: 'Severely Depressed' },
            { x: '1970-01-20', y: null },
          ]
        },
      ],
    }
  ]
};

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<Data> ) => {
      state.chartsData[0].coreMood[0].data = sortData(state.chartsData[0].coreMood[0].data, action.payload);
    },
    modifyRecord: (state, action: PayloadAction<{index: number, data: Data}>) => {
      state.chartsData[0].coreMood[0].data.splice(action.payload.index, 1, action.payload.data);
    },
    deleteRecord: (state, action: PayloadAction<{index: number}>) => {
      state.chartsData[0].coreMood[0].data.splice(action.payload.index, 1);
    },
    changeChartsVisibility: (state, action: PayloadAction<{name: string, value: boolean}>) => {
      state.filters.chartsVis[action.payload.name] = action.payload.value;
    },
    changeTimeInterval: (state, action: PayloadAction<{name: 'from' | 'to', value: Date}>) => {
      state.filters.interval[action.payload.name] = action.payload.value
    }
    // increment: state => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { 
  addRecord, 
  modifyRecord, 
  deleteRecord,
  changeChartsVisibility, 
  changeTimeInterval } = chartSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCoreMood = (state: RootState) => state.chart.chartsData[0].coreMood;
export const selectFiltersChartsVisibility = (state: RootState) => state.chart.filters.chartsVis;
export const selectFiltersInterval = (state: RootState) => state.chart.filters.interval

export default chartSlice.reducer;
