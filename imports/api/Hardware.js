import { Mongo } from 'meteor/mongo';

const Hardware = new Mongo.Collection('hardware');

if (Meteor.isServer) {
    Meteor.publish('allHardware', function() {
      return Hardware.find();
    });

  Meteor.methods( {
    insertNewHardware(hardwareName, hardwareFinish, hardwareSize, hardwareSupplier, hardwareCost) {
      if(Meteor.userId()) {
        Hardware.insert({
          name: hardwareName,
          finish: hardwareFinish,
          size: hardwareSize,
          supplier: hardwareSupplier,
          cost: hardwareCost,
        });
      }
    }
  });
}

export default Hardware;
