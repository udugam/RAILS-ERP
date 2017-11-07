import { Mongo } from 'meteor/mongo';

const Accessories = new Mongo.Collection('accessories');

if (Meteor.isServer) {
  Meteor.publish('allAccessories', function() {
    return Accessories.find();
  });

  Meteor.methods( {
    insertNewAccessory(accessoryName,manufacturer,supplier,productNumber,cost,installationTime, minIntWidth, minIntHeight, minIntDepth) {
      if(Meteor.userId()) {
        Accessories.insert({
          name: accessoryName,
          manufacturer: manufacturer,
          supplier: supplier,
          productNumber: productNumber,
          cost: cost,
          installationTime: installationTime,
          minIntWidth: minIntWidth,
          minIntHeight: minIntHeight,
          minIntDepth: minIntDepth,
        });
      }
    }
  });
}

export default Accessories;
