import { Mongo } from 'meteor/mongo';

const Colors = new Mongo.Collection('colors');

if (Meteor.isServer) {
    Meteor.publish('allColors', function() {
      return Colors.find();
    });

  Meteor.methods( {
    insertNewColor(colorName,finishType) {
      if(Meteor.userId()) {
        Colors.insert({
          name: colorName,
          finishType: finishType,
        });
      }
    }
  });
}


export default Colors;
