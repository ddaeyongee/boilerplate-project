import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom";
import Auth from "../hoc/auth";
import VolunteerPage from "./views/VolunteerPage/VolunteerPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from "./views/UploadProductPage/UploadProductPage";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import CartPage from "./views/CartPage/CartPage";
import HistoryPage from "./views/HistoryPage/HistoryPage";
import DonationPage from "./views/DonationPage/DonationPage";
import AdoptPage from "./views/AdoptPage/AdoptPage";
import LandingPage from "./views/LandingPage/LandingPage";
import './App.css';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <NavBar/>
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, null)}/>
                    <Route exact path="/volunteer" component={Auth(VolunteerPage, null)}/>
                    <Route exact path="/login" component={Auth(LoginPage, null)}/>
                    <Route exact path="/register" component={Auth(RegisterPage, false)}/>
                    <Route exact path="/product/upload" component={Auth(UploadProductPage, true)}/>
                    <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)}/>
                    <Route exact path="/user/cart" component={Auth(CartPage, true)}/>
                    <Route exact path="/history" component={Auth(HistoryPage, true)}/>
                    <Route exact path="/donation" component={Auth(DonationPage, true)}/>
                    <Route exact path="/adopt" component={Auth(AdoptPage, true)}/>
                </Switch>
            <Footer />
        </Suspense>
    );
}

export default App;
