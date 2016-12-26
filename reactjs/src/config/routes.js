import React from 'react'
import Main from '../components/layouts/Main';
import Blank from '../components/layouts/Blank';

import MainView from '../components/Main';
import MinorView from '../components/Minor';
import ClientListView from "../components/client/client-list";
import ItemListView from "../components/item/item-list";
import OrderListView from "../components/order/order-list";
import OrderAddView from "../components/order/order-add";
import PrepaidView from "../components/prepaid/prepaid";
import PrepaidListView from "../components/prepaid/prepaid-list";

import { Route, Router, IndexRedirect, browserHistory} from 'react-router';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRedirect to="/main" />
            <Route path="main" component={MainView}> </Route>
            <Route path="minor" component={MinorView}> </Route>
            <Route path="clientList" component={ClientListView}> </Route>
            <Route path="itemList" component={ItemListView}> </Route>
            <Route path="orderList" component={OrderListView}> </Route>
            <Route path="orderAdd" component={OrderAddView}> </Route>
            <Route path="prepaid" component={PrepaidView}> </Route>
            <Route path="prepaidList" component={PrepaidListView}> </Route>
        </Route>
    </Router>

);