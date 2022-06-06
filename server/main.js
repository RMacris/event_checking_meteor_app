import { Meteor } from 'meteor/meteor';
import { Communities } from '../imports/collections/communities';
import { Event } from '../imports/collections/event';
import { People } from '../imports/collections/people';
import { loadInitialData } from '../imports/infra/initial-data';
import { MeteorsNames } from '../imports/infra/publish-names'

Meteor.methods({
  setUserEventStatus({userId, eventId}) {
    const user = Event.findOne({_id: userData._id})
    const data = {
      
      checkedInTime: '',
      checkedOutTime: ''
    }
    if(user != undefined){
      const isCheckingIn = isChecking == true
      if(isCheckingIn) {
        //reset the checking time data since it will be in a new event
        Event.update({userId:userId, eventId:eventId},{ $set:{
          checkingState: true
        }})
      }
      else{
        //simply check-out the user
        Event.update({userId: userId, eventId: eventId},{ $set:{
          checkingState: false, 
          checkedOutTime: ''
        }})
      }
    }
    else{
      // case the record of the user doesn't exist in the event, create a new record 
      // assign a checking time.
      Event.insert({userId:userId, eventId:eventId, checkedInTime: '' , checkedOutTime: '', checked: true})
    }
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
Meteor.publish(MeteorsNames.GetRegisteredUsersInCommunity, ({ communityID, page=1, limit=10 }) => { 
  return People.find({communityId: communityID}, {
    skip: (page*limit),
    limit: limit
  })
})
Meteor.publish(MeteorsNames.GetAllCommunities, () => { 
  return Communities.find()
})


