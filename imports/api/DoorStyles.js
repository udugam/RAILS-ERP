import { Mongo } from 'meteor/mongo';

const DoorStyles = new Mongo.Collection('doorStyles');

if (Meteor.isServer) {
    Meteor.publish('allDoorStyles', function() {
      return DoorStyles.find();
    });

  Meteor.methods( {
    insertNewDoorStyle(doorName,supplier,itemCost,sqftOak,sqftMaple,sqftCherry,sqftMDF) {
      if(Meteor.userId()) {
        DoorStyles.insert({
          name: doorName,
          supplier: supplier,
          itemCost: itemCost,
          sqftOak: sqftOak,
          sqftMaple: sqftMaple,
          sqftCherry: sqftCherry,
          sqftMDF:  sqftMDF,
        });
      }
    }
  });
}

export default DoorStyles;
