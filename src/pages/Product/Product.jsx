import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import AddUP from './Add-Update';
import Detail from './Detail';

import './product.less';

const Product = (props) => {
    return (
        <Router>
            <Switch>
                <Route path='/product' exact component={Home}></Route>
                <Route path='/product/detail' component={Detail}></Route>
                <Route path='/product/addUpdate' component={AddUP}></Route>
                <Redirect to='/product' />
            </Switch>
        </Router>
    )
}
export default Product;