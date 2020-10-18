import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Head from "next/head";
import Order from "./quote";
import Button from "@material-ui/core/Button";
import Link from "../src/ui/Link";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles(theme => ({
  textContainer: {
    // width: '500px',
    marginLeft:'20px',
  },
  vehicleContainer: {
    backgroundImage: `url('/assets/dogCut.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: 300,
  },

  dogContainer: {
    // backgroundImage: `url('/assets/dog.jpg')`,
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    // height: 500,
  },
  orderContainer: {
    backgroundColor:'white',
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
    backgroundColor:'#b8e0bc',
  },

  firstContainer: {
    // padding:'12em 5em',
    backgroundColor: theme.palette.common.brown,

    width: '100%',
    [theme.breakpoints.down('md')]: {
      padding: '10em 2em'
    },
  },
  firstButton: {
    ...theme.typography.estimate,
    borderRadius: 20,
    height: 55,
    width: 330,
    fontSize: '1.3rem',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
  },

}))

export default function Index(props) {
  const classes = useStyles();
  const theme = useTheme();//теперь есть доступ к стрелке learnMore из этого комполнента
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Grid container direction={'column'} className={classes.mainContainer}>
      <Head>
        <title key={'title'}>
          Home | ADHD Movers
        </title>
        <meta
          name={'description'}
          key={'description'}
          content={"ADHD Movers. We can't stop moving"}
        />
        <meta property={'og:title'} content={"ADHD Movers. We can't stop moving | ADHD Movers"} key={'og:title'}/>{/*добавляем open graph превью для SEO. Подробности в www.ogp.me */}
        <meta property={'og:url'} content={'adhdmovers.com'} key={'og:url'}/>{/*добавляем ссылку на страницу сайта */}
        <link rel={'canonical'} key={'canonical'} href={'adhdmovers.com'}/>{/*дефолтный главный адрес страницы. Зависит от настроек DNS*/}
      </Head>
      {/*--------first Block--------*/}
      <Grid item container className={classes.firstContainer}>
        <Grid item container direction={"column"}>
          <Grid item>
            <Typography
              variant={'h1'}
              style={{color:'white', lineHeight:1.3, fontSize:matchesXS?'1.8rem':matchesSM? '2.1rem':null}}
            >
              ADHD MOVERS<br/> "WE CAN'T STOP MOVING" <br/>
            </Typography>
          </Grid>
          <Grid item container style={{marginTop: '2em'}}>
            <Button
              variant={'contained'}
              className={classes.firstButton}
              component={Link}
              href={'/quote'}
            >
              BOOK A MOVE OR GRAB SOME GEAR!
            </Button>
          </Grid>
        </Grid>
        <Grid className={classes.dogContainer}>
          <img src={'/assets/dog.jpg'} alt={'dog pic'}/>
        </Grid>

      </Grid>

      {/*--------Vehicle Block--------*/}
      {/*<Grid item className={classes.vehicleContainer}>*/}

      {/*</Grid>*/}
      <Grid item className={classes.quoteContainer}>
        <Order/>
      </Grid>
    </Grid>
  );
}
