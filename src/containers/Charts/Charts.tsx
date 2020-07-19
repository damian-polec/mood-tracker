import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCoreMood, 
  addRecord, 
  modifyRecord, 
  deleteRecord,
  selectFiltersInterval } from '../../features/chart/chartSlice';
import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ShowChart from '@material-ui/icons/ShowChart';
import Chart from '../../features/chart/Chart';
import ChartActions from '../../features/chart/ChartActions/ChartActions';
import ChartFilters from '../../features/chart/ChartFilters/ChartFilters';
import MoodDialog from '../../components/Dialog/MoodDialog';
import { dateFormatter } from '../../helpers/helpers';

const useStyles = makeStyles((theme: Theme) => 
 createStyles({
   chartActionsWrapper: {
     width: '900px'
   },
   chartHeader: {
     textAlign: 'center',
     marginBottom: theme.spacing(1)
   },
   icon: {
    background: '#FD5C6F',
    width: theme.spacing(7),
    height: theme.spacing(7)
   },
   paper: {
    width: '80%',
    maxHeight: 435
   }
 }))


export default function Charts() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const moodData = useSelector(selectCoreMood);
  const interval = useSelector(selectFiltersInterval);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('add')
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleClickButton = (action: string) => {
    setAction(action);
    setOpen(true);
  }

  const handleAddRecord = (newValue?: string) => {
    setOpen(false)
    const date = dateFormatter(selectedDate!)
    if(!newValue) {
      return;
    }
    if(moodData[0].data.filter(i => i.x === date).length === 0) {
      dispatch(addRecord({x: date, y: newValue}))
    } else {
      console.log('error');
    }
  }

  const handleModifyRecord = (newValue?: string) => {
    setOpen(false)
    const date = dateFormatter(selectedDate!)
    const index = moodData[0].data.map(i => i.x).indexOf(date)
    if(!newValue) {
      return;
    }
    if(index >= 0) {
      dispatch(modifyRecord({index: index, data: {x: date, y: newValue}}));
    } else {
      console.log('error');
    }
  }

  const handleDeleteRecord = () => {
    setOpen(false);
    const date = dateFormatter(selectedDate!)
    const index = moodData[0].data.map(i => i.x).indexOf(date)
    if(index >= 0) {
      dispatch(deleteRecord({index: index}));
    } else {
      console.log('error');
    }
  }

  return (
    <>
      <Grid container>
        <Avatar className={classes.icon}>
          <ShowChart fontSize='large'/>
        </Avatar>
        <Typography variant='h3'>Charts</Typography>
      </Grid>
      <ChartFilters />
      <Grid container direction='column'>
        <Grid className={classes.chartActionsWrapper} container direction='column' alignItems='center'>
          <Grid item>
            <Typography className={classes.chartHeader} variant='h4'>Core Mood</Typography>
            <ChartActions click={handleClickButton}/>
          </Grid>
        </Grid>
        <Chart 
          data={moodData}
          dateInterval={interval}/>
        <MoodDialog 
          classes={{
            paper: classes.paper
          }}
          id='core-mood-menu'
          keepMounted
          actionType={action}
          open={open}
          onClose={action === 'add' ? handleAddRecord : action === 'modify' ? handleModifyRecord : handleDeleteRecord}
          value='Stable'
          date={selectedDate}
          onDateChange={handleDateChange}
          />
      </Grid>
    </>
  )
}