import { Meteor } from 'meteor/meteor';
import { Communities } from '../imports/collections/communities';
import { Event } from '../imports/collections/event';
import { People } from '../imports/collections/people';
import { loadInitialData } from '../imports/infra/initial-data';
import { MeteorsNames } from '../imports/infra/publish-names'

Meteor.methods({
  setUserEventStatus({userId, communityId}) {
    const eventUser = Event.findOne({userId: userId})
    if(eventUser != undefined){
      const isCheckingIn = eventUser.checkState === false
      if(isCheckingIn) {
        //reset the checking time data since it will be in a new event
        Event.update({userId:userId, communityId:communityId},
          { 
            $set:{
              checkedInTime: moment.now(),
              checkedOutTime: '',
              checkState: true
        }})
      }
      else{
        //simply check-out the user
        Event.update({userId: userId, communityId: communityId},
          { 
            $set:{
              checkedOutTime: moment.now(),
              checkState: false
        }})
      }
    } 
    else{
      // case the record of the user doesn't exist in the event, create a new record 
      // assign a checking time.
      Event.insert({ userId: userId, communityId:communityId, checkedInTime: moment.now() , checkedOutTime: '', checkState: true})
    }
  },
  getPeopleInCommunity ({ communityId }) {
    if(communityId === '') return []
    const result = People.find({communityId: communityId}).fetch()
    return result
  },
  getPeopleInEvent({communityId}) {
    if(communityId === '') return []
    const result = Event.find({communityId: communityId}).fetch()
    return result
  },
  getPersonInEvent({userId, communityId}) {
    if(communityId === '' && communityId === '') return []
    const result = Event.find({userId: userId, communityId: communityId}).fetch()
    return result
  }
})

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();
  // YOU CAN DO WHATEVER YOU WANT HERE

  // allow the client to insert data into the database
  Event.allow({
    'insert': function (userId,doc) {

    return true; 
    }
  });
  
});

Meteor.publish(MeteorsNames.GetAllCommunities, () => { 
  return Communities.find()
})
Meteor.publish(MeteorsNames.GetRegisteredUsersInCommunity, ({ communityId }) => { 
  return People.find({communityId: communityId})
})
Meteor.publish(MeteorsNames.GetUserEventInfo, ({ communityId }) => { 
  const communityUserInEventStatus = Event.find({communityId: communityId})
  return communityUserInEventStatus
})


