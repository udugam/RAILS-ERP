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

    updateRoom(roomNum, updatedRoom, quoteID) {
     if(roomNum==0) {
      Quotes.update( {_id:quoteID}, {
        $set: { 
          "projectRooms.0.roomNum" : updatedRoom.roomNum,
          "projectRooms.0.description" : updatedRoom.description,
          "projectRooms.0.linFootage" : updatedRoom.linFootage,
          "projectRooms.0.height" : updatedRoom.height,
          "projectRooms.0.constructionMaterial" : updatedRoom.constructionMaterial,
          "projectRooms.0.quote" : updatedRoom.quote,
          "projectRooms.0.doorSpecies" : updatedRoom.doorSpecies,
          "projectRooms.0.doorStyle" : updatedRoom.doorStyle,
          "projectRooms.0.color" : updatedRoom.color,
          "projectRooms.0.drawerQty" : updatedRoom.drawerQty,
          "projectRooms.0.drawerModel" : updatedRoom.drawerModel,
          "projectRooms.0.hardware" : updatedRoom.hardware,
          "projectRooms.0.hardwareQty" : updatedRoom.hardwareQty,
          "projectRooms.0.crownMolding" : updatedRoom.crownMolding,
          "projectRooms.0.quoteAccessories" : updatedRoom.quoteAccessories,
          "projectRooms.0.quoteMillworkItems" : updatedRoom.quoteMillworkItems,
          "projectRooms.0.cost": updatedRoom.cost,
         }
      }, function(err,docs) {
        if (err) throw err
      });
     } else if (roomNum==1) {
      Quotes.update( {_id:quoteID}, {
        $set: { 
          "projectRooms.1.roomNum" : updatedRoom.roomNum,
          "projectRooms.1.description" : updatedRoom.description,
          "projectRooms.1.linFootage" : updatedRoom.linFootage,
          "projectRooms.1.height" : updatedRoom.height,
          "projectRooms.1.constructionMaterial" : updatedRoom.constructionMaterial,
          "projectRooms.1.quote" : updatedRoom.quote,
          "projectRooms.1.doorSpecies" : updatedRoom.doorSpecies,
          "projectRooms.1.doorStyle" : updatedRoom.doorStyle,
          "projectRooms.1.color" : updatedRoom.color,
          "projectRooms.1.drawerQty" : updatedRoom.drawerQty,
          "projectRooms.1.drawerModel" : updatedRoom.drawerModel,
          "projectRooms.1.hardware" : updatedRoom.hardware,
          "projectRooms.1.hardwareQty" : updatedRoom.hardwareQty,
          "projectRooms.1.crownMolding" : updatedRoom.crownMolding,
          "projectRooms.1.quoteAccessories" : updatedRoom.quoteAccessories,
          "projectRooms.1.quoteMillworkItems" : updatedRoom.quoteMillworkItems,
          "projectRooms.1.cost": updatedRoom.cost,
         }
      }, function(err,docs) {
        if (err) throw err
      });
     } else if (roomNum==2) {
      Quotes.update( {_id:quoteID}, {
        $set: { 
          "projectRooms.2.roomNum" : updatedRoom.roomNum,
          "projectRooms.2.description" : updatedRoom.description,
          "projectRooms.2.linFootage" : updatedRoom.linFootage,
          "projectRooms.2.height" : updatedRoom.height,
          "projectRooms.2.constructionMaterial" : updatedRoom.constructionMaterial,
          "projectRooms.2.quote" : updatedRoom.quote,
          "projectRooms.2.doorSpecies" : updatedRoom.doorSpecies,
          "projectRooms.2.doorStyle" : updatedRoom.doorStyle,
          "projectRooms.2.color" : updatedRoom.color,
          "projectRooms.2.drawerQty" : updatedRoom.drawerQty,
          "projectRooms.2.drawerModel" : updatedRoom.drawerModel,
          "projectRooms.2.hardware" : updatedRoom.hardware,
          "projectRooms.2.hardwareQty" : updatedRoom.hardwareQty,
          "projectRooms.2.crownMolding" : updatedRoom.crownMolding,
          "projectRooms.2.quoteAccessories" : updatedRoom.quoteAccessories,
          "projectRooms.2.quoteMillworkItems" : updatedRoom.quoteMillworkItems,
          "projectRooms.2.cost": updatedRoom.cost,
         }
      }, function(err,docs) {
        if (err) throw err
      });
     } else if (roomNum==3) {
      Quotes.update( {_id:quoteID}, {
        $set: { 
          "projectRooms.3.roomNum" : updatedRoom.roomNum,
          "projectRooms.3.description" : updatedRoom.description,
          "projectRooms.3.linFootage" : updatedRoom.linFootage,
          "projectRooms.3.height" : updatedRoom.height,
          "projectRooms.3.constructionMaterial" : updatedRoom.constructionMaterial,
          "projectRooms.3.quote" : updatedRoom.quote,
          "projectRooms.3.doorSpecies" : updatedRoom.doorSpecies,
          "projectRooms.3.doorStyle" : updatedRoom.doorStyle,
          "projectRooms.3.color" : updatedRoom.color,
          "projectRooms.3.drawerQty" : updatedRoom.drawerQty,
          "projectRooms.3.drawerModel" : updatedRoom.drawerModel,
          "projectRooms.3.hardware" : updatedRoom.hardware,
          "projectRooms.3.hardwareQty" : updatedRoom.hardwareQty,
          "projectRooms.3.crownMolding" : updatedRoom.crownMolding,
          "projectRooms.3.quoteAccessories" : updatedRoom.quoteAccessories,
          "projectRooms.3.quoteMillworkItems" : updatedRoom.quoteMillworkItems,
          "projectRooms.3.cost": updatedRoom.cost,
         }
      }, function(err,docs) {
        if (err) throw err
      });
     } else if (roomNum==4) {
      Quotes.update( {_id:quoteID}, {
        $set: { 
          "projectRooms.4.roomNum" : updatedRoom.roomNum,
          "projectRooms.4.description" : updatedRoom.description,
          "projectRooms.4.linFootage" : updatedRoom.linFootage,
          "projectRooms.4.height" : updatedRoom.height,
          "projectRooms.4.constructionMaterial" : updatedRoom.constructionMaterial,
          "projectRooms.4.quote" : updatedRoom.quote,
          "projectRooms.4.doorSpecies" : updatedRoom.doorSpecies,
          "projectRooms.4.doorStyle" : updatedRoom.doorStyle,
          "projectRooms.4.color" : updatedRoom.color,
          "projectRooms.4.drawerQty" : updatedRoom.drawerQty,
          "projectRooms.4.drawerModel" : updatedRoom.drawerModel,
          "projectRooms.4.hardware" : updatedRoom.hardware,
          "projectRooms.4.hardwareQty" : updatedRoom.hardwareQty,
          "projectRooms.4.crownMolding" : updatedRoom.crownMolding,
          "projectRooms.4.quoteAccessories" : updatedRoom.quoteAccessories,
          "projectRooms.4.quoteMillworkItems" : updatedRoom.quoteMillworkItems,
          "projectRooms.4.cost": updatedRoom.cost,
         }
      }, function(err,docs) {
        if (err) throw err
      });
     } else if (roomNum==5) {
      Quotes.update( {_id:quoteID}, {
        $set: { 
          "projectRooms.5.roomNum" : updatedRoom.roomNum,
          "projectRooms.5.description" : updatedRoom.description,
          "projectRooms.5.linFootage" : updatedRoom.linFootage,
          "projectRooms.5.height" : updatedRoom.height,
          "projectRooms.5.constructionMaterial" : updatedRoom.constructionMaterial,
          "projectRooms.5.quote" : updatedRoom.quote,
          "projectRooms.5.doorSpecies" : updatedRoom.doorSpecies,
          "projectRooms.5.doorStyle" : updatedRoom.doorStyle,
          "projectRooms.5.color" : updatedRoom.color,
          "projectRooms.5.drawerQty" : updatedRoom.drawerQty,
          "projectRooms.5.drawerModel" : updatedRoom.drawerModel,
          "projectRooms.5.hardware" : updatedRoom.hardware,
          "projectRooms.5.hardwareQty" : updatedRoom.hardwareQty,
          "projectRooms.5.crownMolding" : updatedRoom.crownMolding,
          "projectRooms.5.quoteAccessories" : updatedRoom.quoteAccessories,
          "projectRooms.5.quoteMillworkItems" : updatedRoom.quoteMillworkItems,
          "projectRooms.5.cost": updatedRoom.cost,
         }
      }, function(err,docs) {
        if (err) throw err
      });
     } else if (roomNum==6) {
      Quotes.update( {_id:quoteID}, {
        $set: { 
          "projectRooms.6.roomNum" : updatedRoom.roomNum,
          "projectRooms.6.description" : updatedRoom.description,
          "projectRooms.6.linFootage" : updatedRoom.linFootage,
          "projectRooms.6.height" : updatedRoom.height,
          "projectRooms.6.constructionMaterial" : updatedRoom.constructionMaterial,
          "projectRooms.6.quote" : updatedRoom.quote,
          "projectRooms.6.doorSpecies" : updatedRoom.doorSpecies,
          "projectRooms.6.doorStyle" : updatedRoom.doorStyle,
          "projectRooms.6.color" : updatedRoom.color,
          "projectRooms.6.drawerQty" : updatedRoom.drawerQty,
          "projectRooms.6.drawerModel" : updatedRoom.drawerModel,
          "projectRooms.6.hardware" : updatedRoom.hardware,
          "projectRooms.6.hardwareQty" : updatedRoom.hardwareQty,
          "projectRooms.6.crownMolding" : updatedRoom.crownMolding,
          "projectRooms.6.quoteAccessories" : updatedRoom.quoteAccessories,
          "projectRooms.6.quoteMillworkItems" : updatedRoom.quoteMillworkItems,
          "projectRooms.6.cost": updatedRoom.cost,
         }
      }, function(err,docs) {
        if (err) throw err
      });
     } else if (roomNum==7) {
      Quotes.update( {_id:quoteID}, {
        $set: { 
          "projectRooms.7.roomNum" : updatedRoom.roomNum,
          "projectRooms.7.description" : updatedRoom.description,
          "projectRooms.7.linFootage" : updatedRoom.linFootage,
          "projectRooms.7.height" : updatedRoom.height,
          "projectRooms.7.constructionMaterial" : updatedRoom.constructionMaterial,
          "projectRooms.7.quote" : updatedRoom.quote,
          "projectRooms.7.doorSpecies" : updatedRoom.doorSpecies,
          "projectRooms.7.doorStyle" : updatedRoom.doorStyle,
          "projectRooms.7.color" : updatedRoom.color,
          "projectRooms.7.drawerQty" : updatedRoom.drawerQty,
          "projectRooms.7.drawerModel" : updatedRoom.drawerModel,
          "projectRooms.7.hardware" : updatedRoom.hardware,
          "projectRooms.7.hardwareQty" : updatedRoom.hardwareQty,
          "projectRooms.7.crownMolding" : updatedRoom.crownMolding,
          "projectRooms.7.quoteAccessories" : updatedRoom.quoteAccessories,
          "projectRooms.7.quoteMillworkItems" : updatedRoom.quoteMillworkItems,
          "projectRooms.7.cost": updatedRoom.cost,
         }
      }, function(err,docs) {
        if (err) throw err
      });
     } else if (roomNum==8) {
      Quotes.update( {_id:quoteID}, {
        $set: { 
          "projectRooms.8.roomNum" : updatedRoom.roomNum,
          "projectRooms.8.description" : updatedRoom.description,
          "projectRooms.8.linFootage" : updatedRoom.linFootage,
          "projectRooms.8.height" : updatedRoom.height,
          "projectRooms.8.constructionMaterial" : updatedRoom.constructionMaterial,
          "projectRooms.8.quote" : updatedRoom.quote,
          "projectRooms.8.doorSpecies" : updatedRoom.doorSpecies,
          "projectRooms.8.doorStyle" : updatedRoom.doorStyle,
          "projectRooms.8.color" : updatedRoom.color,
          "projectRooms.8.drawerQty" : updatedRoom.drawerQty,
          "projectRooms.8.drawerModel" : updatedRoom.drawerModel,
          "projectRooms.8.hardware" : updatedRoom.hardware,
          "projectRooms.8.hardwareQty" : updatedRoom.hardwareQty,
          "projectRooms.8.crownMolding" : updatedRoom.crownMolding,
          "projectRooms.8.quoteAccessories" : updatedRoom.quoteAccessories,
          "projectRooms.8.quoteMillworkItems" : updatedRoom.quoteMillworkItems,
          "projectRooms.8.cost": updatedRoom.cost,
         }
      }, function(err,docs) {
        if (err) throw err
      });
     } else if (roomNum==9) {
      Quotes.update( {_id:quoteID}, {
        $set: { 
          "projectRooms.9.roomNum" : updatedRoom.roomNum,
          "projectRooms.9.description" : updatedRoom.description,
          "projectRooms.9.linFootage" : updatedRoom.linFootage,
          "projectRooms.9.height" : updatedRoom.height,
          "projectRooms.9.constructionMaterial" : updatedRoom.constructionMaterial,
          "projectRooms.9.quote" : updatedRoom.quote,
          "projectRooms.9.doorSpecies" : updatedRoom.doorSpecies,
          "projectRooms.9.doorStyle" : updatedRoom.doorStyle,
          "projectRooms.9.color" : updatedRoom.color,
          "projectRooms.9.drawerQty" : updatedRoom.drawerQty,
          "projectRooms.9.drawerModel" : updatedRoom.drawerModel,
          "projectRooms.9.hardware" : updatedRoom.hardware,
          "projectRooms.9.hardwareQty" : updatedRoom.hardwareQty,
          "projectRooms.9.crownMolding" : updatedRoom.crownMolding,
          "projectRooms.9.quoteAccessories" : updatedRoom.quoteAccessories,
          "projectRooms.9.quoteMillworkItems" : updatedRoom.quoteMillworkItems,
          "projectRooms.9.cost": updatedRoom.cost,
         }
      }, function(err,docs) {
        if (err) throw err
      });
     } 
    }
  });
}

export default Quotes;
