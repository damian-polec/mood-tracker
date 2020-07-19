import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { 
  selectFiltersChartsVisibility, 
  selectFiltersInterval, 
  changeChartsVisibility, 
  changeTimeInterval} from '../chartSlice';
import { countDaysDiff } from '../../../helpers/helpers'

const useStyles = makeStyles((theme: Theme) => 
 createStyles({
   chartFilters: {
     background: '#fff',
     maxWidth: '900px',
     marginTop: theme.spacing(2),
     marginBottom: theme.spacing(2),
     padding: theme.spacing(2),
     borderRadius: '20px'
   },
   formLabel: {
     textAlign: 'center',
   },
   datePicker: {
     marginLeft: theme.spacing(1),
     marginRight: theme.spacing(1),
   }
 }))

export default function ChartFilters() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isVis = useSelector(selectFiltersChartsVisibility);
  const interval = useSelector(selectFiltersInterval);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeChartsVisibility({name: event.target.name, value: event.target.checked}))
  };

  const handleFromDateChange = (date: Date | null) => {
    if (!date) {
      return;
    }
    if (countDaysDiff(date, interval.to) > 30) {
      console.log('Interval to big. 30 days max');
      return;
    }
    if (countDaysDiff(date, interval.to) < 7) {
      console.log('Interval to short. At least 7 days');
      return;
    }
    dispatch(changeTimeInterval({name: 'from', value: date}));
  };

  const handleToDateChange = (date: Date | null) => {
    if(!date) {
      return;
    }
    if (countDaysDiff(interval.from, date) > 31) {
      console.log('Interval to big. 30 days max');
      return;
    }
    if (countDaysDiff(interval.from, date) < 7) {
      console.log('Interval to short. At least 7 days');
      return;
    }
    dispatch(changeTimeInterval({name: 'to', value: date}));
  };

  return (
    <Grid className={classes.chartFilters} container justify='center'>
      <Grid item>
        <FormControl component='fieldset'>
          <FormLabel className={classes.formLabel} component="legend">Show Charts</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={isVis.coreMood} 
                  onChange={handleChange} 
                  name="coreMood"
                  color='primary' 
                />
              }
              label="Core Mood"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isVis.mixedMood}
                  onChange={handleChange}
                  name="mixedMood"
                  color="primary"
                />
              }
              label="Mixed Mood"
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={isVis.anxiety}
                  onChange={handleChange}
                  name='anxiety'
                  color='primary' 
                />
              } 
              label="Anxiety" 
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={isVis.irritability}
                  onChange={handleChange}
                  name='irritability'
                  color='primary' 
                />
              } 
              label="Irritability" 
            />
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={isVis.sleepHours}
                  onChange={handleChange}
                  name='sleepHours'
                  color='primary' 
                />
              } 
              label="Sleep Hours" 
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <FormLabel className={classes.formLabel} component="legend">Days Interval</FormLabel>
        <KeyboardDatePicker
            className={classes.datePicker}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="From Date"
            value={interval.from}
            onChange={handleFromDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="To Date"
          value={interval.to}
          onChange={handleToDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </Grid>
  )
}