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
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";


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

  img :{
    width:'100%',
  },

  // quickViewText: {
  //   fontSize: '2rem',
  // },
  descriptionContainer:{
    padding: '20px',
    width: '60%',
  },
  descriptionTitle:{
    fontSize: '1rem',
    marginTop: '30px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  descriptionText:{
    fontSize: '0.8rem',
    marginTop: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  },
  quantityInput:{
    width: '100px',
    backgroundColor: 'white',
    marginTop: '30px',
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  addContainer:{
    padding: '20px',
    width: '40%',
  },
  addButton: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  }




}))

export default function FullCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива

 const item = {
      name: "ADHD GREY T-SHIRT",
      price: "$22.00",
      imgUrl:greyThirt,
      info:'Champion Brand Gear.  Comes in Sizes Small-XXL',
    };
  const [quantity, setQuantity] = useState('1');

  const onChange = e => {
    setQuantity(e.target.value);
  };

  const onAdd = () => {//нажатие на кнопку 'add'
    setQuantity('');//сброс полей
  };

  return (
    <Grid container className={classes.mainContainer} justify={'center'}>
      <img src={greyThirt} className={classes.img}/>
      <Grid item container >
        <Grid container item direction={'column'} className={classes.descriptionContainer}>
          <Typography className={classes.descriptionTitle}>
            {item.name}
          </Typography>
          <Grid item>
            <Typography className={classes.descriptionTitle}>
              PRODUCT INFO
            </Typography>
            <Typography className={classes.descriptionText}>
              {item.info}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.descriptionTitle}>
              REFUND POLICY
            </Typography>
            <Typography className={classes.descriptionText}>
              No refund
            </Typography>
          </Grid>
        </Grid>
        <Grid item container direction={'column'} className={classes.addContainer}>
          <Typography className={classes.descriptionTitle}>
            {item.price}
          </Typography>
          <TextField
            variant="outlined"
            className={classes.quantityInput}
            label={'Quantity'}
            id={'quantity'}
            value={quantity}
            onChange={onChange}
            size="small"
          />
          <Grid item container style={{marginTop: '2em'}}>
            <Button
              color={'primary'}
              variant={'contained'}
              className={classes.addButton}
              onClick={onAdd}//для диалога
            >
              <span>Add to Cart</span>
            </Button>
          </Grid>

        </Grid>
      </Grid>
    </Grid>


  )
}