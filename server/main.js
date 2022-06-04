import { Meteor } from 'meteor/meteor';
import { Communities } from '../imports/collections/communities';
import { People } from '../imports/collections/people';
import { loadInitialData } from '../imports/infra/initial-data';
import { MeteorsNames } from '../imports/infra/publish-names'

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();
  // YOU CAN DO WHATEVER YOU WANT HERE
  
});
Meteor.publish(MeteorsNames.GetRegisteredUsersInCommunity, ({ communityID }) => { 
  return People.find({communityId: communityID})
})
Meteor.publish(MeteorsNames.GetAllCommunities, () => { 
  return Communities.find()
})


