import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types'; 
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Navbar from 'Navbar';
import Teams from 'Teams';
import Fixtures from 'Fixtures';
import LeagueTable from 'LeagueTable';

export default class Root extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    };


    render() {
        const { store } = this.props;
        // Create an enhanced history that syncs navigation events with the store
        const history = syncHistoryWithStore(browserHistory, store);
        
        return(
            <Provider store={store}>
                <MuiThemeProvider>
                    <Router history={history}>
                        <Route path="/" component={Navbar} >
                            <div className="container">
                                <IndexRoute component={Teams}></IndexRoute>
                                <Route path="/fixtures" component={Fixtures} />
                                <Route path="/fixtures/league-table" component={LeagueTable} />
                            </div>
                        </Route>
                    </Router>
                </MuiThemeProvider>
            </Provider>
        )
    }
}

