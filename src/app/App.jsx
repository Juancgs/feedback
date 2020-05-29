import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { alertActions } from '../_actions/alert.actions';
import { history } from '../_helpers/history';
import { PrivateRoute } from '../_components/PrivateRoute';
import { HomePage } from '../HomePage/HomePage';
import { LoginPage } from '../LoginPage/LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage}  />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return { alert };
}

const mapDispatchToProps = {
    clearAlerts: alertActions.clear
};

export default connect(mapStateToProps, mapDispatchToProps)(App);