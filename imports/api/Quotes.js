import { Mongo } from 'meteor/mongo';
import Materials from './Materials';
import DoorStyles from './DoorStyles';
import Colors from './Colors';
import Drawers from './Drawers';
import Hardware from './Hardware';
import CrownMoldings from './CrownMoldings';
import Operations from './Operations';

const Quotes = new Mongo.Collection('quotes');

if (Meteor.isServer) {
    Meteor.publish('allMaterials', function() {
      return Materials.find();
    });
    Meteor.publish('allDoorStyles', function() {
      return DoorStyles.find();
    });
    Meteor.publish('allColors', function() {
      return Colors.find();
    });
    Meteor.publish('allDrawers', function() {
      return Drawers.find();
    });
    Meteor.publish('allHardware', function() {
      return Hardware.find();
    });
    Meteor.publish('allCrownMoldings', function() {
      return CrownMoldings.find();
    });
    Meteor.publish('allQuotes', function() {
      return Quotes.find();
    });
    Meteor.publish('singleQuote', function(params) {
      return Quotes.find({_id:params.id});
    });

  Meteor.methods( {
    insertNewQuote(jobStatus,jobName,jobAddress,linFootage,height,constructionMaterial,doorSpecies,doorStyle,color,drawerModel,drawerQty,hardware,hardwareQty,crownMolding,lightValance,molding,jobValue) {
      if(Meteor.userId()) {
        Quotes.insert({
          jobOwner: Meteor.userId(),
          jobStatus: jobStatus,
          jobName: jobName,
          jobAddress: jobAddress,
          linFootage: linFootage,
          height: height,
          constructionMaterial: constructionMaterial,
          doorSpecies: doorSpecies,
          doorStyle: doorStyle,
          color: color,
          drawerModel: drawerModel,
          drawerQty: drawerQty,
          hardware: hardware,
          hardwareQty: hardwareQty,
          crownMolding: crownMolding,
          lightValance: lightValance,
          molding: molding,
          jobValue: jobValue,
        });
      }
    }
  });
}

export default Quotes;
