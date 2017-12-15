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
import NewAccessory from './NewAccessory';
import NewMillworkItem from './NewMillworkItem';
import ConfigureOps from './ConfigureOps';
import MyQuotes from './MyQuotes';
import QuotePage from './QuotePage';
import MainLayout from './layouts/MainLayout';
import NewProject from './NewProject';
import CabinetDatabase from './CabinetDatabase';
import CutListGenerator from './CutListGenerator';

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute/>
        <Route path="/newProject" component={NewProject}/>
        <Route path="/myQuotes" component={MyQuotes}/>
        <Route path="/configureOps" component={ConfigureOps}/>
        <Route path="/addMaterials" component={NewMaterial}/>
        <Route path="/addHardware" component={NewHardware}/>
        <Route path="/addDrawer" component={NewDrawer}/>
        <Route path="/addDoorStyle" component={NewDoorStyle}/>
        <Route path="/addCrownMolding" component={NewCrownMolding}/>
        <Route path="/addColor" component={NewColor}/>
        <Route path="/addAccessory" component={NewAccessory}/>
        <Route path="/addMillworkItem" component={NewMillworkItem}/>
        <Route path="/cabinetDatabase" component={CabinetDatabase}/>
        <Route path="/cutListGenerator" component={CutListGenerator} />
        <Route path="/:id" component={QuotePage}/>
      </Route>
    </Router>,
    document.getElementById('render-target')
  );
});
