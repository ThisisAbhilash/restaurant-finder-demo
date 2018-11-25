import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/HeaderComponent';
import NotFound from '../../components/PageNotFound';
import  HomePage from '../HomePage';
import RestroDetails from '../RestroDetails';
import RestroReviews from '../RestroReviews';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/:res_id" component={RestroDetails} />
      <Route exact path="/reviews/:res_id" component={RestroReviews} />
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);

export default App;
