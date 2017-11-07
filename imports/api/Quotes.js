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
    insertNewQuote(projectStatus,projectName,projectAddress,projectRooms,projectValue) {
      if(Meteor.userId()) {
        Quotes.insert({
          projectOwner: Meteor.userId(),
          projectStatus: projectStatus,
          projectName: projectName,
          projectAddress: projectAddress,
          projectRooms: projectRooms,
          projectValue: projectValue,
        });
      }
    },

    updateQuote(roomToUpdate, updatedRoom) { //Bring in quote._id and find the quote, iterate through each room, assigning a key, and update that room using the key
      Quotes.update( roomToUpdate, {
        $set: {
                roomNum: updatedRoom.roomNum,
                description: updatedRoom.description,
                linFootage: updatedRoom.linFootage,
                height: updatedRoom.height,
                constructionMaterial: updatedRoom.constructionMaterial,
                quote: updatedRoom.quote,
                doorSpecies: updatedRoom.doorSpecies,
                doorStyle: updatedRoom.doorStyle,
                color: updatedRoom.color,
                drawerQty: updatedRoom.drawerQty,
                drawerModel: updatedRoom.drawerModel,
                hardware: updatedRoom.hardware,
                hardwareQty: updatedRoom.hardwareQty,
                crownMolding: updatedRoom.crownMolding,
                quoteAccessories: updatedRoom.quoteAccessories,
                quoteMillworkItems: updatedRoom.quoteMillworkItems,
                cost: updatedRoom.cost,
              }
          });
      }
  });
}

export default Quotes;
