import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';
import {render} from 'react-dom';

import NewMaterial from './NewMaterial';
import NewQuote from './NewQuote';
import NewDoorStyle from './NewDoorStyle';
import NewColor from './NewColor';
import NewDrawer from './NewDrawer';
import NewHardware from './NewHardware';
import NewCrownMolding from './NewCrownMolding';
import ConfigureOps from './ConfigureOps';
import MyQuotes from './MyQuotes';
import QuotePage from './QuotePage';
import MainLayout from './layouts/MainLayout';


Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute/>
        <Route path="/newQuote" component={NewQuote}/>
        <Route path="/myQuotes" component={MyQuotes}/>
        <Route path="/configureOps" component={ConfigureOps}/>
        <Route path="/addMaterials" component={NewMaterial}/>
        <Route path="/addHardware" component={NewHardware}/>
        <Route path="/addDrawer" component={NewDrawer}/>
        <Route path="/addDoorStyle" component={NewDoorStyle}/>
        <Route path="/addCrownMolding" component={NewCrownMolding}/>
        <Route path="/addColor" component={NewColor}/>
        <Route path="/:id" component={QuotePage}/>
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});
