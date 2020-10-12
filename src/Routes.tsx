import React from 'react';
import LandingPage from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/OrphanagesMap" component={OrphanagesMap} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes