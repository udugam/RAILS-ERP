import { Mongo } from 'meteor/mongo';

const Drawers = new Mongo.Collection('drawers');

if (Meteor.isServer) {
    Meteor.publish('allDrawers', function() {
      return Drawers.find();
    });

  Meteor.methods( {
    insertNewDrawer(drawerManufacturer,drawerModel,drawerDepth,drawerHeight,drawerColor,drawerCapacity,drawerSupplier,drawerCost) {
      if(Meteor.userId()) {
        Drawers.insert({
          manufacturer: drawerManufacturer,
          model: drawerModel,
          depth: drawerDepth,
          height: drawerHeight,
          color: drawerColor,
          capacity: drawerCapacity,
          supplier: drawerSupplier,
          cost: drawerCost,
        });
      }
    }
  });
}

export default Drawers;
