import { Mongo } from 'meteor/mongo';

const MillworkItems = new Mongo.Collection('millworkItems');

if (Meteor.isServer) {
  Meteor.publish('allMillworkItems', function() {
    return MillworkItems.find();
  });

  Meteor.methods( {
    insertNewMillworkItem(type,name,width,height,depth,material,cost) {
      if(Meteor.userId()) {
        MillworkItems.insert({
          type: type,
          name: name,
          width: width,
          height: height,
          depth: depth,
          material: material,
          cost: cost,
        });
      }
    }
  });
}

export default MillworkItems;
