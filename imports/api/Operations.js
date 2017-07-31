import { Mongo } from 'meteor/mongo';

const Operations = new Mongo.Collection('operations');

if (Meteor.isServer) {
    Meteor.publish('allOperations', function() {
      return Operations.find();
    });

  Meteor.methods( {
    insertNewOperation(name,plantAddress,manuSpaceFactor,monthlyLiabilities,designTimeFt,cutTimeFt,edgeTimeFt,assembleTimeFt,deliverTimeFt,installTimeFt,manuShiftLength,avgLaborRate,numLabor,officeShiftLength,avgDesignRate,numDesign,activeOperation) {
      if(Meteor.userId()) {
        Operations.insert({
          name: name,
          plantAddress: plantAddress,
          manuSpaceFactor: Number(manuSpaceFactor),
          monthlyLiabilities: Number(monthlyLiabilities),
          designTimeFt: Number(designTimeFt),
          cutTimeFt: Number(cutTimeFt),
          edgeTimeFt: Number(edgeTimeFt),
          assembleTimeFt: Number(assembleTimeFt),
          deliverTimeFt: Number(deliverTimeFt),
          installTimeFt: Number(installTimeFt),
          manuShiftLength: Number(manuShiftLength),
          avgLaborRate: Number(avgLaborRate),
          numLabor: Number(numLabor),
          officeShiftLength: Number(officeShiftLength),
          avgDesignRate: Number(avgDesignRate),
          numDesign: Number(numDesign),
          manufacturingCapacity: manuShiftLength*numLabor*20,
          designCapacity: officeShiftLength*numDesign*20,
          activeOperation: activeOperation,
        });
      }
    }
  });
}

export default Operations;
