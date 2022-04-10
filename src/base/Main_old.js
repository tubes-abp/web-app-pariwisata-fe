import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

// Component
import NotFound from '../helper/components/404';

// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mainActions from '../redux/actions/main';
import Login from '../pages/auth/login/index';
import OwnerDashboard from '../pages/owner/dashboard';
import OwnerDataProduct from '../pages/owner/data/product';



class Main extends Component {
  // componentDidMount() {
  //   this.props.actionsMain.get_item();
  // }

  render() {
    return (
      <Router>
        <div id="Main" className="main-panel">
          <div className="content-container">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/owner/dashboard" component={OwnerDashboard} />
              <Route exact path="/owner/data/product" component={OwnerDataProduct} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return { main: state.main }
}

function mapDispatchToProps(dispatch) {
  return {
    actionsMain: bindActionCreators(mainActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);