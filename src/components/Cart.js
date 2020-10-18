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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";


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
    borderTop: `1px solid ${theme.palette.common.brown}`,
    padding: '0 2em',
  },
  itemContainer: {
    width:'100%',
    padding: '2em 0 0 0',
    // backgroundColor: theme.palette.common.lightBrown,
  },
  imgContainer:{
    width:'15em',
    [theme.breakpoints.down('xs')]: {
      width:'unset',
      marginBottom:'2em',
    },
  },
  img :{
    borderRadius:'10px',
    width:'100%',
  },
  descriptionContainer:{
    width:'20em',
    paddingLeft:'2em',
    [theme.breakpoints.down('xs')]: {
      paddingLeft:'0',
      width:'unset',
    },
  },
  totalContainer:{
    width:'10%',
    // paddingRight: '2em',
    [theme.breakpoints.down('xs')]: {
      width:'unset',
    },
  },
  cardContainer: {
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    margin:'2em 0',
    // padding: '10em',
    // width: '500px',
    [theme.breakpoints.down('sm')]: {
      // padding: '8em 0',
      // borderRadius: 0,
      width: '100%',
    },
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: '1rem',
    backgroundColor: theme.palette.common.brown,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 225,
    },
  },
  bookContainer: {
    width:'50%',
    padding: '0 20px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}))

export default function Cart(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));//вызываем библиотеку для адаптива
  const total = 100;
  const total2=1000;

 const items = [
    {
      name: "ADHD GREY T-SHIRT",
      price: "$22.00",
      imgUrl:greyThirt,
      quantity: 5,
    },
    {
      name: "ADHD MOVERS BLACK HOODIE",
      price: "$44.00",
      imgUrl:blackHoodie,
      quantity: 7,
    },
  ];

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [emailHelper, setEmailHelper] = useState('');//ручная установка подсказки а не дефолт инпутовская

  const [phone, setPhone] = useState('');
  const [phoneHelper, setPhoneHelper] = useState('');

  const [message, setMessage] = useState('');


  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({open: false, message: '', backgroundColor: ''})

  const onChange = e => {
    let valid;
    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value);
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)//тру фолс тест рег вырвжения
        if (!valid) {
          setEmailHelper('invalid email')
        } else {
          setEmailHelper('')
        }
        break;
      case 'phone':
        setPhone(e.target.value);
        valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(e.target.value)//тру фолс тест рег вырвжения
        if (!valid) {
          setPhoneHelper('invalid phone')
        } else {
          setPhoneHelper('')
        }
        break;
      default:
        break;
    }
  };
  const onConfirm = () => {//нажатие на кнопку 'отправить'
    setLoading(true);//включаем индикатор загрузки
    axios.get('https://us-central1-konstant-movers.cloudfunctions.net/sendMailFromKMovers', //запрос на URL
      {
        params: {//подробности дополняющие URL (query strings)
          name: name,
          email: email,
          phone: phone,
          message: message,
        }
      }
    )
      .then(res => {//выполнится когда поступит ответ
        setLoading(false);//выключаем индикатор загрузки
        setName('');//сброс полей
        setEmail('');//сброс полей
        setPhone('');//сброс полей
        setMessage('');//сброс полей
        setAlert({open: true, message: 'Message sent successfully!', backgroundColor: '#4bb543'})//показываем подтв окно
        console.log(res)
      })
      .catch(err => {//выдаст если вернулась ошибка
        setLoading(false);
        setAlert({open: true, message: 'Something went wrong, please try again!', backgroundColor: '#ff3232'})//показываем подтв окно c ошибкой
        console.log(err)
      })
  };


  const Item = (props) =>{

    return (
        <Grid container direction={matchesXS? 'column': undefined} justify={'space-between'} className={classes.itemContainer}>
          <Grid item container direction={matchesXS? 'column': undefined} style={{width:'unset'}}>
            <Grid item className={classes.imgContainer}>
              <img src={props.item.imgUrl} className={classes.img}/>
            </Grid>
            <Grid item container direction={'column'} justify={'center'} className={classes.descriptionContainer}>
              <Typography className={classes.descriptionTitle}>
                {props.item.name}
              </Typography>
              <Typography style={{marginTop: '10px'}} className={classes.descriptionText}>
                {props.item.price}
              </Typography>
              <Typography style={{marginTop: '10px'}} className={classes.descriptionText}>
                Quantity : {props.item.quantity}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction={'column'} alignItems={'flex-end'} className={classes.totalContainer}>
            <Typography style={{marginTop: '10px'}} className={classes.descriptionTitle}>
             Total:
            </Typography>
            <Typography style={{marginTop: '10px'}} className={classes.descriptionText}>
             ${total}
            </Typography>
          </Grid>
        </Grid>
    )
  }


  return (
    <Grid container direction={matchesSM?'column':null} justify={'center'} className={classes.mainContainer}>
      {items.map( (item, i) => <Item key={i} item={item} /> )}
        <Card className={classes.cardContainer}>
          <CardContent>
            <Grid container justify={'center'} style={{padding: '2em'}}>
              <Grid item container direction={'column'} alignItems={'center'}>
                <Typography variant={'h4'} style={{lineHeight: 1, color:theme.palette.common.brown, padding: '0 40px 40px 40px'}} align={'center'}>
                  Grab a gear
                </Typography>
                <Grid item container direction={'column'} style={{width: '20em'}}>
                  <Grid item style={{marginBottom: '0.5em'}}>
                    <TextField
                      label={'Name*'}
                      id={'name'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item style={{marginBottom: '0.5em'}}>
                    <TextField
                      label={'Email*'}
                      helperText={emailHelper}
                      id={'email'}
                      value={email}
                      onChange={onChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item style={{marginBottom: '0.5em'}}>
                    <TextField
                      label={'Phone*'}
                      helperText={phoneHelper}
                      id={'phone'}
                      value={phone}
                      onChange={onChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item style={{marginBottom: '0.5em'}}>
                    <Typography variant={'p'}>
                      Grey Tshirt: 1 (1000$)<br/>
                      Pink Tshirt: 7 (1000$)<br/>
                      Blue Tshirt: 7 (1000$)
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item style={{width: '20em'}}>
                  <TextField
                    id={'message'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    multiline
                    rows={5}
                    className={classes.message}
                    variant="outlined"
                    // inputProps={{disableUnderline:true}}//убрать палку через спец инпутовский метод
                    fullWidth
                    placeholder={'Message (sizes, delivery etc.)'}

                  />
                </Grid>
                <Grid item container justify={'center'} style={{marginTop: '2em'}}>
                  <Button
                    variant={'contained'}
                    className={classes.sendButton}
                    disabled={//кнопка не рабочая если true эти условия
                      phone.length === 0 ||
                      email.length === 0 ||
                      name.length === 0 ||
                      message.length === 0 ||
                      phoneHelper.length !== 0 ||
                      emailHelper.length !== 0
                    }
                    onClick={onConfirm}//для диалога
                  >
                    {loading ? <CircularProgress size={30}/> : <span>Send</span>}{/*показывать кнопку или индикатор загрузки во время работы axios*/}
                  </Button>
                </Grid>
                <Snackbar//всплывающее окно подтверждения
                  open={alert.open}
                  message={alert.message}
                  ContentProps={{style: {backgroundColor: alert.backgroundColor}}}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                  onClose={() => setAlert({...alert, open: false})}
                  autoHideDuration={4000}
                />
              </Grid>

            </Grid>
          </CardContent>
        </Card>
    </Grid>


  )
}