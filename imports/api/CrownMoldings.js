import { Mongo } from 'meteor/mongo';

const CrownMoldings = new Mongo.Collection('crownMoldings');

if (Meteor.isServer) {
    Meteor.publish('allCrownMoldings', function() {
      return CrownMoldings.find();
    });

  Meteor.methods( {
    insertNewCrownMolding(crownName,supplier,ftOak,ftMaple,ftPoplar,ftPine) {
      if(Meteor.userId()) {
        CrownMoldings.insert({
          name: crownName,
          supplier: supplier,
          ftOak: ftOak,
          ftMaple: ftMaple,
          ftPoplar: ftPoplar,
          ftPine:  ftPine,
        });
      }
    }
  });
}

export default CrownMoldings;
