import React, {useState} from 'react';
import Header from "./ui/Header";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import myTheme from "./ui/Theme";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Footer from "./ui/Footer";
import LandingPage from "./LandingPage";
import Shop from "./Shop";
import FullCard from "./FullCard";

import Contact from "./Contact";
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Order from "./Order";
import Cart from "./Cart";

const useStyles = makeStyles(theme =>({
  appContainer: {
    backgroundColor: `#fafafa`,
  },
}));

function App() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);///установка стейта для активного подменю. Вынесли вверх для доступа оного к футеру.
  const [value, setValue] = useState(0);//установка состояния value. Вынесли вверх для доступа оного к футеру.

  const [cartItems, setCartItems] = useState([]);

  return (
    <ThemeProvider theme={myTheme}>
      <Grid container direction={'column'} alignItems={'center'} className={classes.appContainer}>
        <Grid item style={{width: '100%', maxWidth:1240, backgroundColor:'white', boxShadow:'0 0 10px grey'}}>
          <BrowserRouter>{/*область роутера в кот меняются страницы в зависимости от path*/}
            <Header//всегда рендерится
              value={value}
              setValue={setValue}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
            <Switch>{/*рендерится в зависимости от Route path*/}
              <Route
                exact
                path={'/'}
                // component={()=><Index setValue={setValue} selectedIndex={selectedIndex}/>}//проверить возможность писания так чем рендер
                render={(props)=><LandingPage {...props} setValue={setValue} setSelectedIndex={setSelectedIndex}/>}
              />
              <Route exact path={'/shop'} component={()=><Shop setValue={setValue} setSelectedIndex={setSelectedIndex}/>}/>
              <Route exact path={'/shop/product-page'} component={()=><FullCard setValue={setValue} setSelectedIndex={setSelectedIndex}/>}/>
              <Route exact path={'/shop/cart'} component={()=><Cart setValue={setValue} setSelectedIndex={setSelectedIndex}/>}/>
              <Route exact path={'/order'} component={()=><Order setValue={setValue} setSelectedIndex={setSelectedIndex}/>}/>
            </Switch>
            <Footer
              setValue={setValue}
              setSelectedIndex={setSelectedIndex}
            />
          </BrowserRouter>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
