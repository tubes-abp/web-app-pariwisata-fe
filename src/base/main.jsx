import React from 'react'
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
// import { check_role } from '../redux/actions/main';

// PAGES
import Login from '../pages/auth/login';
import OwnerDashboard from '../pages/owner/dashboard';
import OwnerDataProduct from '../pages/owner/data/product';

import '../assets/scss/index.scss'
import NotFound from '../pages/notFound';
import OwnerDataTransaction from '../pages/owner/data/transaction';
import OwnerCashiers from '../pages/owner/cashiers';
import CashierDashboard from '../pages/cashier/dashboard';
import CashierDataProduct from '../pages/cashier/data/product';
import CashierDataTransaction from '../pages/cashier/data/transaction';
import OwnerCashierAdd from '../pages/owner/cashiers/add';
import OwnerCashierEdit from '../pages/owner/cashiers/edit';
import OwnerDataProductAdd from '../pages/owner/data/product/add';
import OwnerDataProductEdit from '../pages/owner/data/product/edit';
import LoginCashier from '../pages/auth/login/cashier';
import Register from '../pages/auth/register';
import CashierDataTransactionAdd from '../pages/cashier/data/transaction/add';
import PrivateRoute from '../helper/components/privateRouter';
import OwnerAccount from '../pages/owner/account';
import ViewportRestrict from '../helper/components/viewportRestrict';

const Main = () => { 
  // const dispatch = useDispatch();  
  // useEffect(() => {
  //   dispatch(check_role())
  // }, [dispatch]);
  const { loader } = useSelector(state => state.main)
  return (
    <Router>
      <ViewportRestrict display={true} type="portrait" />
      <Spin spinning={loader}>
        <Switch>
          <Route exact path="/" component={Register} />          
          <Route exact path="/login/owner" component={Login} />          
          <PrivateRoute exact path="/owner/dashboard" component={OwnerDashboard} />
          <PrivateRoute exact path="/owner/data/product" component={OwnerDataProduct} />
          <PrivateRoute exact path="/owner/data/product/add" component={OwnerDataProductAdd} />
          <PrivateRoute exact path="/owner/data/product/edit/:id" component={OwnerDataProductEdit} />
          <PrivateRoute exact path="/owner/data/transaction" component={OwnerDataTransaction} />
          <PrivateRoute exact path="/owner/cashiers" component={OwnerCashiers} />
          <PrivateRoute exact path="/owner/cashier/add" component={OwnerCashierAdd} />
          <PrivateRoute exact path="/owner/cashier/edit/:id" component={OwnerCashierEdit} />
          <PrivateRoute exact path="/owner/account" component={OwnerAccount} />
          
          <Route exact path="/login/cashier" component={LoginCashier} />
          <PrivateRoute exact path="/cashier/dashboard" component={CashierDashboard} />
          <PrivateRoute exact path="/cashier/data/product" component={CashierDataProduct} />
          <PrivateRoute exact path="/cashier/data/transaction" component={CashierDataTransaction} />
          <PrivateRoute exact path="/cashier/data/transaction/add" component={CashierDataTransactionAdd} />
          <Route component={NotFound} />
        </Switch>
      </Spin> 
    </Router>
  )
}

export default Main
