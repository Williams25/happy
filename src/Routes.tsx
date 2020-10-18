import React from 'react';
import LandingPage from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import CreateOrphanage from './pages/CreateOrphanage'
import Orphanage from './pages/Orphanage'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/OrphanagesMap" component={OrphanagesMap} />
        <Route path="/CreateOrphanage" component={CreateOrphanage} />
        <Route path="/Orphanage/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes