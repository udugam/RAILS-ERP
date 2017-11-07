import { Meteor } from 'meteor/meteor';

import Quotes from '../imports/api/Quotes';
import Materials from '../imports/api/Materials';
import DoorStyles from '../imports/api/DoorStyles';
import Colors from '../imports/api/Colors';
import Drawers from '../imports/api/Drawers';
import Hardware from '../imports/api/Hardware';
import CrownMoldings from '../imports/api/CrownMoldings';
import Operations from '../imports/api/Operations';
import Accessories from '../imports/api/Accessories';
import MillworkItems from '../imports/api/MillworkItems';
import '../imports/server/accounts';


Meteor.publish('currentUser', function() {
  return Meteor.users.find({_id: this.userId}, {
    fields: {
      status: 1,
      roles: 1,
    }
  });
});

Meteor.startup(() => {
  // code to run on server at startup
});
