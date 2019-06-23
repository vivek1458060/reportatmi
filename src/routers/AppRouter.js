import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import ReportDashboardPage from '../components/ReportDashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header'

export const history = createHistory();

const AppRouter = () => ( 
    <Router history={history}>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ReportDashboardPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
