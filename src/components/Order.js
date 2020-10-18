import React, {useState} from 'react';
import axios from "axios";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import airplane from '../assets/send.svg';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import order from "../assets/orderbox.webp";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";


const useStyles = makeStyles(theme => ({
  message: {
    border: `2px solid ${theme.palette.common.blue}`,
    marginTop: '5em',
    borderRadius: '5',
  },
  item: {
    // width:'100%',
    marginBottom: '10px'
  },
  orderContainer: {
    padding: '40px 0',
    backgroundImage: `url(${order})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    // backgroundAttachment: 'fixed',//фикс картинка при прокрутке
    backgroundRepeat: 'no-repeat',
    width: '100%',
    [theme.breakpoints.down('md')]: {},
  },
  orderCard: {
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    // padding: '10em',
    width: '500px',
    [theme.breakpoints.down('xs')]: {
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
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 225,
    },

  },
  service: {
    fontWeight: 300,
    fontSize: '0.9rem'
  },
  users: {},
  button: {
    borderRadius: 50,
    color: '#fff',
    textTransform: 'none',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',

  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },


}))

export default function Order(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));//вызываем библиотеку для адаптива
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailHelper, setEmailHelper] = useState('');//ручная установка подсказки а не дефолт инпутовская
  const [phone, setPhone] = useState('');
  const [phoneHelper, setPhoneHelper] = useState('');
  const [items, setItems] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [stairsFrom, setStairsFrom] = useState('');
  const [stairsTo, setStairsTo] = useState('');
  const [elevatorFrom, setElevatorFrom] = useState('');
  const [elevatorTo, setElevatorTo] = useState('');
  const [parkingFrom, setParkingFrom] = useState('');
  const [parkingTo, setParkingTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({open: false, message: '', backgroundColor: ''});

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

  function formatDate(dateForExecution) {//скопировано с sitemap-> scripts
    let d = dateForExecution,
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  function formatTime(timeForExecution) {
    let t = timeForExecution,
      hours = "" + (t.getHours() + 1),
      minutes = "" + t.getMinutes();
    return [hours, minutes].join("-");
  };

  const onConfirm = () => {//нажатие на кнопку 'отправить'
    setLoading(true);//включаем индикатор загрузки
    let goodDate = formatDate(date);//преобразуем дату в читабельный вид
    let goodTime = formatTime(time);

    axios.get('https://us-central1-konstant-movers.cloudfunctions.net/sendMailFromKMovers', //запрос на URL
      {
        params: {//подробности дополняющие URL (query strings)
          name: name,
          phone: phone,
          email: email,
          to: to,
          from: from,
          date: goodDate,
          time: goodTime,
          elevatorFrom: elevatorFrom,
          elevatorTo: elevatorTo,
          stairsFrom: stairsFrom,
          stairsTo: stairsTo,
          parkingFrom: parkingFrom,
          parkingTo: parkingTo,
          items: items,
          notes: notes
        }
      }
    )
      .then(res => {//выполнится когда поступит ответ
        setLoading(false);//выключаем индикатор загрузки
        setName('');//сброс полей
        setPhone('');//сброс полей
        // setDate('');//сброс полей
        // setTime('');//сброс полей
        setFrom('');//сброс полей
        setTo('');//сброс полей
        setElevatorFrom('');//сброс полей
        setElevatorTo('');//сброс полей
        setStairsFrom('');//сброс полей
        setStairsTo('');//сброс полей
        setParkingFrom('');//сброс полей
        setParkingTo('');//сброс полей
        setItems('');//сброс полей
        setNotes('');//сброс полей
        setAlert({open: true, message: 'Message sent successfully!', backgroundColor: '#4bb543'});//показываем подтв окно
        console.log(res)
      })
      .catch(err => {//выдаст если вернулась ошибка
        setLoading(false);
        setAlert({open: true, message: 'Something went wrong, please try again!', backgroundColor: '#ff3232'})//показываем подтв окно c ошибкой
        console.log(err)
      })
  };

  const buttonContents = (
    <>
      Send
      <img src={airplane} alt={'paper plane'} style={{marginLeft: '1em'}}/>
    </>
  );

  return (
    <Grid container alignItems={'center'} justify={'center'} className={classes.orderContainer}>
      <Card className={classes.orderCard}>
        <CardContent>
          <Grid container justify={'center'} style={{padding: '2em 0'}}>
            <Grid item container direction={'column'} alignItems={'center'}>
              <Typography variant={'h1'} style={{lineHeight: 1, color: '#696969', marginBottom: '20px'}}
                          align={matchesMD ? 'center' : undefined}>
                Quote
              </Typography>
              <Grid item container direction={'column'} style={{width: matchesSM ? '90%' : '20em'}}>
                <Grid item className={classes.item}>
                  <TextField
                    color={'secondary'}
                    label={'Name'}
                    id={'name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.item}>
                  <TextField
                    color={'secondary'}
                    label={'Phone'}
                    helperText={phoneHelper}
                    id={'phone'}
                    value={phone}
                    onChange={onChange}
                    fullWidth
                    // helperText="Some important text"
                  />
                </Grid>
                <Grid item className={classes.item}>
                  <TextField
                    color={'secondary'}
                    label={'Email'}
                    id={'email'}
                    value={email}
                    helperText={emailHelper}
                    onChange={onChange}
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.item}>
                  <TextField
                    label={'Moving from'}
                    id={'Moving from'}
                    value={from}
                    color={'secondary'}
                    onChange={(e) => setFrom(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.item}>
                  <TextField
                    label={'Moving to'}
                    color={'secondary'}
                    id={'Moving to'}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    // inputProps={{disableUnderline:true}}//убрать палку через спец инпутовский метод
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.item}>
                  {/*альтернатива*/}
                  {/*<TextField*/}
                  {/*  id="datetime-local"*/}
                  {/*  label="Date & Time of moving"*/}
                  {/*  type="datetime-local"*/}
                  {/*  // defaultValue={date}*/}
                  {/*  // className={classes.textField}*/}
                  {/*  fullWidth*/}
                  {/*  onChange={e => setDate(e.target.value)}*/}
                  {/*  InputLabelProps={{*/}
                  {/*    shrink: true,*/}
                  {/*  }}*/}
                  {/*/>*/}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        color={'secondary'}
                        id="date-picker-dialog"
                        label="Date of moving"
                        format="MM/dd/yyyy"
                        value={date}
                        onChange={newDate => setDate(newDate)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        fullWidth
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item className={classes.item}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time of moving"
                        value={time}
                        onChange={newTime => setTime(newTime)}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                        fullWidth
                      />
                    </MuiPickersUtilsProvider>
                </Grid>
    {/*elevators*/}
                <Grid item container className={classes.item} justify={'space-between'}>
                  <Grid item style={{width: '48%'}}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="stairs from">Elevator (from)</InputLabel>
                      <Select
                        labelId="elevator from"
                        id="elevator from"
                        value={elevatorFrom}
                        onChange={(e)=>setElevatorFrom(e.target.value)}
                      >
                        <MenuItem value={'no'}>No</MenuItem>
                        <MenuItem value={'yes'}>Yes</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item style={{width: '48%'}}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="stairs to">Elevator (to)</InputLabel>
                      <Select
                        labelId="elevator to"
                        id="elevator to"
                        value={elevatorTo}
                        onChange={(e) => setElevatorTo(e.target.value)}
                      >
                        <MenuItem value={'no'}>No</MenuItem>
                        <MenuItem value={'yes'}>Yes</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
    {/*stairs*/}
                <Grid item container className={classes.item} justify={'space-between'}>
                  <Grid item style={{width: '48%'}}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="stairs from">Stairs (from)</InputLabel>
                      <Select
                        labelId="stairs from"
                        id="stairs from"
                        value={stairsFrom}
                        onChange={(e) => setStairsFrom(e.target.value)}
                      >
                        <MenuItem value={'No'}>No</MenuItem>
                        <MenuItem value={'1flight'}>1 flight</MenuItem>
                        <MenuItem value={'2flight'}>2 flight</MenuItem>
                        <MenuItem value={'3flight'}>3 flight</MenuItem>
                        <MenuItem value={'other'}>other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item style={{width: '48%'}}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="stairs to">Stairs (to)</InputLabel>
                      <Select
                        labelId="stairs to"
                        id="stairs to"
                        value={stairsTo}
                        onChange={(e) => setStairsTo(e.target.value)}
                      >
                        <MenuItem value={'No'}>No</MenuItem>
                        <MenuItem value={'1flight'}>1 flight</MenuItem>
                        <MenuItem value={'2flight'}>2 flight</MenuItem>
                        <MenuItem value={'3flight'}>3 flight</MenuItem>
                        <MenuItem value={'other'}>other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
    {/*parking*/}
                <Grid item container className={classes.item} justify={'space-between'}>
                  <Grid item style={{width: '48%'}}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="parking from">Parking (from)</InputLabel>
                      <Select
                        labelId="parking from"
                        id="parking from"
                        value={parkingFrom}
                        onChange={(e) => setParkingFrom(e.target.value)}
                      >
                        <MenuItem value={'street parking'}>street parking</MenuItem>
                        <MenuItem value={'garage'}>garage</MenuItem>
                        <MenuItem value={'loading dock'}>loading dock</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item style={{width: '48%'}}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="parking to">Parking (to)</InputLabel>
                      <Select
                        labelId="parking to"
                        id="parking to"
                        value={parkingTo}
                        onChange={(e) => setParkingTo(e.target.value)}
                      >
                        <MenuItem value={'street parking'}>street parking</MenuItem>
                        <MenuItem value={'garage'}>garage</MenuItem>
                        <MenuItem value={'loading dock'}>loading dock</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
    {/*items*/}
                <Grid item className={classes.item} style={{marginTop:20}}>
                  <TextField
                    variant="outlined"
                    label={'List of items'}
                    id={'List of items'}
                    value={items}
                    onChange={(e) => setItems(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                  />
                </Grid>
    {/*notes*/}
                <Grid item className={classes.item} style={{marginTop:20}}>
                  <TextField
                    variant="outlined"
                    label={'Notes'}
                    id={'Notes'}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item container justify={'center'} style={{marginTop: '2em'}}>
                <Button
                  variant={'contained'}
                  className={classes.sendButton}
                  disabled={//кнопка не рабочая если true эти условия
                    phone.length === 0
                    // email.length === 0 ||
                    // name.length === 0 ||
                    // phoneHelper.length !== 0 ||
                    // emailHelper.length !== 0
                  }
                  onClick={onConfirm}
                >
                  {loading ? <CircularProgress
                    size={30}/> : buttonContents}{/*показывать кнопку или индикатор загрузки во время работы axios*/}
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