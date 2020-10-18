import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import vehicle from "../assets/van.webp";
// import Order from "./Order";
import dog from "../assets/dog.jpg";
import infinity from "../assets/infinityWhite.svg";
import businessCardCut from "../assets/businessCardCut.jpg";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
// import Carousel from 'react-material-ui-carousel'
// import {Paper} from '@material-ui/core'
import Slider from "./Slider";
import Contact from "./Contact";
import Order from "./Order";


const useStyles = makeStyles(theme => ({
  firstContainer: {
    backgroundColor: theme.palette.common.brown,
  },
  firstTextContainer: {
    width: '60%',
    padding: '10% 0 0 0',
    color:'white',
    // textShadow: '2px 2px 1px black',
    [theme.breakpoints.down('sm')]: {
      // padding: '8em 1em 1em 1em',
    },
    [theme.breakpoints.down('xs')]: {
      // padding: '6em 1em 1em 1em',
    },
  },
  firstText: {
    fontSize: '3.8rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.8rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.7rem'
    },
  },
  secondText: {
    fontSize: '2.8rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem'
    },
  },
  firstDogContainer: {
    // backgroundImage: `url('/assets/dog.jpg')`,
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    // height: 500,
    width: '40%',
  },
  dogImg: {
    width:'100%',
    height:'100%',
  },
  infinityImg: {
    width:'4em',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      width: '3em'
    },
    [theme.breakpoints.down('xs')]: {
      width: '2em'
    },
  },
  firstButton: {
    ...theme.typography.estimate,
    fontSize: '1.1rem',
    // backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.common.brown
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.5rem'
    },

  },

  vehicleContainer: {
    backgroundImage: `url('/assets/dogCut.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: 300,
  },

  extraBlockContainer: {
    // backgroundColor: transpare,
    // height:'400px',
    // border:'1px solid red',
    overflow: 'hidden'
  },

  vehicle: {
    width: '400px',
    justifyContent:'center',
    margin:'0 0 0 4em',
    [theme.breakpoints.down('sm')]: {
      margin:'2em 0 0 0',
      width: '300px'
    },

  },
  vehicleImg: {
    width: '100%',
  },

  mainContainer: {
    // padding: '1em 0 0 0',
    backgroundColor: theme.palette.common.lightBrown,
  },



}));

export default function LandingPage(props) {
  const classes = useStyles();
  const theme = useTheme();//теперь есть доступ к стрелке learnMore из этого комполнента
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));//вызываем библиотеку для адаптива



  return (
    <Grid container direction={'column'} className={classes.mainContainer}>
      {/*--------first Block--------*/}
      <Grid item container className={classes.firstContainer}>
        <Grid item container direction={"column"} alignItems={'center'} className={classes.firstTextContainer}>
          {/*<Grid item container justify={'center'} direction={'column'}>*/}
            <Typography
              className={classes.firstText}
              variant={'h1'}
            >
              ADHD MOVERS
            </Typography>
            <Typography
              className={classes.secondText}
              variant={'h2'}
            >
             "WE CAN'T STOP MOVING"
            </Typography>
            {/*<Grid item container justify={'center'}>*/}
              <img src={infinity} alt={'infinity pic'} className={classes.infinityImg}/>
            {/*</Grid>*/}
            <Grid item style={{marginTop: '2em'}}>
              <Button
                // variant={'contained'}
                className={classes.firstButton}
                component={Link}
                href={'/shop'}
              >
                BOOK A MOVE OR GRAB SOME GEAR!
              </Button>
            </Grid>
          </Grid>
        <Grid className={classes.firstDogContainer}>
          <img src={dog} alt={'dog pic'} className={classes.dogImg}/>
        </Grid>
      </Grid>

      {/*--------Book Block--------*/}
      <Contact/>
      {/*--------Tshirt Block--------*/}
      <Slider/>
      <img src={businessCardCut} alt={'roadPic'} style={{width:'100%', height:'100%'}}/>
    </Grid>
  )
}