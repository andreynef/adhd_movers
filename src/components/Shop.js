import React, {useState} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import airplane from '../assets/send.svg';
import purpleTshirt from '../assets/purpleTshirt.jpg';
import pinkSweater from '../assets/pinkSweater.jpg';
import blackHoodie from '../assets/blackHoodie.jpg';
import greyThirt from '../assets/greyTshirt.jpg';
import tieDie from '../assets/tieDie.jpg';
import Button from "@material-ui/core/Button";
import Carousel from "react-material-ui-carousel";
import {Paper} from "@material-ui/core";
import ava from "../assets/ava.webp";
import Link from "@material-ui/core/Link";
import Popover from "@material-ui/core/Popover";


const useStyles = makeStyles(theme => ({

  template: {
    ...theme.typography.estimate,
    fontSize: '1rem',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down('sm')]: {
      height: 40,
    },

  },
  mainContainer: {
    backgroundColor: theme.palette.common.lightBrown,
    padding:'2em',
  },
  paperContainer:{
    width:'300px',
    padding: '10px',
    margin: '20px 20px 0 0',
    backgroundColor: 'transparent',
  },
  button: {
    padding:0,
    width:'100%',
  },
  img :{
    width:'100%',
    borderRadius:'5px',
  },
  quickViewContainer: {
    position: 'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    color: 'white',
    backgroundColor: `black`,
    opacity: 0,
    '&:hover': {
      opacity: 0.6,
      transition: 'all 0.5s ease 0s'
    },
  },
  // quickViewText: {
  //   fontSize: '2rem',
  // },
  descriptionContainer:{
    padding: '20px',
    backgroundColor: 'transparent',
  },
  descriptionText:{
    fontSize: '16px',

  },
  bestSellerContainer: {
    position: 'absolute',
    top:0,
    left:0,
    padding:'5px',
    margin: 0,
    // width: '25%',
    color:'white',
    fontSize: '0.7rem',
    backgroundColor: theme.palette.common.brown,
    // opacity: 0.8,
  },
  carouselContainer: {
    width:'50%',
    padding:'20px',
    // border: '1px solid red',
    [theme.breakpoints.down('sm')]: {
      width:'100%',
    },

  },
  exampleContainer: {
    width:'50%',
    padding:'40px',
    [theme.breakpoints.down('sm')]: {
      width:'100%',
      marginBottom: '30px'
    },

  },
  avaImg: {
    borderRadius: '50%',
    width:'50%',
  }
}))

export default function Shop(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива

 const items = [
    {
      name: "ADHD GREY T-SHIRT",
      price: "$22.00",
      imgUrl:greyThirt,
      link: '/shop/adhd-grey-t-shirt'
    },
    {
      name: "ADHD MOVERS BLACK HOODIE",
      price: "$44.00",
      imgUrl:blackHoodie,
      link: '/shop/adhd-movers-black-hoodie'
    },
    {
      name: "PINK ADHD MOVERS SWEATER",
      price: "$33.00",
      imgUrl:pinkSweater,
      link: '/shop/pink-adhd-movers-sweater'
    },
    {
      name: "ADHD TIE DYE",
      price: "$33.00",
      imgUrl:tieDie,
      link: '/shop/adhd-tie-dye'
    },
    {
      name: "PURPLE T-SHIRT",
      price: "$22.00",
      imgUrl:purpleTshirt,
      link: '/shop/purple-t-shirt'
    },
  ]

  const Item = (props) =>{

    return (
      <Paper className={classes.paperContainer}>
        <Button
          className={classes.button}
          component={Link}
          href={'/shop/product-page'}
        >
          <img src={props.item.imgUrl} className={classes.img}/>
          <Grid container justify={'center'} alignContent={'flex-end'} className={classes.quickViewContainer}>
            <Grid item>
              <p>
                view description
              </p>
            </Grid>
          </Grid>
          {props.item.name==='PURPLE T-SHIRT' &&(
                <p className={classes.bestSellerContainer}>
                  best seller
                </p>
          )}



        </Button>
        <Grid container direction={'column'} className={classes.descriptionContainer}>
          <Typography className={classes.descriptionText}>
            {props.item.name}
          </Typography>
          <Typography style={{marginTop: '10px'}} className={classes.descriptionText}>
            {props.item.price}
          </Typography>
        </Grid>
      </Paper>
    )
  }


  return (
    <Grid container className={classes.mainContainer} justify={'center'}>
      {items.map( (item, i) => <Item key={i} item={item} /> )}
    </Grid>


  )
}