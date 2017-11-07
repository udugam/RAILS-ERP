import { Mongo } from 'meteor/mongo';

const Materials = new Mongo.Collection('materials');

if (Meteor.isServer) {
  Meteor.publish('allMaterials', function() {
    return Materials.find();
  });

  Meteor.methods( {
    insertNewMaterial(materialName,materialCore,materialThickness,sheetW,sheetL,sheetCost,supplier) {
      if(Meteor.userId()) {
        Materials.insert({
          name: materialName,
          core: materialCore,
          thickness: materialThickness,
          sheetW: sheetW,
          sheetL: sheetL,
          sheetCost: sheetCost,
          supplier: supplier,
        });
      }
    }
  });
}

export default Materials;
