import React, { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Star from '@material-ui/icons/Star'
import ShowChart from '@material-ui/icons/ShowChart';
import LocalHospital from '@material-ui/icons/LocalHospital';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import AccessAlarm from '@material-ui/icons/AccessAlarm';
import People from '@material-ui/icons/People';
import Logo from '../../assets/logo-white.png';

const listItems = [
  {text: 'My Purpose', icon: 'star', path: '/app/my_purpose'},
  {text: 'Charts', icon: 'chart', path: '/app/charts'},
  {text: 'Medications', icon: 'hospital', path: '/app/medications'},
  {text: 'Exercises', icon: 'run', path: '/app/exercises'},
  {text: 'Reminders', icon: 'alarm', path: '/app/reminders'},
  {text: 'Wellness team', icon: 'people', path: '/app/wellness_team'}
]
const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      height: '100vh',
      width: drawerWidth,
      background: theme.palette.primary.main,
      "& .MuiPaper-root": {
        background: 'none',
        width: 'inherit',
        paddingLeft: '15px',
        paddingRight: '35px'
      },
      "& .MuiDrawer-paperAnchorDockedLeft": {
        border: 'none'
      }
    },
    logo: {
      height: '5em',
    },
    avatarWrapper: {
      background: theme.palette.primary.light,
      minHeight: '25%',
      color: '#fff',
      marginBottom: '1rem'
    },
  avatarBorder: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #48B4CF'
  },
  avatar: {
    height: '76px',
    width: "76px",
  },
  starIcon: {
    background: '#00CE8E'
  },
  chartIcon: {
    background: '#FD5C6F'
  },
  medsIcon: {
    background: '#2EDDDA'
  },
  exerciseIcon: {
    background: '#FFA93F'
  },
  alarmIcon: {
    background: '#DD45E6'
  },
  teamIcon: {
    background: '#8DC640'
  },
  list: {
    '& .Mui-selected': {
      backgroundColor: theme.palette.secondary.main,
      color: '#1f1f1f',
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      }
    },
  },
  listItem: {
    background: theme.palette.primary.light,
    borderRadius: '25px',
    color: '#fff',
    borderTopRightRadius: 0,
    marginBottom: '1rem',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#1f1f1f'
    }
  },
  listItemText: {
    '& .MuiListItemText-primary': {
      fontWeight: 700
    }
  }
  })
)
export default function Sidebar() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (
    event: MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  }
  return (
    <Drawer
      className={classes.drawer}
      variant='permanent'>
      <img className={classes.logo} src={Logo} alt='moodtracker.com logo' />
      <Grid
        className={classes.avatarWrapper} 
        container
        justify='center'
        alignItems='center'
        direction='column'>
          <Grid className={classes.avatarBorder} item>
            <Avatar className={classes.avatar} />
          </Grid>
          <Typography variant='h6'>User Name</Typography>
          <Typography variant='body1'>User Disease</Typography>
      </Grid>
      <List className={classes.list} component='nav'>
        {listItems.map((item, i) => {
          return (
            <ListItem
              key={`${item.text}-${i}`}
              className={classes.listItem}
              button
              selected={selectedIndex === i}
              onClick={(event:any) => handleListItemClick(event, i)}
              component={Link}
              to={item.path}>
              <ListItemAvatar>
                <Avatar
                  className={item.icon === 'star' ? classes.starIcon 
                            : item.icon === 'chart' ? classes.chartIcon
                            : item.icon === 'hospital' ? classes.medsIcon
                            : item.icon === 'run' ? classes.exerciseIcon
                            : item.icon === 'alarm' ? classes.alarmIcon
                            : item.icon === 'people' ? classes.teamIcon
                            : undefined}>
                  {item.icon === 'star' ? <Star />
                  : item.icon === 'chart' ? <ShowChart />
                  : item.icon === 'hospital' ? <LocalHospital />
                  : item.icon === 'run' ? <DirectionsRun />
                  : item.icon === 'alarm' ? <AccessAlarm />
                  : item.icon === 'people' ? <People />
                  : null}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary={item.text} />
            </ListItem>
          )
        })}
      </List>

    </Drawer>
  )
}