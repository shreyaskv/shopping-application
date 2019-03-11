import React from 'react';
import { connect } from 'react-redux';
import {Menu} from './Menu.js';
import {CheckOut} from './CheckOut';
import { Route, BrowserRouter } from 'react-router-dom';

class HomePage extends React.Component {

    render() {
        return(
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Menu} />
                    <Route path="/checkOut" component={CheckOut} />
                </div>
            </BrowserRouter>
        )
    }
}

const connectedHomePage = connect(null, null)(HomePage);
export { connectedHomePage as HomePage };