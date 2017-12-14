import { Mongo } from 'meteor/mongo';

const Cabinets = new Mongo.Collection('cabinets');

if (Meteor.isServer) {
  Meteor.publish('allCabinets', function() {
    return Cabinets.find();
  });

  Meteor.methods( {
    insertNewCabinet(code,description,constructionParts,hardwareParts,cabWidth,cabDepth,cabHeight) {
      if(Meteor.userId()) {
        Cabinets.insert({
          code: code,
          description: description,
          constructionParts: constructionParts,
          hardwareParts: hardwareParts,
          cabWidth: cabWidth, 
          cabDepth: cabDepth,
          cabHeight: cabHeight,
        });
      }
    }
  });
}

export default Cabinets;

