import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Logo from '../../assets/logo-black.png';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    withDrawer: {
      width: `calc(100% - 260px)`,
      marginLeft: '260px',
      borderTopLeftRadius: '25px'
    },
    toolbar: {
      maxWidth: '1086px',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    toolbarMargin: {
      ...theme.mixins.toolbar
    },
    logo: {
      height: '4em'
    },
    tabs: {
      '& .Mui-selected': {
        opacity: .7
      }
    },
    tab: {
      textTransform: 'none',
      fontWeight: 700,
      color: '#1f1f1f',
      fontSize: '1rem',
      minWidth: 10,
      marginLeft: '16px',
      opacity: 1,
      '&:hover': {
        opacity: .7
      },
    },
  })
)

export default function Header() {
  const classes = useStyles();
  const [value, setValue] = useState(5);
  useEffect(() => {
    const path = window.location.pathname;
    switch(path) {
      case '/app/my-account':
        if(value === 0) {
          return;
        }
        setValue(0)
          break;
        case '/app/forum':
          if(value === 1) {
            return;
          }
          setValue(1)
          break;
        case '/app/testimonials':
          if(value === 2) {
            return;
          }
          setValue(2)
          break;
        case '/app/faq':
          if(value === 3) {
            return;
          }
          setValue(3)
          break;
        case '/app/contact':
          if(value === 4) {
            return;
          }
          setValue(4)
          break;
        default:
          if(value === 5) {
            return;
          }
          setValue(5)
          break;
    }
  }, [value])

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }
  return (
    <>
      <AppBar className={classes.withDrawer} position='fixed' color='secondary'>
        <Toolbar className={classes.toolbar}>
          <img className={classes.logo} src={Logo} alt='moodtracker.com' />
          <Tabs
            className={classes.tabs}
            value={value} 
            onChange={handleChange} 
            aria-label='main nav tabs'>
            <Tab
              textColor='inherit' 
              className={classes.tab}
              label='My Account' 
              component={Link} 
              to='/app/my-account'/>
            <Tab className={classes.tab} label='Forum' component={Link} to='/app/forum'/>
            <Tab className={classes.tab} label='Testimonials' component={Link} to='/app/testimonials' />
            <Tab className={classes.tab} label='FAQ' component={Link} to='/app/faq'/>
            <Tab className={classes.tab} label='Contact' component={Link} to='/app/contact' />
            <Tab className={classes.tab} disabled/>
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  )
}