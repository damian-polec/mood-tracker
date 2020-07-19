import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Chart from '../../features/chart/Chart';
import Charts from '../Charts/Charts';

const useStyles = makeStyles((theme: Theme) => 
 createStyles({
   content: {
    position: 'absolute',
    top: '64px',
    left: '260px',
    background: theme.palette.secondary.light,
    minHeight: 'calc(100vh - 64px)',
    width: 'calc(100vw - 260px)',
    paddingLeft: '1rem',
    paddingTop: '1rem'
   }
 }))

export default function Content() {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Charts />
    </main>
  )
}