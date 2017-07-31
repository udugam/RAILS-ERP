if (Meteor.userId()){
  import React, {Component} from 'react';
  import { createContainer } from 'meteor/react-meteor-data';

  import Quotes from '../api/Quotes';
  import Materials from '../api/Materials';
  import DoorStyles from '../api/DoorStyles';
  import Colors from '../api/Colors';
  import Drawers from '../api/Drawers';
  import Hardware from '../api/Hardware';
  import CrownMoldings from '../api/CrownMoldings';
  import Operations from '../api/Operations';

  class QuotePage extends Component {

    render() {
      return (
        <div>
          {this.props.quotes.map((storedQuote) => {
              return (
                <div key={storedQuote._id}>
                  <h1>{storedQuote.jobName}</h1>
                  <h2>Status: {storedQuote.jobStatus}</h2>
                  <h2>Address: {storedQuote.jobAddress}</h2>
                  <h2>Linear Footage: {storedQuote.linFootage}</h2>
                  <h2>Ceiling Height: {storedQuote.height}</h2>
                  <h2>Construction Material: {storedQuote.constructionMaterial}</h2>
                  <h2>Door Style: {storedQuote.doorStyle} - {storedQuote.doorSpecies}</h2>
                  <h2>Finish: {storedQuote.color}</h2>
                  <h2>Drawers: {storedQuote.drawerModel}  Qty: {storedQuote.drawerQty}</h2>
                  <h2>Status: {storedQuote.jobStatus}</h2>
                  <h2>Hardware: {storedQuote.hardware}</h2>
                  <h2>Crown Molding: {storedQuote.crownMolding}</h2>

                  {/*This is a fixed div in the right hand corner of the page that actively calculates the quote before it is submitted to the database */}
                  <div className='fixed'>
                    <div>
                      <h1>${storedQuote.jobValue}</h1>
                    </div>
                  </div>
                </div>
              )
          })}
        </div>
      )
    }
  }

  export default createContainer(({params}) => {
    if(Meteor.userId()){
      let materialsSub = Meteor.subscribe('allMaterials');
      let doorStylesSub = Meteor.subscribe('allDoorStyles');
      let colorsSub = Meteor.subscribe('allColors');
      let drawersSub = Meteor.subscribe('allDrawers');
      let hardwareSub = Meteor.subscribe('allHardware');
      let crownMoldingsSub = Meteor.subscribe('allCrownMoldings');
      let operationsSub = Meteor.subscribe('allOperations');
      let quotesSub = Meteor.subscribe('singleQuote', params);
    }

    return {
      materials: Materials.find({}).fetch(),
      doorStyles: DoorStyles.find({}).fetch(),
      colors: Colors.find({}).fetch(),
      drawers: Drawers.find({}).fetch(),
      hardware: Hardware.find({}).fetch(),
      crownMoldings: CrownMoldings.find({}).fetch(),
      operations: Operations.find({}).fetch(),
      quotes: Quotes.find({}).fetch(),
    }
  }, QuotePage);

}
